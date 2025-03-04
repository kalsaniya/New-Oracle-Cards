// import {
//   FETCH_ONECARD_REQUEST,
//   FETCH_ONECARD_SUCCESS,
//   FETCH_ONECARD_FAILURE,
// } from "../oneCardReducer/actionTypes";

// const initialState = {
//   data: [],
//   loading: false,
//   error: null,
// };

// const oneCardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_ONECARD_REQUEST:
//       return { ...state, loading: true };

//     case FETCH_ONECARD_SUCCESS:
//       return { ...state, loading: false, data: action.payload };

//     case FETCH_ONECARD_FAILURE:
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

// export default oneCardReducer;

import {
  FETCH_ONECARD_REQUEST,
  FETCH_ONECARD_SUCCESS,
  FETCH_ONECARD_FAILURE,
  SAVE_ONECARD_REQUEST,
  SAVE_ONECARD_SUCCESS,
  SAVE_ONECARD_FAILURE,
} from "../oneCardReducer/actionTypes";

const initialState = {
  data: [],
  loading: false,
  error: null,
  saveSuccess: false, // New state for tracking save success
};

// const oneCardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_ONECARD_REQUEST:
//     case SAVE_ONECARD_REQUEST:
//       return { ...state, loading: true, saveSuccess: false };

//     case FETCH_ONECARD_SUCCESS:
//       return { ...state, loading: false, data: action.payload };

//     case SAVE_ONECARD_SUCCESS:
//       return { ...state, loading: false, saveSuccess: true };

//     case FETCH_ONECARD_FAILURE:
//     case SAVE_ONECARD_FAILURE:
//       return { ...state, loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

const oneCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ONECARD_REQUEST:
      return { ...state, loading: true };

    case FETCH_ONECARD_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_ONECARD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SAVE_ONECARD_REQUEST:
      return { ...state, loading: true, savedCardStatus: null };

    case SAVE_ONECARD_SUCCESS:
      return {
        ...state,
        loading: false,
        savedCardStatus: "Card saved successfully!",
      };

    case SAVE_ONECARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        savedCardStatus: "Failed to save card.",
      };

    default:
      return state;
  }
};

export default oneCardReducer;
