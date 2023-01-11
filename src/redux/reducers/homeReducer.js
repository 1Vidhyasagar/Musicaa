import { initialState } from "../store/index.js";

const homeReducer = (state = initialState.mainHomeContent, action) => {
  switch (action.type) {
    case "SET_ROCK_SONGS": 
    return {
      ...state,
      content : {
        ...state.content,
        rockSongs : [...state.content.rockSongs, action.payload]
      }  
    }
    case "SET_HIPHOP_SONGS": 
    return {
      ...state,
      content : {
        ...state.content,
        hipHopSongs : [...state.content.hipHopSongs, action.payload]
      }  
    }
    case "SET_POP_SONGS": 
    return {
      ...state,
      content : {
        ...state.content,
        popSongs : [...state.content.popSongs, action.payload]
      }  
    }
    default:
      return state;
  }
};

export default homeReducer;
