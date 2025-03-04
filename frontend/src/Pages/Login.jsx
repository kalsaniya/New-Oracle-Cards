// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "../redux/authReducer/action";

// export const Login = () => {
//   const navigate = useNavigate(); // Initialize navigate function

//   const FORM = styled.form`
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     padding: 20px;
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//     width: 300px;
//     margin: 0 auto;

//     input {
//       padding: 10px;
//       border: 1px solid #ccc;
//       border-radius: 5px;
//     }

//     button {
//       padding: 10px;
//       background: #007bff;
//       color: white;
//       border: none;
//       border-radius: 5px;
//       cursor: pointer;
//     }

//     button:hover {
//       background: #0056b3;
//     }
//   `;

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { auth } = useSelector((store) => store.authReducer);
//   // console.log(state);
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       email,
//       password,
//     };
//     dispatch(login(userData));
//     console.log(userData);
//     setEmail("");
//     setPassword("");
//   };

//   // Redirect user if logged in
//   useEffect(() => {
//     if (auth) {
//       navigate("/"); // Redirect to homepage
//     }
//   }, [auth, navigate]);

//   return (
//     <div>
//       {/* <DIV> */}
//       <h2>User Login</h2>
//       <h3>{auth ? "Login Successfull" : "Login in to Continue"}</h3>
//       <FORM action="" className="form-1" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Log In</button>
//       </FORM>
//       {/* </DIV> */}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserAction, VerifyOtpAction } from "../redux/authReducer/action";

export const Login = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const dispatch = useDispatch();

  const { LoginUser, isLoading, err, otpSuccess } = useSelector(
    (state) => state.authReducer
  );

  const { auth } = useSelector((store) => store.authReducer);

  console.log("Auth", auth);

  console.log("LoginUser:", LoginUser);
  console.log("otpSuccess:", otpSuccess);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (otpSuccess && LoginUser && Object.keys(LoginUser).length > 0) {
      localStorage.setItem("LoginUser", JSON.stringify(LoginUser));
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/"); // Redirect to homepage
      }, 2000);
    }
  }, [otpSuccess, LoginUser, navigate]);
  // useEffect(() => {
  //   console.log("Checking OTP Success State...");
  //   console.log("otpSuccess:", otpSuccess);
  //   console.log("LoginUser:", LoginUser);

  //   if (otpSuccess && LoginUser) {
  //     console.log("Redirecting to homepage...");
  //     localStorage.setItem("LoginUser", JSON.stringify(LoginUser));
  //     toast.success("Login successful!");

  //     setTimeout(() => {
  //       navigate("/");
  //     }, 2000);
  //   }
  // }, [otpSuccess, LoginUser]); // Ensure dependencies are correct

  console.log(localStorage.getItem("LoginUser"));

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await dispatch(UserAction({ email }));
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      await dispatch(VerifyOtpAction({ email, otp }));
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <h3>{otpSuccess ? "Login Successful" : "Login to Continue"}</h3>
      {err && <p className="error-message">Error! Please try again.</p>}
      <FORM onSubmit={otpSent ? verifyOtpHandler : sendOtpHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {otpSent && (
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        )}
        <button type="submit">{otpSent ? "Verify OTP" : "Send OTP"}</button>
      </FORM>
      <ToastContainer />
    </div>
  );
};

const FORM = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
`;
