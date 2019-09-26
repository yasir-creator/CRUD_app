import axios from "axios";
import { GET_ERRORS, GET_PRODUCTS } from "./type";

export const userProduct = () => dispatch => {
  axios
    .get("http://localhost:5000/api/products", userProduct)
    .then(res =>
      //   console.log("yahoooo", res);
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
    )
    .catch(e =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};
