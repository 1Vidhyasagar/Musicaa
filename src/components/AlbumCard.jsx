import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { likeOrUnlike, setDefaultHome } from "../redux/actions";
import { useState, useEffect } from "react";

const mapStateToProps = (state) => ({
  searchArray: state.search.content,
  likedSongs: state.likes.content,
});

const mapDispatchToProps = (dispatch) => ({
  setLike: (element, dispatchName) => {
    dispatch(likeOrUnlike(element, dispatchName));
  },
});

const AlbumCard = ({ song, setLike, likedSongs }) => {
  const toggleLike = (element) => {
    if (likedSongs.filter((el) => el.id === song?.id).length < 1) {
      setLike(element, "LIKE");
    } else {
      setLike(element, "REMOVE_LIKE");
    }
  };
  const [likeStyle, setLikeStyle] = useState("");

  return (
    <div className="album-div col text-center position-relative" id={song?.id}>
      <div
        className=""
        onMouseEnter={() => setLikeStyle("show-like-heart")}
        onMouseLeave={() => setLikeStyle("")}
      >
        <i
          className={
            likedSongs.filter((el) => el.id === song?.id).length > 0
              ? `bi bi-heart-fill like-heart ${likeStyle}`
              : `bubble bi bi-heart like-heart ${likeStyle}`
          }
          onClick={() => toggleLike(song)}
        ></i>

        <Link to={"/album/" + song?.album.id}>
          <div>
            <img className="img-fluid" src={song?.album.cover_medium} alt="1" />
          </div>
        </Link>
        <p>
          <Link to={"/album/" + song?.album.id}>
            <span>Album:&nbsp;</span>
            <span>
              "
              {song?.album.title.length < 16
                ? song?.album.title
                : song?.album.title.substring(0, 16) + "..."}
              "
            </span>
            <br />
          </Link>
          <Link to={"/artist/" + song?.artist.id}>
            <span>Artist:&nbsp;</span>
            <span>{song?.artist.name}</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCard);
