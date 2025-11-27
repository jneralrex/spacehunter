import useHouseStore from "../store/useHouseStore";
import api from "./axiosInstance";

export async function getAllNotifications() {
    try {
        const { data } = await api.get("/notifications/")
        console.log("res", data);
        return data.notifications;
    }
    catch (error) {
        console.log(error)
        console.error("Getting notifications failed:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);
        throw error;
    }
};