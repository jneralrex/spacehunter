
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FiMessageSquare,
  FiMinimize,
  FiMaximize,
  FiArrowLeft,
} from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import {
  ChevronsUp,
  MailPlus,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

import useChatStore from "@/utils/store/useChatStore";
import useAuthStore from "@/utils/store/useAuthStore";
import axiosInstance from "@/utils/axios/axiosInstance";
import chatEndPoints from "@/utils/axios/chatEndPoints";
import { initSocket } from "@/utils/socket";

// --------------------------------------------------
// ID helpers
// --------------------------------------------------

const getId = (value) => {
  if (value === null || value === undefined) return "";

  if (typeof value === "object") {
    const id = value._id ?? value.id;
    return id === null || id === undefined ? "" : String(id);
  }

  return String(value);
};

const getUserId = (user) => getId(user);

const getMemberId = (member) => getId(member);

const getSenderId = (message) => getId(message?.senderId);

const getMessageId = (message) => getId(message?._id);

const formatMessageTime = (createdAt) => {
  if (!createdAt) return "";

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// --------------------------------------------------
// Individual chat
// --------------------------------------------------

const IndividualChatView = ({
  chatId,
  otherParticipant,
  goBackToChatList,
}) => {
  const {
    activeChatMessages,
    addMessageToActiveChat,
    setActiveChatMessages,
    updateMessageStatus,
  } = useChatStore();

  const { user } = useAuthStore();

  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMessages, setErrorMessages] = useState(null);
  const [sending, setSending] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Tracks temporary IDs awaiting server acknowledgement.
  const pendingMessagesRef = useRef(new Set());

  // Prevents the same incoming socket message being added twice.
  const seenMessageIdsRef = useRef(new Set());

  const myId = getUserId(user);
  const otherUserId = getMemberId(otherParticipant);

  // Scroll to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeChatMessages]);

  // Fetch messages whenever the selected chat changes.
  useEffect(() => {
    let cancelled = false;

    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        setErrorMessages(null);

        // Clear message tracking when switching conversations.
        pendingMessagesRef.current.clear();
        seenMessageIdsRef.current.clear();

        const response = await axiosInstance.get(
          chatEndPoints.GET_MESSAGES(chatId)
        );

        if (cancelled) return;

        const messages = response.data?.messages ?? [];

        messages.forEach((message) => {
          const id = getMessageId(message);
          if (id) seenMessageIdsRef.current.add(id);
        });

        setActiveChatMessages(messages);
      } catch (error) {
        if (cancelled) return;

        const message =
          error.response?.data?.message ||
          error.message ||
          "Unable to load messages.";

        setErrorMessages(message);
        console.error("Fetch messages error:", error);
      } finally {
        if (!cancelled) {
          setLoadingMessages(false);
        }
      }
    };

    fetchMessages();

    return () => {
      cancelled = true;
    };
  }, [chatId, setActiveChatMessages]);

  // Set up socket listeners for this conversation.
  useEffect(() => {
    if (!chatId || !otherUserId) return;

    const socket = initSocket();

    if (!socket) {
      setErrorMessages("Unable to establish a chat connection.");
      return;
    }

    socketRef.current = socket;

    const joinChat = () => {
      socket.emit("joinChat", {
        chatId,
        otherUserId,
      });
    };

    const handleJoinError = (error) => {
      const message = error?.message || "Unable to join this chat.";

      toast.error(message);
      setErrorMessages(message);
    };

    const handleNewMessage = (message) => {
      if (!message) return;

      const messageId = getMessageId(message);
      const senderId = getSenderId(message);

      // Ignore our own broadcast. Our optimistic message will be updated
      // using the messageSent acknowledgement.
      if (senderId && myId && senderId === myId) {
        return;
      }

      // Ignore duplicate socket deliveries.
      if (messageId && seenMessageIdsRef.current.has(messageId)) {
        return;
      }

      if (messageId) {
        seenMessageIdsRef.current.add(messageId);
      }

      addMessageToActiveChat({
        ...message,
        status: "sent",
      });
    };

    const handleMessageSent = (data) => {
      if (!data?.tempId || !data?.messageId) {
        console.warn("Unexpected messageSent payload:", data);
        return;
      }

      if (!pendingMessagesRef.current.has(String(data.tempId))) {
        return;
      }

      // Replace the temporary ID with the server-generated ID.
      updateMessageStatus(String(data.tempId), {
        _id: String(data.messageId),
        status: "sent",
      });

      pendingMessagesRef.current.delete(String(data.tempId));
      seenMessageIdsRef.current.add(String(data.messageId));
      setSending(false);
    };

    const handleConnectError = (error) => {
      console.error("Socket connection error:", error.message);
    };

    socket.on("connect", joinChat);
    socket.on("joinError", handleJoinError);
    socket.on("newMessage", handleNewMessage);
    socket.on("messageSent", handleMessageSent);
    socket.on("connect_error", handleConnectError);

    // If the socket is already connected, join immediately.
    if (socket.connected) {
      joinChat();
    }

    return () => {
      socket.off("connect", joinChat);
      socket.off("joinError", handleJoinError);
      socket.off("newMessage", handleNewMessage);
      socket.off("messageSent", handleMessageSent);
      socket.off("connect_error", handleConnectError);

      pendingMessagesRef.current.clear();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [
    chatId,
    otherUserId,
    myId,
    addMessageToActiveChat,
    updateMessageStatus,
  ]);

  // --------------------------------------------------
  // Send a message
  // --------------------------------------------------

  
  const handleSendMessage = (event) => {
    event.preventDefault();

    const text = newMessage.trim();

    if (!text) return;

    const socket = socketRef.current;

    if (!socket) {
      console.error("Cannot send: socket is not initialized.");
      toast.error("Chat connection is unavailable. Please try again.");
      return;
    }

    const receiverId = getMemberId(otherParticipant);

    if (!receiverId) {
      console.error("Cannot send: receiver ID is missing.", otherParticipant);
      toast.error("Could not identify the recipient.");
      return;
    }

    const tempId = Date.now().toString();

    const tempMessage = {
      _id: tempId,
      chatId,
      senderId: { _id: myId },
      receiverId,
      text,
      createdAt: new Date().toISOString(),
      isRead: false,
      status: "pending",
    };

    // Display the message immediately.
    addMessageToActiveChat(tempMessage);
    pendingMessagesRef.current.add(tempId);

    // Preserve the event and payload used by your original version.
    socket.emit("sendMessage", {
      chatId,
      text,
      receiverId,
      tempId,
    });

    setNewMessage("");
  };


  // --------------------------------------------------
  // Message status icons
  // --------------------------------------------------

  const getStatusIcon = (message) => {
    if (message.status === "pending") {
      return <Clock size={14} className="ml-1 inline text-white/70" />;
    }

    if (message.isRead) {
      return <CheckCheck size={14} className="ml-1 inline text-white" />;
    }

    return <Check size={14} className="ml-1 inline text-white" />;
  };

  // --------------------------------------------------
  // Render chat
  // --------------------------------------------------

  if (loadingMessages) {
    return (
      <div className="flex flex-1 items-center justify-center text-white">
        Loading messages...
      </div>
    );
  }

  if (errorMessages) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-3 p-4 text-center text-red-400">
        <p>{errorMessages}</p>
        <button
          type="button"
          onClick={() => setErrorMessages(null)}
          className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
        >
          Dismiss
        </button>
        <button
          type="button"
          onClick={goBackToChatList}
          className="text-sm text-gray-300 underline"
        >
          Back to chats
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 text-white">
        {activeChatMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          activeChatMessages.map((message, index) => {
            const isMine =
              Boolean(myId) && getSenderId(message) === myId;

            return (
              <div
                key={message._id ?? `${chatId}-${index}`}
                className={`mb-3 flex w-full ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] break-words rounded-2xl px-3 py-2 sm:max-w-[70%] ${
                    isMine
                      ? "rounded-br-sm bg-blue-600 text-white"
                      : "rounded-bl-sm bg-gray-700 text-white"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>

                  <div className="mt-1 flex items-center justify-end gap-1 text-xs text-white/70">
                    <span>{formatMessageTime(message.createdAt)}</span>
                    {isMine && getStatusIcon(message)}
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t border-gray-700 p-3"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type a message..."
          aria-label="Type a message"
          className="min-w-0 flex-1 rounded-md border border-gray-600 bg-gray-900 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!newMessage.trim() || !otherUserId || !myId}
          aria-label="Send message"
          className="flex items-center justify-center rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IoMdSend size={20} />
        </button>
      </form>
    </div>
  );
};

// --------------------------------------------------
// Main chat widget
// --------------------------------------------------

const ChatWidget = () => {
  const {
    isChatWidgetOpen,
    setChatWidgetOpen,
    activeChatId,
    setActiveChatId,
    userChats,
    setUserChats,
  } = useChatStore();

  const { user } = useAuthStore();

  const [isMinimized, setIsMinimized] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [errorChats, setErrorChats] = useState(null);

  const myId = getUserId(user);

  const toggleChatWidget = () => {
    setChatWidgetOpen(!isChatWidgetOpen);

    if (!isChatWidgetOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized((previous) => !previous);
  };

  const goBackToChatList = () => {
    setActiveChatId(null);
  };

  // Fetch conversations when the widget opens or the user changes.
  useEffect(() => {
    if (!isChatWidgetOpen || !user) {
      setLoadingChats(false);
      return;
    }

    let cancelled = false;

    const fetchUserChats = async () => {
      try {
        setLoadingChats(true);
        setErrorChats(null);

        const response = await axiosInstance.get(
          chatEndPoints.GET_MY_CHATS
        );

        if (cancelled) return;

        const chats = response.data?.chats ?? [];
        setUserChats(chats);

        console.log("Fetched chats:", chats);
      } catch (error) {
        if (cancelled) return;

        const message =
          error.response?.data?.message ||
          error.message ||
          "Unable to load chats.";

        setErrorChats(message);
        console.error("Fetch chats error:", error);
      } finally {
        if (!cancelled) {
          setLoadingChats(false);
        }
      }
    };

    fetchUserChats();

    return () => {
      cancelled = true;
    };
  }, [isChatWidgetOpen, user, setUserChats]);

  const currentActiveChat = userChats.find(
    (chat) => getId(chat._id) === getId(activeChatId)
  );

  const otherParticipant = currentActiveChat?.members?.find(
    (member) => getMemberId(member) !== myId
  );

  return (
    <>
      {/* Mobile chat button */}
      <button
        type="button"
        aria-label="Open chats"
        className="fixed bottom-15 right-4 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 lg:hidden"
        onClick={toggleChatWidget}
      >
        <FiMessageSquare size={24} />
      </button>

      {/* Desktop chat button */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleChatWidget}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleChatWidget();
          }
        }}
        className="fixed bottom-0 right-1 hidden w-[150px] cursor-pointer flex-col items-center rounded-t-lg bg-white shadow lg:flex"
      >
        <div className="flex w-full items-end justify-center space-x-3 rounded-t-lg bg-green-700 p-1 text-sm font-semibold text-white">
          <ChevronsUp size={30} />
          <MailPlus size={30} />
        </div>

        <h3 className="mb-2 font-semibold text-green-700">Messages</h3>
      </div>

      {/* Chat window */}
      {isChatWidgetOpen && (
        <div
          className={`fixed bottom-0 right-0 z-50 flex flex-col border border-gray-700 bg-gray-800 shadow-xl ${
            isMinimized
              ? "h-16 w-80"
              : "h-full w-full md:h-[600px] md:w-[400px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-700 p-3 text-white">
            {!activeChatId && (
              <h3 className="text-lg font-semibold">Chats</h3>
            )}

            {activeChatId && (
              <div className="flex min-w-0 items-center">
                <button
                  type="button"
                  aria-label="Back to chat list"
                  onClick={goBackToChatList}
                  className="mr-2 rounded-md p-1 hover:bg-gray-700"
                >
                  <FiArrowLeft size={20} />
                </button>

                {otherParticipant ? (
                  <>
                    <Image
                      src={
                        otherParticipant.profilePics?.url ||
                        "/profile.webp"
                      }
                      alt={otherParticipant.username || "User"}
                      width={30}
                      height={30}
                      className="mr-2 size-[30px] rounded-full object-cover"
                    />

                    <h3 className="truncate text-lg font-semibold">
                      {otherParticipant.username || "User"}
                    </h3>
                  </>
                ) : (
                  <h3 className="text-sm font-semibold">
                    {loadingChats ? "Loading chat..." : "Chat"}
                  </h3>
                )}
              </div>
            )}

            <div className="ml-auto flex items-center space-x-2">
              <button
                type="button"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                onClick={toggleMinimize}
                className="rounded-md p-1 hover:bg-gray-700"
              >
                {isMinimized ? (
                  <FiMaximize size={20} />
                ) : (
                  <FiMinimize size={20} />
                )}
              </button>

              <button
                type="button"
                aria-label="Close chat"
                onClick={toggleChatWidget}
                className="rounded-md px-2 py-1 text-xl hover:bg-gray-700"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="flex min-h-0 flex-1 flex-col">
              {activeChatId ? (
                otherParticipant ? (
                  <IndividualChatView
                    key={activeChatId}
                    chatId={activeChatId}
                    otherParticipant={otherParticipant}
                    goBackToChatList={goBackToChatList}
                  />
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center text-white">
                    {loadingChats ? (
                      <p>Loading chat...</p>
                    ) : (
                      <>
                        <p>
                          {errorChats ||
                            "Couldn't identify the other participant in this chat."}
                        </p>

                        <button
                          type="button"
                          onClick={goBackToChatList}
                          className="rounded-md bg-gray-700 px-4 py-2 hover:bg-gray-600"
                        >
                          Back to chats
                        </button>
                      </>
                    )}
                  </div>
                )
              ) : (
                <div className="custom-scrollbar flex-1 overflow-y-auto">
                  {loadingChats ? (
                    <div className="p-3 text-white">Loading chats...</div>
                  ) : errorChats ? (
                    <div className="flex h-full items-center justify-center p-4 text-center text-red-400">
                      <div>
                        <p>{errorChats}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setErrorChats(null);
                            setLoadingChats(true);
                            // Reopen the widget to trigger another fetch.
                            setChatWidgetOpen(false);
                            setTimeout(() => setChatWidgetOpen(true), 0);
                          }}
                          className="mt-3 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Try again
                        </button>
                      </div>
                    </div>
                  ) : userChats.length === 0 ? (
                    <div className="p-3 text-gray-400">No chats found.</div>
                  ) : (
                    userChats.map((chat) => {
                      const otherMember = chat.members?.find(
                        (member) => getMemberId(member) !== myId
                      );

                      return (
                        <button
                          type="button"
                          key={chat._id}
                          onClick={() => setActiveChatId(chat._id)}
                          className="flex w-full items-center border-b border-gray-700 p-3 text-left transition hover:bg-gray-700"
                        >
                          <Image
                            src={
                              otherMember?.profilePics?.url ||
                              "/profile.webp"
                            }
                            alt={otherMember?.username || "User"}
                            width={40}
                            height={40}
                            className="mr-3 size-10 shrink-0 rounded-full object-cover"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-white">
                              {otherMember?.username || "User"}
                            </p>

                            <p className="w-full truncate text-sm text-gray-400">
                              {chat.lastMessage || "No messages yet"}
                            </p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
