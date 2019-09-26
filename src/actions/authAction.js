import axios from "axios";
import setToken from "../utiltities/setToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, CURRENT_USER, DELETE_USER } from "./type";

export const regUser = (logedUser, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", logedUser)
    .then(res => history.push("/login"))
    .catch(e => {
      console.log(e);
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data
      });
    });
};

export const loginUser = logedUser => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", logedUser)
    .then(res => {
      console.log(res);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setToken(token);
      const decoded = jwt_decode(token);
      dispatch(CurrentUser(decoded));
    })
    .catch(e =>
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data
      })
    );
};

export const CurrentUser = decoded => {
  console.log("from login user", decoded);
  return {
    type: CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setToken(false);

  dispatch(CurrentUser({}));
};

export const deleteuserProduct = (id, history) => dispatch => {
  axios
    .delete(`http://localhost:5000/api/products/${id}`)
    .then(
      res =>
        dispatch({
          type: DELETE_USER,
          payload: res.data
        })

      // console.log("response", res)
    )
    .catch(e =>
      dispatch({
        type: GET_ERRORS,
        payload: e.response.data
      })
    );
};
