import React, { Component } from "react";
import axios from "axios";
// import { GET_ERRORS } from "../../actions/type";

class EditProduct extends Component {
  state = {
    id: "",
    name: "",
    date: "",
    price: "",
    color: "",
    size: "",
    desc: ""
  };

  componentDidMount() {
    const { editProduct } = this.props.location.state;
    this.setState({
      id: editProduct._id,
      name: editProduct.name,
      date: editProduct.date,
      price: editProduct.price,
      color: editProduct.color,
      size: editProduct.size,
      desc: editProduct.desc
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const editProduct = {
      name: this.state.name,
      date: this.state.date,
      price: this.state.price,
      color: this.state.color,
      size: this.state.size,
      desc: this.state.desc
    };
    console.log("Successfully Edit", editProduct);
    axios
      .put(
        `http://localhost:5000/api/products/edit/${this.state.id}`,
        editProduct
      )
      .then(res => this.props.history.push("/home"))
      .catch(e =>
        // dispatch({
        //   type: GET_ERRORS,
        //   payoad: e.response.data
        // })
        console.log(e)
      );
    // this.props.history.push("/home");
  };

  render() {
    // const { editProduct } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Edit Product</h1>

          <div className="form-group">
            <label
              style={{
                fontSize: 25
              }}
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.onChange}
              value={this.state.name}
              placeholder="Enter Product Name"
              required
            />
          </div>

          <div className="form-group">
            <label
              style={{
                fontSize: 25
              }}
            >
              Product Price
            </label>
            <input
              type="price"
              name="price"
              className="form-control"
              onChange={this.onChange}
              value={this.state.price}
              placeholder="Enter Product Price"
              required
            />
          </div>
          <div className="form-group">
            <label
              style={{
                fontSize: 25
              }}
            >
              Product Color
            </label>
            <select
              type="color"
              name="color"
              className="form-control"
              onChange={this.onChange}
              value={this.state.color}
            >
              <option>white</option>
              <option> blue </option>
              <option> black </option>
            </select>
          </div>
          <div className="form-group">
            <label
              style={{
                fontSize: 25
              }}
            >
              Product Size
            </label>
            <select
              type="size"
              name="size"
              className="form-control"
              onChange={this.onChange}
              value={this.state.size}
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className="form-group">
            <label
              style={{
                fontSize: 25
              }}
            >
              Description
            </label>
            <textarea
              name="desc"
              className="form-control"
              rows={3}
              defaultValue={""}
              onChange={this.onChange}
              value={this.state.desc}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditProduct;
