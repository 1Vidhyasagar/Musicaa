import React from "react";
import { likeOrUnlike, setSelectedTrack } from "../redux/actions";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
  likedSongs: state.likes.content,
  selectedSong: state.current.selected,
});

const mapDispatchToProps = (dispatch) => ({
  setSelected: (track) => {
    dispatch(setSelectedTrack(track));
  },
});

const Song = ({ track, selected, likedSongs, setSelected }) => {
  const toggleSelected = (element) => {
    setSelected(element);
  };
  return (
    <>
      <div className="py-3 trackHover" onClick={() => toggleSelected(track)}>
        <span className="card-title trackHover px-3" style={{ color: "white" }}>
          {track.title}
        </span>
        <small className="duration" style={{ color: "white" }}>
          {Math.floor(parseInt(track.duration) / 60)}:
          {parseInt(track.duration) % 60 < 10
            ? "0" + (parseInt(track.duration) % 60)
            : parseInt(track.duration) % 60}
        </small>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
