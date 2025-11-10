import useAuthStore from "../store/useAuthStore";
import api from "./axiosInstance";

// User Login
export async function logUserIn({ email, password }) {
  try {
    const { data } = await api.post("/auth/signin", { email, password });
    console.log("login details",data)

    useAuthStore.getState().setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    useAuthStore.getState().setUser(data.user);

    return data.user;
  } catch (error) {
    console.log(error)
    console.error("Login failed:", error?.response?.data?.error?.message || error?.message);
     useAuthStore.getState().setError(error?.response?.data?.error?.message || error?.message);
    throw error;
  }
}

// User Registration
export async function regUser({ username, email, password }) {
  try {
    const { data } = await api.post("/auth/signup", {username, email, password });
    console.log("sign up details",data)

    useAuthStore.getState().setEmail(data.data.email);
    useAuthStore.getState().setMessage(data.message);

    return data.user;
  } catch (error) {
    console.log(error)
    console.error("Login failed:", error?.response?.data?.error?.message || error?.message);
    useAuthStore.getState().setError(error?.response?.data?.error?.message || error?.message);
    throw error;
  }
}

// Verify OTP
export async function verifyOtp({ otp }) {
  try {
    const email = useAuthStore.getState().email;

    if (!email) throw new Error("No email found, Register first.");

    const { data } = await api.post("auth/verify-otp", { email, otp });

    console.log("OTP verified:", data);

    return data;
  } catch (error) {
    console.error("OTP verification failed:", error.response?.data || error?.response?.data?.error?.message || error?.message);
    useAuthStore.getState().setError(error.response?.data || error?.response?.data?.error?.message || error?.message);

    throw err;
  }
}

// Resend OTP
export async function resendOtp() {
  try {
    const email = useAuthStore.getState().email;

    if (!email) throw new Error("No email found, Register first.");

    const { data } = await api.post("auth/resend-otp", { email });

    console.log("Resend otp verified:", data);

    return data;
  } catch (error) {
   useAuthStore.getState().setError(error.response?.data || error?.response?.data?.error?.message || error?.message);
    console.error(" Resend OTP verification failed:", error.response?.data || error?.response?.data?.error?.message || error?.message);
    throw err;
  }
};

// Forgot Password
export async function forgotPassword({email}) {
  try {

    if (!email) throw new Error("No email found, Register first.");

    const { data } = await api.post("auth/forgot-password", { email });

    console.log("Forgot password verified:", data);

    return data;
  } catch (error) {
    useAuthStore.getState().setError(error.response?.data || error?.response?.data?.error?.message || error?.message);
    console.error("Password Change failed:", err.response?.data || err.message);
    throw err;
  }
};

// Change Password
export async function changePassword({ oldPassword, newPassword }) {
  try {
    // const email = useAuthStore.getState().email;

    const { data } = await api.post("auth/change-password", { oldPassword, newPassword } );

    console.log("Password Change:", data);

    return data;
  } catch (error) {


   useAuthStore.getState().setError(error.response?.data || error?.response?.data?.error?.message || error?.message);
    console.error("Password Change failed:", err.response?.data || err.message);
    throw err;
  }
};

// Reset Password
export async function resetPassword({ oldPassword, newPassword }) {
  try {
    // const email = useAuthStore.getState().email;

    const { data } = await api.post("auth/reset-password", { oldPassword, newPassword } );

    console.log("Reset password:", data);

    return data;
  } catch (error) {
       useAuthStore.getState().setError(error.response?.data || error?.response?.data?.error?.message || error?.message);

    console.error("Password Change failed:", err.response?.data || err.message);
    throw err;
  }
};