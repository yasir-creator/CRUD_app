import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
// import { TEST_DISPATCH } from "./types";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User

export const registeruser = (userData, history) => dispatch => {
  //   return {
  //     type: TEST_DISPATCH,
  //     payload: userData
  //   };

  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res =>
      //   console.log("this is the response of register", res);
      history.push("/login")
    )
    .catch(e =>
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data
      })
    );
};

// Login.. Get user Token
export const loginuser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      // Save to localstorage
      console.log(res);
      const { token } = res.data;
      // Set token in localstorage
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(e =>
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  console.log("form logout", decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User log out
export const logoutUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
// User Cart
export const cartUser = () => dispatch => {
  localStorage.addItem("jwtToken");
  setAuthToken(true);
  dispatch(setCurrentUser({}));
};
