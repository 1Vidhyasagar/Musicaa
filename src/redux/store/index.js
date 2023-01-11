import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import albumReducer from "../reducers/albumReducer";
import artistReducer from "../reducers/artistReducer";
import likesReducer from "../reducers/likesReducer";
import homeReducer from "../reducers/homeReducer";
import userReducer from "../reducers/user";
import searchReducer from "../reducers/searchReducer";
import selectedReducer from "../reducers/selectedReducer";

const aComposeFunctionThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  current: {
    selected: {},
  },
  mainHomeContent: {
    content: {
      rockSongs: [],
      popSongs: [],
      hipHopSongs: [],
    },
    isLoading: true,
    isError: false,
  },
  specificAlbumArray: {
    album: {},
    content: [],
    isLoading: true,
    isError: false,
  },
  specificArtist: {
    artistProfile: {},
    content: [],
    isLoading: true,
    isError: false,
  },

  search: {
    content: [],
    isError: false,
    isLoading: true,
  },
  likes: {
    content: [],
  },
  user: {
    name: "",
  },
};

const persistConfig = {
  key: "root",
  storage,
};

const bigReducer = combineReducers({
  mainHomeContent: homeReducer,
  current: selectedReducer,
  search: searchReducer,
  specificAlbumArray: albumReducer,
  specificArtist: artistReducer,
  likes: likesReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  aComposeFunctionThatAlwaysWorks(applyMiddleware(thunk))
);

export const persister = persistStore(store);
