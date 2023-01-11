import { initialState } from "../store/index.js";

const likesReducer = (state = initialState.likes, action) => {
  switch (action.type) {
    case "LIKE": 
    return {
        ...state,
    content: [
      ...state.content,
       action.payload
    ],
  }
  case "REMOVE_LIKE": 
    return {
      ...state,
    content: [
      
    ...state.content.filter(element => element._id !== action.payload._id)
    ],			
  }
    default:
      return state;
  }
};

export default likesReducer;





	
	