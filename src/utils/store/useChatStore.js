import { create } from "zustand";

const useChatStore = create((set) => ({
  isChatWidgetOpen: false,
  activeChatId: null,
  activeChatMessages: [],
  userChats: [],
  
  setChatWidgetOpen: (isOpen) => set({ isChatWidgetOpen: isOpen }),
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
  setActiveChatMessages: (messages) => set({ activeChatMessages: messages }),
  addMessageToActiveChat: (message) =>
    set((state) => ({
      activeChatMessages: [...state.activeChatMessages, message],
    })),
  setUserChats: (chats) => set({ userChats: chats }),
  
  resetChatStore: () =>
    set({
      isChatWidgetOpen: false,
      activeChatId: null,
      activeChatMessages: [],
      userChats: [],
    }),
}));

export default useChatStore;
