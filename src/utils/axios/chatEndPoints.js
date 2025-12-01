const chatEndPoints = {
  GET_MESSAGES: (chatId) => `/chat/${chatId}/messages`,
  SEND_MESSAGE: (chatId) => `/chat/${chatId}/messages`,
  GET_MY_CHATS: "/chat/my-chats",
};

export default chatEndPoints;
