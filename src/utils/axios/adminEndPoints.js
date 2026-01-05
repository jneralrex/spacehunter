import api from "./axiosInstance";

// User Management
export async function getAllUsers(page = 1, limit = 10, search = "") {
  try {
    const { data } = await api.get(`/admin/users?page=${page}&limit=${limit}&search=${search}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function suspendUser(id) {
  try {
    const { data } = await api.patch(`/admin/users/${id}/suspend`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unsuspendUser(id) {
  try {
    const { data } = await api.patch(`/admin/users/${id}/unsuspend`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// House Management
export async function getAllHouses(page = 1, limit = 10, search = "", status = "") {
  try {
    const { data } = await api.get(`/admin/houses?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function suspendHouse(id) {
  try {
    const { data } = await api.patch(`/admin/houses/${id}/suspend`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unsuspendHouse(id) {
  try {
    const { data } = await api.patch(`/admin/houses/${id}/unsuspend`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteHouse(id) {
  try {
    const { data } = await api.delete(`/admin/houses/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// Roommate Search Management
export async function getAllRoommateSearches(page = 1, limit = 10) {
  try {
    const { data } = await api.get(`/admin/roommate-searches?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function suspendRoommateSearch(id) {
  try {
    const { data } = await api.patch(`/admin/roommate-searches/${id}/suspend`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function unsuspendRoommateSearch(id) {
  try {
    const { data } = await api.patch(`/admin/roommate-searches/${id}/unsuspend`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRoommateSearch(id) {
  try {
    const { data } = await api.delete(`/admin/roommate-searches/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}
