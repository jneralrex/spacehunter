import useHouseStore from "../store/useHouseStore";
import api from "./axiosInstance";

export async function dashBoardListings() {
  try {
    const { data } = await api.get("/dashboard/explore");

    console.log("Dashboard", data)

    return data;
  } catch (error) {
    console.log(error)
    console.error("fetching house failed:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);

    throw error;
  }
}

export async function uploadRoomateRequest(formData) {
  try {
    alert("Fired")
    const { data } = await api.post("/housemate/search", formData);
    console.log(formData)
    if (data.status) {
      alert("good");
    }
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error)
    console.error("Uploading roommate request failed:", error?.response?.data?.error?.message || error?.message);
    useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);
    throw error;
  }
};


export async function allHouseListings(page = 1, limit = 9) {
  try {
    const { data } = await api.get(`/houseupload/all-listings?page=${page}&limit=${limit}`);
    console.log("All House", data)

    return data;

  } catch (error) {
    console.log(error)
    console.error("Uploading roommate request failed:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);

    throw error;
  }
};

export async function singleHouse(id) {
  try {
    const { data } = await api.get(`/houseupload/single-listings/${id}`);

    console.log("House", data)

    return data;
  } catch (error) {
    console.log(error)
    console.error("Uploading roommate request failed:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);

    throw error;
  }
};

export async function showInterestInHouse(houseId){
  try {
    const { data } = await api.post(`/houseupload/${houseId}/show-interest`);
    console.log("Interest Shown", data)
    useHouseStore.getState().setHouseMessage(data.message)
    return data;

  } catch (error) {
    console.log(error)
    console.error("Showing interest failed:", error?.response?.data?.error?.message || error?.message);
     useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);
    throw error;
  }
};

