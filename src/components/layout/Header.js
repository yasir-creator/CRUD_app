import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    console.log("in logout");
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a
          className="navbar-brand"
          href="#"
          style={{
            color: "white"
          }}
        >
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn ">
                <Link
                  to="/home"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  Home
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn ">
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  About
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn ">
                <Link
                  to="/contact"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  Contact
                </Link>
              </button>
            </li>
          </ul>
          <ul className="navbar- nav ">
            <li className="nav-item">
              <button
                onClick={this.onLogoutClick}
                className="btn "
                style={{
                  textDecoration: "none",
                  marginTop: 5,
                  color: "white"
                }}
              >
                <img
                  className="rounded-circle"
                  src={user.avatar}
                  // alt={user.name}
                  style={{ width: "25px", marginRight: "5px" }}
                />{" "}
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );

    const guestLinks = (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a
          className="navbar-brand"
          href="#"
          style={{
            color: "white"
          }}
        >
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn ">
                <Link
                  to="/home"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  Home
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn ">
                <Link
                  to="/about"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  About
                </Link>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn ">
                <Link
                  to="/contact"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  Contact
                </Link>
              </button>
            </li>
          </ul>
          <ul className="navbar- nav ">
            <li className="nav-item  ">
              <button className="btn  mr-2 ">
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  Sign Up
                </Link>
              </button>
            </li>
            <li className="nav-item  ">
              <button className="btn ">
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white"
                  }}
                >
                  Login
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
