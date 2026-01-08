import { io } from "socket.io-client";
import useAuthStore from "./store/useAuthStore";

// const URL = process.env.NODE_ENV === "production" ? "https://housematter-api.onrender.com" : "http://localhost:5000";
const URL = "https://housematter-api.onrender.com"

let socket = null;

export const initSocket = () => {
  // Return existing connection if already established
  if (socket && socket.connected) {
    return socket;
  }

  const token = useAuthStore.getState().accessToken;

  socket = io(URL, {
    auth: {
      token: `Bearer ${token}`,
    },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
