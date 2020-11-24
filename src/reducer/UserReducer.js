import { act } from "react-dom/test-utils";

export const initialState = null;

export const UserReducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  } else if (action.type === "CLEAR") {
    return null;
  } else if (action.type === "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  } else if (action.type === "UPDATE_PIC") {
    return {
      ...state,
      pic: action.payload,
    };
  }
  return state;
};
