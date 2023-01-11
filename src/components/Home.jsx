import React from "react";
import AlbumCard from "./AlbumCard";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setDefaultHome, likeOrUnlike } from "../redux/actions";

const mapStateToProps = (state) => ({
  searchArray: state.search.content,
  rockSongs: state.mainHomeContent.content.rockSongs,
  popSongs: state.mainHomeContent.content.popSongs,
  hipHopSongs: state.mainHomeContent.content.hipHopSongs,
  likedSongs: state.likes.content,
});

const mapDispatchToProps = (dispatch) => ({
  setFreshHome: (string, category) => {
    dispatch(setDefaultHome(string, category));
  },
  setLike: (element, dispatchName) => {
    dispatch(likeOrUnlike(element, dispatchName));
  },
});

const Home = ({
  setLike,
  likedSongs,
  searchArray,
  setFreshHome,
  rockSongs,
  popSongs,
  hipHopSongs,
}) => {
  let rockArtists = [
    "queen",
    "u2",
    "thepolice",
    "eagles",
    "thedoors",
    "oasis",
    "thewho",
    "bonjovi",
    "AC/DC",
    "sabbath",
    "nirvana",
    "doors",
  ];

  let popArtists = [
    "arianagrande",
    "maroon5",
    "onerepublic",
    "coldplay",
    "katyperry",
    "bieber",
    "adele",
    "rihanna",
  ];

  let hipHopArtists = [
    "eminem",
    "snoopdogg",
    "lilwayne",
    "drake",
    "kanyewest",
    "dre",
    "drake",
    "outkast",
  ];

  const setHome = async () => {
    if (rockSongs.length < 4 && popSongs.length < 4 && hipHopSongs.length < 4) {
      let rockRandomArtists = [];
      let popRandomArtists = [];
      let hipHopRandomArtists = [];
      console.log("START OF FUNCTION");

      while (rockRandomArtists.length < 1) {
        let artist =
          rockArtists[Math.floor(Math.random() * rockArtists.length)];
        if (!rockRandomArtists.includes(artist)) {
          rockRandomArtists.push(artist);
        }
      }

      while (popRandomArtists.length < 1) {
        let artist = popArtists[Math.floor(Math.random() * popArtists.length)];
        if (!popRandomArtists.includes(artist)) {
          popRandomArtists.push(artist);
        }
      }

      while (hipHopRandomArtists.length < 1) {
        let artist =
          hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];
        if (!hipHopRandomArtists.includes(artist)) {
          hipHopRandomArtists.push(artist);
        }
      }
      if (rockSongs.length > 4) {
      } else {
        for (let j = 0; j < rockRandomArtists.length; j++)
          setFreshHome(rockRandomArtists[j], "SET_ROCK_SONGS");
      }
      if (popSongs.length > 4) {
      } else {
        for (let k = 0; k < popRandomArtists.length; k++)
          setFreshHome(popRandomArtists[k], "SET_POP_SONGS");
      }
      if (hipHopSongs.length > 4) {
      } else {
        for (let l = 0; l < hipHopRandomArtists.length; l++)
          setFreshHome(hipHopRandomArtists[l], "SET_HIPHOP_SONGS");
        console.log("finish function");
      }
    }
  };

  const toggleLike = (element) => {
    if (likedSongs.filter((el) => el.id === element.id).length < 1) {
      setLike(element, "LIKE");
    } else {
      setLike(element, "REMOVE_LIKE");
    }
  };

  useEffect(() => {
    setHome();
  });

  return (
    <Col className="col-12 col-md-9 offset-md-3 mainPage">
      <Row>
        <div className="col-9 col-lg-11 mainLinks d-none d-md-flex">
          <div>TRENDING</div>
          <div>PODCAST</div>
          <div>MOODS AND GENRES</div>
          <div>NEW RELEASES</div>
          <div>DISCOVER</div>
        </div>
      </Row>
      {searchArray.length > 0 && (
        <Row>
          <Col xs={10}>
            <div id="searchResults">
              <h2>Search Results</h2>
              <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                {searchArray.map((song) => (
                  <AlbumCard
                    song={song}
                    key={song?.id}
                    onClick={() => toggleLike(song)}
                  />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      )}
      {searchArray.length === 0 && (
        <>
          <Row>
            <Col xs={10}>
              <div id="rock">
                <h2>Rock Classics</h2>
                <Row
                  className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                  id="rockSection"
                >
                  {rockSongs.map((song) => (
                    <AlbumCard
                      song={song}
                      key={song?.id}
                      onClick={() => toggleLike(song)}
                    />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <div id="pop">
                <h2>Pop Culture</h2>
                <Row
                  className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                  id="popSection"
                >
                  {popSongs?.map((song) => (
                    <AlbumCard song={song} key={song?.id} />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <div id="hiphop">
                <h2>#HipHop</h2>
                <Row
                  className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                  id="hipHopSection"
                >
                  {hipHopSongs.map((song) => (
                    <AlbumCard song={song} key={song?.id} />
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Col>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
