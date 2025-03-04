const initialState = {
  isLoading: false,
  otpLoading: false,
  isError: false,
  otpError: false,
  auth: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") || null,
  otpSuccess: false,
  LoginUser: null, // ✅ Ensure this is initialized
};

// export const reducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case "LOGIN_REQUEST":
//       return { ...state, isLoading: true, isError: false };

//     case "LOGIN_SUCCESS":
//       localStorage.setItem("token", payload); // Save token in localStorage
//       return { ...state, isLoading: false, auth: true, token: payload };

//     case "LOGIN_FAILURE":
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//         auth: false,
//         token: null,
//       };

//     case "LOGOUT":
//       localStorage.removeItem("token"); // Remove token on logout
//       return { ...state, auth: false, token: null };

//     default:
//       return state;
//   }
// };

export const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SIGNIN_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SIGNIN_SUCCESS":
      console.log("LoginUser in Reducer:", payload);
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case "SIGNIN_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
        err: payload,
      };

    case "VERIFY_OTP_REQUEST":
      return {
        ...state,
        otpLoading: true,
      };

    case "VERIFY_OTP_SUCCESS":
      console.log("OTP Verified User:", payload);
      return {
        ...state,
        otpLoading: false,
        otpSuccess: true,
        auth: true, // Set authentication state
        LoginUser: payload, // Storing verified user
        token: payload.token, // Ensure token is stored if applicable
      };
    case "VERIFY_OTP_ERROR":
      return {
        ...state,
        otpLoading: false,
        otpError: payload,
        otpSuccess: false,
      };

    default:
      return state;
  }
};
