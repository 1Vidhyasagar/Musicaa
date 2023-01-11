import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { Row } from "react-bootstrap";
import Artist from "./components/Artist";
import Album from "./components/Album";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { fetchSearch } from "./redux/actions";
import Liked from "./components/Liked";
let headers = new Headers({
  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  "X-RapidAPI-Key": "222902beabmshb95a65b737cead6p1f3ac9jsn23ced94c0d20",
});

const mapStateToProps = (state) => ({
  searchArray: state.search.content,
  userName: state.user.name,
});

//setJobs takes a url
const mapDispatchToProps = (dispatch) => ({
  searchForQuery: (string) => {
    dispatch(fetchSearch(string));
  },
});

const App = ({ searchForQuery, userName }) => {
  const [searchResults, setSearchResults] = useState([]);

  const search = async (string) => {
    if (string.length > 2) {
      searchForQuery(string);
    }
  };

  return (
    <Router>
      <div className="container-fluid">
        <Row>
          {userName ? (
            <>
              <Route
                path="/"
                exact
                render={() => <Home searchResults={searchResults} />}
              />
              <Route path="/artist/:id" component={Artist} />
              <Route path="/album/:id" component={Album} />
              <Route path="/liked" component={Liked} />{" "}
              <Sidebar search={search} />
            </>
          ) : (
            <>
              <Sidebar search={search} />
              <div className="container-fluid text-center text-light">
                <h1>sign in</h1>
              </div>
            </>
          )}
        </Row>
      </div>
      <Player />
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
