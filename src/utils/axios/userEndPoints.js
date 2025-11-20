import api from "./axiosInstance";
import useAuthStore from "../store/useAuthStore";

// fetch current user
export async function getCurrentUser() {
  try {
    const { data } = await api.get("user/me");
    return data;
  } catch (error) {
    const message = error?.response?.data?.error?.message || error?.message;
    useAuthStore.getState().setError(message);
    throw error;
  }
}

// update profile fields
export async function updateUserProfile(formData) {
  try {
    const { data } = await api.patch("user/update", formData);
    useAuthStore.getState().setUser(data.user);
    useAuthStore.getState().setMessage(data.message);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error?.message || error?.message;
    useAuthStore.getState().setError(message);
    throw error;
  }
}

// upload profile picture
export async function uploadProfilePicture(file) {
  try {
    const fd = new FormData();
    fd.append("profilePics", file);
    const { data } = await api.post("user/upload-profile", fd);
    const userRes = await getCurrentUser();
    useAuthStore.getState().setUser(userRes.user);
    useAuthStore.getState().setMessage(data.message);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error?.message || error?.message;
    useAuthStore.getState().setError(message);
    throw error;
  }
}

// rollback / delete profile picture
export async function rollbackProfilePicture(publicId) {
  try {
    const { data } = await api.post("user/rollback-image", { publicId });
    const userRes = await getCurrentUser();
    useAuthStore.getState().setUser(userRes.user);
    useAuthStore.getState().setMessage(data.message);
    return data;
  } catch (error) {
    const message = error?.response?.data?.error?.message || error?.message;
    useAuthStore.getState().setError(message);
    throw error;
  }
}
