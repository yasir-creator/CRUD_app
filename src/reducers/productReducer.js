import { GET_PRODUCTS, DELETE_USER } from "../actions/type";
import isEmpty from "../validations/is-empty";

const initialState = {
  isAuthenticated: false,
  want: "",
  userProduct: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        // isAuthenticated: !isEmpty(action.payload),
        userProduct: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        userProduct: state.userProduct.filter(
          pro => pro._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
