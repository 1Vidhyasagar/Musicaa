import {
  DATA_IS_LOADING,
  FETCH_FAILED,
  GET_ARTIST_CONTENT,
  GET_ARTIST_DATA,
} from "../actions";
import { initialState } from "../store/index.js";

const artistReducer = (state = initialState.specificArtist, action) => {
  switch (action.type) {
    case GET_ARTIST_DATA:
      return {
        ...state,
        artistProfile: action.payload,
      };
    case GET_ARTIST_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case DATA_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_FAILED:
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default artistReducer;
