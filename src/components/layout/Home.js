import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userProduct } from "../../actions/productAction";
import { deleteuserProduct } from "../../actions/authAction";

class Home extends Component {
  componentDidMount() {
    this.props.userProduct();
  }

  onDeleteClick(id) {
    // console.log(id);
    this.props.deleteuserProduct(id, this.props.history);
  }
  render() {
    const { userProduct } = this.props.heavyproducts;

    let yasir;

    console.log(userProduct);

    if (userProduct === null || userProduct === undefined) {
      yasir = "loading";
    } else {
      if (userProduct.length > 0) {
        yasir = userProduct.map(userProduct => (
          <tr>
            <td
              style={{
                fontSize: 15,
                width: 500
              }}
            >
              {userProduct.name}
            </td>
            <td
              style={{
                fontSize: 15,
                width: 500
              }}
            >
              {userProduct.date.split("T")[0]}
            </td>
            <td
              style={{
                fontSize: 15,
                width: 500
              }}
            >
              ${userProduct.price}
            </td>
            <td
              style={{
                fontSize: 15,
                width: 500
              }}
            >
              {userProduct.color}
            </td>

            <td
              style={{
                fontSize: 15,
                width: 10
              }}
            >
              {userProduct.size}
            </td>
            <td
              style={{
                fontSize: 15,
                width: 10
              }}
            >
              {userProduct.desc}
            </td>
            <td>
              <Link
                to={{
                  pathname: "/editproduct",
                  state: { editProduct: userProduct }
                }}
              >
                <i
                  className="far fa-edit"
                  style={{
                    margin: 10,
                    color: "orange"
                  }}
                />
              </Link>

              <i
                onClick={this.onDeleteClick.bind(this, userProduct._id)}
                className="fa fa-trash"
                aria-hidden="true"
                style={{
                  color: "red"
                }}
              />
            </td>
          </tr>
        ));
      }
    }
    return (
      <div>
        <div
          className="container"
          style={{
            marginTop: 50
          }}
        >
          <button type="submit" className="btn btn-dark mt-5 ml-auto">
            <Link
              to="/addproduct"
              style={{
                textDecoration: "none",
                color: "white"
                // marginTop: 50
              }}
            >
              Add New                 
            </Link>
          </button>

          <h1 className="heading font-weight-bold mt-3">Products</h1>
          <table className="table">
            <thead className="thead-dark">
              <tr
                style={{
                  height: 50
                }}
              >
                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Name
                </th>
                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Date
                </th>
                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Price
                </th>

                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Color
                </th>
                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Size
                </th>
                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Description
                </th>
                <th
                  scope="col"
                  style={{
                    fontSize: 15
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{yasir}</tbody>
          </table>
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  heavyproducts: state.product
});

export default connect(
  mapStateToProps,
  { userProduct, deleteuserProduct }
)(withRouter(Home));
