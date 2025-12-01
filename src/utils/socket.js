import { io } from "socket.io-client";
import useAuthStore from "./store/useAuthStore";

const URL = process.env.NODE_ENV === "production" ? "https://housematter-api.onrender.com/api/v1" : "http://localhost:5000";

export const initSocket = () => {
  const token = useAuthStore.getState().accessToken;

  const socket = io(URL, {
    auth: {
      token: `Bearer ${token}`,
    },
  });

  return socket;
};
