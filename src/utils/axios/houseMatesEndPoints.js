import api from "./axiosInstance";

export async function allRoomateListings() {
    try {
        const { data } = await api.get(`/housemate/search`)
        console.log("housemate", data);
        return data.roommateRequests;
    } catch (error) {
        console.log(error)
        console.error("Uploading roommate request failed:", error?.response?.data?.error?.message || error?.message);
        throw error;
    }
}

export async function singleHouseMate(id) {
    try {
        const { data } = await api.get(`/housemate/search/${id}`)
        console.log("res", data);
        return data.request;
    } catch (error) {
        console.log(error)
        console.error("Single housemate request failed:", error?.response?.data?.error?.message || error?.message);
        throw error;
    }
};
