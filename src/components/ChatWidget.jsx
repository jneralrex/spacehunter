"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiMinimize, FiMaximize, FiArrowLeft } from "react-icons/fi";
import useChatStore from "@/utils/store/useChatStore";
import useAuthStore from "@/utils/store/useAuthStore";
import axiosInstance from "@/utils/axios/axiosInstance";
import chatEndPoints from "@/utils/axios/chatEndPoints";
import { toast } from "react-toastify";
import { initSocket } from "@/utils/socket";
import Image from "next/image";
import { IoMdSend } from "react-icons/io";
import { ChevronsUp, MailPlus, Check, CheckCheck, Clock } from "lucide-react";

// IndividualChatView sub-component
const IndividualChatView = ({ chatId, otherParticipant, goBackToChatList }) => {
  const { activeChatMessages, addMessageToActiveChat, setActiveChatMessages, updateMessageStatus } = useChatStore();
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMessages, setErrorMessages] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const pendingMessagesRef = useRef(new Set());

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatMessages]);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = initSocket();
    const socket = socketRef.current;

    // Join chat room
    socket.emit("joinChat", { chatId, otherUserId: otherParticipant._id });

    // Listen for connection errors
    socket.on("joinError", (error) => {
      toast.error(error.message);
      setErrorMessages(error.message);
    });

    // Listen for new messages
    socket.on("newMessage", (message) => {
      // Only add if not already added as pending
      if (!pendingMessagesRef.current.has(message._id)) {
        addMessageToActiveChat({ ...message, status: "sent" });
      } else {
        // Update pending message status to sent
        updateMessageStatus(message._id, { status: "sent", _id: message._id });
        pendingMessagesRef.current.delete(message._id);
      }
    });

    // Listen for message sent confirmation
    socket.on("messageSent", (data) => {
      if (pendingMessagesRef.current.has(data.tempId)) {
        updateMessageStatus(data.tempId, { _id: data.messageId, status: "sent" });
        pendingMessagesRef.current.delete(data.tempId);
      }
    });

    // Fetch initial messages
    fetchMessages();

    // Disconnect socket on component unmount
    return () => {
      socket.off("joinError");
      socket.off("newMessage");
      socket.off("messageSent");
      pendingMessagesRef.current.clear();
    };
  }, [chatId, otherParticipant]); // Depend on chatId and otherParticipant to re-initialize socket

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await axiosInstance.get(chatEndPoints.GET_MESSAGES(chatId));
      setActiveChatMessages(response.data.messages); // Use store's set messages
    } catch (err) {
      setErrorMessages(err.response?.data?.message || err.message );
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    const socket = socketRef.current;
    const receiverId = otherParticipant._id;
    const tempId = Date.now().toString();

    // Optimistically add message to UI with pending status
    const tempMessage = {
      _id: tempId,
      chatId,
      senderId: user ? { _id: user.id } : { _id: "temp_user" },
      receiverId,
      text: newMessage,
      createdAt: new Date().toISOString(),
      isRead: false,
      status: "pending",
    };
    
    addMessageToActiveChat(tempMessage);
    pendingMessagesRef.current.add(tempId);

    socket.emit("sendMessage", {
      chatId,
      text: newMessage,
      receiverId,
      tempId,
    });

    setNewMessage("");
  };

  if (loadingMessages) {
    return <div className="flex-1 flex items-center justify-center text-white">Loading Messages...</div>;
  }

  if (errorMessages) {
    return <div className="flex-1 flex items-center justify-center h-full text-2xl text-red-500">{errorMessages + " " + "Please Try Again"}</div>;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <CheckCheck size={14} className="inline ml-1 text-white" />;
      case "pending":
        return <Clock size={14} className="inline ml-1 text-yellow-400" />;
      case "failed":
        return <Check size={14} className="inline ml-1 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3 text-white max-h-[480px]">
        {activeChatMessages.map((message, index) => (
          <div
            key={message._id}
            className={`mb-2 ${message.senderId._id === user?.id ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded-lg max-w-[80%] break-words ${
                message.senderId._id === user?.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p>{message.text}</p>
              {message.senderId._id === user?.id && (
                <span className="text-xs opacity-70">
                  {getStatusIcon(message.status || "sent")}
                </span>
              )}
            </span>
            {index === activeChatMessages.length - 1 && <div ref={messagesEndRef} />}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex border-t border-gray-700 p-2 rounded-md">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-l-md border-gray-600 p-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 rounded-r-md text-white p-2 hover:bg-blue-700 transition flex justify-center items-center"
        >
         <IoMdSend />
        </button>
      </form>
    </div>
  );
};


const ChatWidget = () => {
  const { isChatWidgetOpen, setChatWidgetOpen, activeChatId, setActiveChatId, userChats, setUserChats } = useChatStore();
  const { user } = useAuthStore();
  const [isMinimized, setIsMinimized] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [errorChats, setErrorChats] = useState(null);

  const toggleChatWidget = () => {
    setChatWidgetOpen(!isChatWidgetOpen);
    if (!isChatWidgetOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const goBackToChatList = () => {
    setActiveChatId(null);
  };

  // Fetch user chats when the widget is opened or user changes
  useEffect(() => {
    if (isChatWidgetOpen && user) {
      fetchUserChats();
    }
  }, [isChatWidgetOpen, user]);

  const fetchUserChats = async () => {
    try {
      setLoadingChats(true);
      const response = await axiosInstance.get(chatEndPoints.GET_MY_CHATS);
      setUserChats(response.data.chats);
    } catch (err) {
      setErrorChats(err.response?.data?.message || err.message );
      console.error(err);
    } finally {
      setLoadingChats(false);
    }
  };

  const currentActiveChat = userChats.find(chat => chat._id === activeChatId);
  const otherParticipant = currentActiveChat?.members.find(member => member._id !== user?.id);


  return (
    <>
      {/* Floating Action Button to open/close chat mobile*/}
      <button
        className=" fixed bottom-15 right-4 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-all duration-300"
        onClick={toggleChatWidget}
      >
        <FiMessageSquare size={24} />
      </button>

          {/* Floating Action Button to open/close chat Desktop*/}
          <div className="hidden lg:flex bg-white w-[150px] fixed bottom-0 right-1 rounded-t-lg shadow  flex-col items-center" 
           onClick={toggleChatWidget}
         >
            <button
              className="w-full text-white p-1 rounded-t-lg  text-sm font-semibold bg-green-700 flex items-end justify-center space-x-3 transition-all duration-300"
              
              >
              <ChevronsUp size={30} />
              <MailPlus size={30} />
            </button>
              <h3 className="font-semibold mb-2 text-green-700">Messages</h3>
          </div>

         

      {isChatWidgetOpen && (
        <div
          className={`fixed bottom-0 right-0 bg-gray-800 border border-gray-700  shadow-xl z-50 flex flex-col
            ${isMinimized ? "w-80 h-16" : "w-[400px] h-[600px]"}
          `}
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-700 text-white">
            {!activeChatId && <h3 className="text-lg font-semibold">Chats</h3>}
            {activeChatId && otherParticipant && (
              <div className="flex items-center">
                 <button onClick={goBackToChatList} className="mr-2 p-1 hover:bg-gray-700 rounded-md">
                   <FiArrowLeft size={20} />
                 </button>
                 <Image
                    src={otherParticipant?.profilePics?.url || "/profile.webp"}
                    alt={otherParticipant?.username || "User"}
                    width={30}
                    height={30}
                    className="rounded-full mr-2"
                />
                <h3 className="text-lg font-semibold">{otherParticipant?.username || "User"}</h3>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <button onClick={toggleMinimize} className="p-1 hover:bg-gray-700 rounded-md">
                {isMinimized ? <FiMaximize size={20} /> : <FiMinimize size={20} />}
              </button>
              <button onClick={toggleChatWidget} className="p-1 hover:bg-gray-700 rounded-md">
                &times;
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="flex-1 flex flex-col">
              {activeChatId ? (
                <IndividualChatView
                  chatId={activeChatId}
                  otherParticipant={otherParticipant}
                  goBackToChatList={goBackToChatList}
                />
              ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {loadingChats ? (
                    <div className="p-3 text-white">Loading chats...</div>
                  ) : errorChats ? (
                    <div className="p-3 h-full text-red-500 text-2xl flex text-center justify-center items-center">{errorChats + " " + "Please Try Again"}</div>
                  ) : userChats.length === 0 ? (
                    <div className="p-3 text-gray-400">No chats found.</div>
                  ) : (
                    userChats.map((chat) => {
                      const otherMember = chat.members.find(member => member._id !== user?.id);
                      return (
                        <div
                          key={chat._id}
                          className="flex items-center p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700"
                          onClick={() => setActiveChatId(chat._id)}
                        >
                          <Image
                            src={otherMember?.profilePics?.url || "/profile.webp"}
                            alt={otherMember?.username || "User"}
                            width={40}
                            height={40}
                            className="rounded-full mr-3"
                          />
                          <div>
                            <p className="font-semibold text-white">{otherMember?.username || "User"}</p>
                            <p className="text-sm text-gray-400 truncate w-48">{chat.lastMessage || "No messages yet"}</p>
                          </div>
                        </div>
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
