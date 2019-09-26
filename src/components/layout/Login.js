import React, { Component } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import "./login.css";
import { loginUser } from "../../actions/authAction";
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    console.log("login");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const logedUser = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("welcome", logedUser);
    this.props.loginUser(logedUser);
  };
  render() {
    const { errors } = this.state;
    console.log("login");
    return (
      // <div>yasir</div>
      <div>
        <h1>Login Here</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            <p className="label-txt">Enter Your Email</p>
            <input
              type="text"
              name="email"
              className="input"
              className={classnames("input", {
                "is-invalid": errors.email
              })}
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <div className="line-box">
              <div className="line" />
            </div>
          </label>

          <label>
            <p className="label-txt">Enter Your Password</p>
            <input
              type="password"
              name="password"
              // className="input"
              className={classnames("input", {
                "is-invalid": errors.password
              })}
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
            <div className="line-box">
              <div className="line" />
            </div>
          </label>

          <button type="submit">submit</button>
          <p className="message mt-3">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
