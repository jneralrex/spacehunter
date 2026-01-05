import api from "./axiosInstance";

// Create Report (Public/User)
export async function createReport(formData) {
  try {
    const { data } = await api.post("/reports/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// Get All Reports (Admin)
export async function getAllReports(page = 1, limit = 10, status = "", targetModel = "") {
  try {
    const { data } = await api.get(`/reports/all?page=${page}&limit=${limit}&status=${status}&targetModel=${targetModel}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// Get Single Report (Admin)
export async function getSingleReport(id) {
  try {
    const { data } = await api.get(`/reports/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// Update Report Status (Admin)
export async function updateReportStatus(id, status, adminComments = "") {
  try {
    const { data } = await api.patch(`/reports/${id}/status`, { status, adminComments });
    return data;
  } catch (error) {
    throw error;
  }
}
