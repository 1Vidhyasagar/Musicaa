export const FETCH_DATA_WITH_ID = "FETCH_DATA_WITH_ID";
export const GET_ALL_SONGS = "GET_ALL_SONGS";
export const GET_ALBUM_ERROR = "GET_ALBUM_ERROR";
export const TOGGLE_LOADER = "TOGGLE_LOADER";
export const SET_USERNAME = "SET_USERNAME";
// Artists
export const GET_ARTIST_DATA = "GET_ARTIST_DATA";
export const GET_ARTIST_CONTENT = "GET_ARTIST_CONTENT";
export const DATA_IS_LOADING = "DATA_IS_LOADING";
export const FETCH_FAILED = "FETCH_FAILED";

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name,
});

export const getAlbumAction = (albumId) => {
  return async (dispatch) => {
    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "222902beabmshb95a65b737cead6p1f3ac9jsn23ced94c0d20",
    });

    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId,
        {
          method: "GET",
          headers,
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        //let newData = data.data;
        // now it's time do to the dispatch
        dispatch({
          type: GET_ALL_SONGS,
          payload: data.tracks.data,
        });

        dispatch({
          type: FETCH_DATA_WITH_ID,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: TOGGLE_LOADER,
            payload: false,
          });
        }, 1000);
      } else {
        console.log("Houston, we got an error :(");
        // we can also dispatch ANOTHER action here for the error!
        dispatch({
          type: GET_ALBUM_ERROR,
        });
        dispatch({
          type: TOGGLE_LOADER,
          payload: false,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ALBUM_ERROR,
      });
      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      });
    }
  };
};

const SET_SEARCH = "SET_SEARCH";

export const fetchSearch = (string) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + string,
        {
          method: "GET",
          headers: new Headers({
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key":
              "222902beabmshb95a65b737cead6p1f3ac9jsn23ced94c0d20",
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        const songs = result.data;
        dispatch({
          type: SET_SEARCH,
          payload: songs,
        });
      } else {
        console.log("ERROR: problem with fetch");
      }
    } catch (err) {
      console.log("ERROR: could not fetch search", err);
    }
  };
};

export const setDefaultHome = (artistName, category) => {
  return async (dispatch) => {
    console.log(category);
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          artistName,
        {
          method: "GET",
          headers: new Headers({
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
          }),
        }
      );
      let result = await response.json();
      let songInfo = result.data;
      dispatch({
        type: category,
        payload: songInfo[0],
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const likeOrUnlike = (element, dispatchName) => {
  return async (dispatch) => {
    dispatch({
      type: dispatchName,
      payload: element,
    });
  };
};
export const setSelectedTrack = (element) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_SELECTED_TRACK",
      payload: element,
    });
  };
};
// Artist Actions Functions below
export const getSelectedArtistInfo = (artistId) => {
  return async (dispatch) => {
    dispatch({
      type: DATA_IS_LOADING,
      payload: true,
    });
    let headers = new Headers({
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387",
    });

    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId,
        {
          method: "GET",
          headers,
        }
      );

      if (response.ok) {
        let artist = await response.json();
        // setArtist(artist);
        dispatch({
          type: GET_ARTIST_DATA,
          payload: artist,
        });
        setTimeout(() => {
          dispatch({
            type: DATA_IS_LOADING,
            payload: false,
          });
        }, 1000);
        let tracksResponse = await fetch(
          "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
            artist.name,
          {
            method: "GET",
            headers,
          }
        );
        if (tracksResponse.ok) {
          let tracklist = await tracksResponse.json();
          //   setSongs(tracklist.data);
          dispatch({
            type: GET_ARTIST_CONTENT,
            payload: tracklist.data,
          });
        } else {
          dispatch({
            type: FETCH_FAILED,
            payload: true,
          });
        }
      } else {
        dispatch({
          type: DATA_IS_LOADING,
          payload: false,
        });
        dispatch({
          type: FETCH_FAILED,
          payload: true,
        });
      }
    } catch (exception) {
      console.log(exception);
      dispatch({
        type: DATA_IS_LOADING,
        payload: false,
      });
      dispatch({
        type: FETCH_FAILED,
        payload: true,
      });
    }
  };
};
