import { initialState } from "../store/index.js";

const searchReducer = (state = initialState.specificAlbumArray, action) => {
  switch (action.type) {
      case "SET_SEARCH" : 
      return {
        ...state, 
        content: action.payload
      }
    default:
      return state;
  }
};

export default searchReducer;