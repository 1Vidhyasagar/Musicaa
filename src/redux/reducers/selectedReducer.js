import { initialState } from "../store/index.js";

const selectedReducer = (state = initialState.specificAlbumArray, action) => {
  switch (action.type) {
    case "SET_SELECTED_TRACK":
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default selectedReducer;
