import useHouseStore from "../store/useHouseStore";
import api from "./axiosInstance";

export async function dashBoardListings() {
    useHouseStore.getState().setHouseError(null);

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

export async function listHouse(fd) {
    useHouseStore.getState().setHouseError(null);

  try {
    const { data } = await api.post(
      "/houseupload/houses",
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("uploading house",data)

    useHouseStore.getState().setHouseMessage(data.message);
    return data;
  } catch (error) {
    console.error(
      "Uploading house failed:", error ||
      error?.response?.data?.error?.message || error?.message
    );
    useHouseStore
      .getState()
      .setHouseError(
        error?.response?.data?.error?.message || error?.message
      );
    throw error;
  }
}

export async function editlistedHouse(fd, id) {
    useHouseStore.getState().setHouseError(null);
  try {
    const { data } = await api.patch(
      `/houseupload/house/${id}`,
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("uploading house",data)

    useHouseStore.getState().setHouseMessage(data.message);
    return data;
  } catch (error) {
    console.error(
      "Uploading house failed:", error ||
      error?.response?.data?.error?.message || error?.message
    );
    useHouseStore
      .getState()
      .setHouseError(
        error?.response?.data?.error?.message || error?.message
      );
    throw error;
  }
}

export async function allHouseListings(page = 1, limit = 100) {
    useHouseStore.getState().setHouseError(null);

  try {
    const { data } = await api.get(`/houseupload/all-listings?page=${page}&limit=${limit}`);
    console.log("All House", data)

    return data;

  } catch (error) {
    console.log(error)
    console.error("Fetching all house:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);

    throw error;
  }
};

export async function myListings(page = 1, limit = 100) {
    useHouseStore.getState().setHouseError(null);

  try {
    const { data } = await api.get(`/houseupload/my-listings?page=${page}&limit=${limit}`);
    console.log("user House", data)

    return data;

  } catch (error) {
    console.log(error)
    console.error("user listing:", error?.response?.data?.error?.message || error?.message);
        useHouseStore.getState().setHouseError(error?.response?.data?.error?.message || error?.message);

    throw error;
  }
};

export async function singleHouse(id) {
    useHouseStore.getState().setHouseError(null);

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
    useHouseStore.getState().setHouseError(null);

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

