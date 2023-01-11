import { initialState } from "../store/index.js";
import {
  FETCH_DATA_WITH_ID,
  GET_ALBUM_ERROR,
  TOGGLE_LOADER,
  GET_ALL_SONGS,
} from "../actions";

const albumReducer = (state = initialState.specificAlbumArray, action) => {
  switch (action.type) {
    case FETCH_DATA_WITH_ID:
      return {
        ...state,
        album: action.payload,
      };
    case GET_ALL_SONGS:
      return {
        ...state,

        content: action.payload, // <- just my preference
      };
    case GET_ALBUM_ERROR:
      return {
        ...state,
        isError: true,
      };
    case TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default albumReducer;
