// import axios from "axios";
// import {
//   FETCH_ONECARD_REQUEST,
//   FETCH_ONECARD_SUCCESS,
//   FETCH_ONECARD_FAILURE,
// } from "../oneCardReducer/actionTypes";

// export const fetchOneCard = () => async (dispatch) => {
//   dispatch({ type: FETCH_ONECARD_REQUEST });

//   try {
//     const response = await axios.get("/api/savedcard/getcard"); // Replace with actual API
//     dispatch({
//       type: FETCH_ONECARD_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_ONECARD_FAILURE,
//       payload: error.message,
//     });
//   }
// };

import axios from "axios";
import {
  FETCH_ONECARD_REQUEST,
  FETCH_ONECARD_SUCCESS,
  FETCH_ONECARD_FAILURE,
  SAVE_ONECARD_REQUEST,
  SAVE_ONECARD_SUCCESS,
  SAVE_ONECARD_FAILURE,
} from "../oneCardReducer/actionTypes";

export const fetchOneCard = () => async (dispatch) => {
  dispatch({ type: FETCH_ONECARD_REQUEST });

  try {
    const response = await axios.get("/api/savedcard/getcard"); // Replace with actual API
    dispatch({
      type: FETCH_ONECARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ONECARD_FAILURE,
      payload: error.message,
    });
  }
};

// export const saveOneCard = (id, cardData) => async (dispatch) => {
//   dispatch({ type: SAVE_ONECARD_REQUEST });

//   try {
//     const response = await axios.put(`/api/Users/updateuser/${id}`, cardData); // Assuming user ID is required
//     dispatch({
//       type: SAVE_ONECARD_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: SAVE_ONECARD_FAILURE,
//       payload: error.message,
//     });
//   }
// };

export const saveOneCard = (cardId, userId) => async (dispatch) => {
  dispatch({ type: SAVE_ONECARD_REQUEST });

  try {
    const response = await axios.put(`/api/user/update/${userId}`, {
      savedCards: [cardId], // Sending the card ID to save
    });

    dispatch({
      type: SAVE_ONECARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SAVE_ONECARD_FAILURE,
      payload: error.message,
    });
  }
};
