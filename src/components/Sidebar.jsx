import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { fetchSearch } from "../redux/actions/index.js";
import MyModal from "./MyModal";
import Liked from "./Liked.jsx";

const mapStateToProps = (state) => ({
  searchArray: state.search.content,
  userName: state.user.name,
  likedLength: state.likes.content.length,
});

//searchForQuery takes the query as a string
const mapDispatchToProps = (dispatch) => ({
  searchForQuery: (string) => {
    dispatch(fetchSearch(string));
  },
});

const Sidebar = ({ search, searchArray, userName, likedLength }) => {
  const [showModal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="col-2">
        <nav
          className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between"
          id="sidebar"
        >
          <div className="nav-container">
            <Link to="/" className="navbar-brand">
              <img
                src="/logo/Spotify_Logo.png"
                alt="Spotify_Logo"
                width="131"
                height="40"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <ul>
                  <li>
                    <Link to="/" className="nav-item nav-link">
                      <i className="fas fa-home fa-lg"></i>&nbsp; Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-item nav-link">
                      <i className="fas fa-book-open fa-lg"></i>&nbsp; Your
                      Library
                    </Link>
                  </li>

                  {search && (
                    <li>
                      <div className="input-group mt-3">
                        {  <input
                          type="text"
                          className="form-control mb-2"
                          id="searchField"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                          onChange={(event) =>
                            setSearchInput(event.currentTarget.value)
                          }
                        /> }
                        <div
                          className="input-group-append"
                          style={{ marginBottom: "4%" }}
                        >
                          {<button
                            className="btn btn-outline-secondary btn-sm"
                            type="button"
                            id="button-addon1"
                            onClick={() => search(searchInput)}
                          >
                            GO
                          </button> }
                        </div>
                      </div>
                    </li>
                  )}
                  <li className="mt-5">
                    <i className="bi bi-heart sidebar-liked"></i>&nbsp;
                    <span id="like-bar-text">{likedLength} Liked</span>
                  </li>
                  {userName && (
                    <div className="liked-songs-list mt-2">
                      <Liked />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <hr className="hr-styled" />

          {showModal && <MyModal username={userName}  />}

          {userName ? (
            <>
              <div>
                <p className="text-download" style={{ marginLeft: 20 }}>
                  Install App
                </p>
              </div>
            </>
          ) : (
            <div className="nav-btn">
              <button className="btn" id="signup-btn" type="button">
                Sign Up
              </button>
              <button
                className="btn"
                id="login-btn"
                type="button"
                onClick={() => {
                  setModal(true);
                }}
              >
                Login
              </button>
              <a href="/">Cookie Policy</a> |<a href="/"> Privacy</a>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
