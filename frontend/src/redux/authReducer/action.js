import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_ERROR,
  LOGOUT,
} from "./actionTypes";

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post("https://reqres.in/api/login", userData);
    // const response = await axios.post("/api/User/signin", userData);
    const token = response.data.token;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    console.log("API Response:", response.data);
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err });
  }
};

export const UserAction = (user) => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const response = await axios.post(`/api/User/send-otp`, user);
    console.log("OTP sent response:", response.data);
    dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: SIGNIN_ERROR, payload: err.message });
  }
};

// export const VerifyOtpAction = (data) => async (dispatch) => {
//   dispatch({ type: "VERIFY_OTP_REQUEST" });
//   try {
//     const response = await axios.post(`/api/User/verify-otp`, data);
//     console.log("OTP Verification Response:", response.data);
//     dispatch({ type: "VERIFY_OTP_SUCCESS", payload: response.data });
//   } catch (err) {
//     dispatch({ type: "VERIFY_OTP_ERROR", payload: err.message });
//   }
// };

export const VerifyOtpAction =
  ({ email, otp }) =>
  async (dispatch) => {
    try {
      const response = await axios.post("/api/User/verify-otp", { email, otp });

      if (response.data.success) {
        console.log("Dispatching verified user:", response.data.user);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data.user });
      } else {
        dispatch({ type: VERIFY_OTP_ERROR, payload: response.data.error });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      dispatch({
        type: VERIFY_OTP_ERROR,
        payload:
          error.response?.data?.message || "Something went wrong. Try again!",
      });
    }
  };

// export const logout = () => (dispatch) => {
//   dispatch({ type: LOGOUT });
// };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove token
  dispatch({ type: LOGOUT });
};
