import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import jwt_decode from "jwt-decode";
import setToken from "./utiltities/setToken";
import { CurrentUser, logoutUser } from "./actions/authAction";
import { Provider } from "react-redux";

import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import addProduct from "./components/layout/addProduct";
import EditProduct from "./components/layout/editproduct/EditProduct";
import Contact from "./components/layout/Contact";
import About from "./components/layout/About";

import Register from "./components/layout/Register";
import Login from "./components/layout/Login";

import "./App.css";
//Check for token
if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(CurrentUser(decoded));
  const currentTime = Date.now() / 2000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href("/login");
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/addproduct" component={addProduct} />
              <PrivateRoute exact path="/editproduct" component={EditProduct} />
            </Switch>
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
