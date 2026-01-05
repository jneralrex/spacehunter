import useHouseStore from "../store/useHouseStore";
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

export async function sendRequest(posterId) {
    try {
        const { data } = await api.post(`/housemate/request`, { posterId })
        useHouseStore.getState().setHouseMessage(data.message);
        console.log("res", data);
        return data;
    } catch (error) {
        console.log(error)
        console.error("Single housemate request failed:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);
        throw error;
    }
};

export async function getMyRequests() {
    try {
        const { data } = await api.get("/housemate/request/for-me")
        useHouseStore.getState().setHouseMessage(data.message);
        console.log("request to me", data);
        return data;
    } catch (error) {
        console.log(error)
        console.error("getting housemate request failed:", error?.response?.data?.error?.message || error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);
        throw error;
    }
};

export async function toggleRequest(id, status) {
  try {

    const { data } = await api.patch(`/housemate/request/${id}`, { status });
    useHouseStore.getState().setHouseMessage(data.message);
    console.log("toggle request to me", data);
    return data;
  } catch (error) {
    console.log(error);
    console.error(
      "toggling request request failed:",
      error?.response?.data?.error?.message || error?.message
    );
    useHouseStore.getState().setHouseError(
      error?.response?.data?.error?.message || error?.message
    );
    throw error;
  }
}

export async function myRequest() {
    try {
        const { data } = await api.get(`/housemate/request/sent-by-me`)
        console.log("res", data);
        return data.requests;
    } catch (error) {
        console.log(error)
        console.error("Single housemate request failed:", error?.response?.data?.error?.message || error?.message);
        throw error;
    }
};

export async function uploadRoomateRequest(formData) {
  useHouseStore.getState().setHouseError(null);
  try {
    const { data } = await api.post("/housemate/search", formData);
    console.log(formData)
    useHouseStore.getState().setHouseMessage(data.message);
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error)
    console.error("Uploading roommate request failed:", error?.response?.data?.error?.message || error?.message);
    useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);
    throw error;
  }
};

export async function allMyRoomateSearchPosts() {
    try {
        const { data } = await api.get(`/housemate/search/my-search`)
        console.log("my posts", data);
        return data.request;
    } catch (error) {
        console.log("my posts", error)
        console.error("Getting my roommate posts failed:", error?.response?.data?.error?.message || error?.message);
        throw error;
    }
};