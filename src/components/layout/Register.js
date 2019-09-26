import React, { Component } from "react";
import "./register.css";
import classnames from "classnames";
import { Link } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { regUser } from "../../actions/authAction";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log("hello", newUser);
    this.props.regUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>User Registeration</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            <p className="label-txt">Enter Your Name</p>
            <input
              type="text"
              name="name"
              className={classnames("input", {
                "is-invalid": errors.name
              })}
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <label>
            <p className="label-txt">Enter Your Email</p>
            <input
              type="text"
              name="email"
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
              type="text"
              name="password"
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
          <label>
            <p className="label-txt">Confirm Password</p>
            <input
              type="text"
              name="password2"
              className={classnames("input", {
                "is-invalid": errors.password2
              })}
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
            <div className="line-box">
              <div className="line" />
            </div>
          </label>
          <button type="submit" className="btn">
            submit
          </button>
          <p className="message">
            Already registered? <Link to="/login">Sign In</Link>
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
  { regUser }
)(Register);
