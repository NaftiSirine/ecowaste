import "./orders.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  function handleItemsPerPageChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders/getAllOrders")
      .then(function (response) {
        console.log(response.data.orders);
        setAllOrders(response.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser.id]);
  return (
    <main className="main-content-wrapper">
      <div className="container">
        {/* row */}
        <div className="row mb-8">
          <div className="col-lg-12">
            {/* page header */}
            <div>
              <h2>Previous Orders List</h2>
              {/* breacrumb */}
              <nav aria-label="breadcrumb"></nav>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row">
          <div className="col-xl-12 col-12 mb-5">
            {/* card */}
            <div className="card h-100 card-lg">
              <div className=" p-6 ">
                <div className="row justify-content-between"></div>
              </div>
              {/* card body */}
              <div className="card-body p-0">
                {/* table responsive */}
                <div className="table-responsive">
                  <table className="table table-centered table-hover table-borderless mb-0 ">
                    <thead className="bg-light">
                      <tr>
                        <th className="column">Customer</th>
                        <th className="column disposable">Date &amp; TIme</th>
                        <th className="column disposable">Payment</th>
                        <th className="column">Status</th>
                        <th className="column disposable">Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders
                        ?.slice(startIndex, endIndex)
                        .map((order, index) => {
                          return (
                            <tr key={index}>

                              <td className="column">{currentUser.username}</td>

                              <td className="column disposable">
                                {new Date(order.orderDate).toLocaleDateString()}
                              </td>
                              <td className="column disposable">
                                {order.paymentMethod}
                              </td>
                              <td className="column">
                                <span className="badge bg-light-primary text-dark-primary">
                                  {order.status}
                                </span>
                              </td>
                              <td className="column disposable">
                                {order.totalAmount} DT
                              </td>
                              <td
                                className="column "
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  lineHeight: "3.1rem",
                                }}
                              >
                                <div className="dropdown eye-field2">
                                  <a
                                    href="#"
                                    className="text-reset"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="feather-icon icon-eye fs-5" />
                                  </a>
                                  <ul className="dropdown-menu dropdownForcedAttributes">
                                    <li className="line eye-field">
                                      <a className="dropdown-item">
                                        <span className="">Date &amp; TIme</span>
                                        {new Date(order.orderDate).toLocaleDateString()}
                                      </a>
                                    </li>
                                    <li className="line eye-field eye-field2">
                                      <a className="dropdown-item">
                                        <span className="">Payment :</span>
                                        {order.paymentMethod}
                                      </a>
                                    </li>
                                    <li className="line eye-field eye-field2" style={{borderBottom:"none"}}>
                                      <a className="dropdown-item">
                                        <span className="">Amount :</span>
                                        {order.totalAmount} DT
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <div className="dropdown">
                                  <a
                                    className="text-reset"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a className="dropdown-item">
                                        <i className="bi bi-pencil-square me-3 " />
                                        <Link
                                          to={`/dashboard/OrderDetail/${order._id}`}
                                        >
                                          Details
                                        </Link>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="10">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              Showing {Math.min(itemsPerPage, allOrders.length)}{" "}
                              of {allOrders.length} products
                            </div>
                            <div>
                              <div className="d-flex justify-content-between align-items-center">
                                <label htmlFor="items-per-page">
                                  Items per page:
                                </label>

                                <input
                                  type="number"
                                  className="form-control"
                                  id="items-per-page"
                                  value={itemsPerPage}
                                  onChange={handleItemsPerPageChange}
                                />
                              </div>
                            </div>
                            <div>
                              <nav aria-label="Page navigation">
                                <ul className="pagination">
                                  {startIndex > 1 && (
                                    <li className="page-item ">
                                      <a
                                        className="page-link "
                                        onClick={() =>
                                          setCurrentPage(currentPage - 1)
                                        }
                                      >
                                        Previous
                                      </a>
                                    </li>
                                  )}
                                  {currentPage === 1 && (
                                    <li className="page-item disabled">
                                      <a className="page-link ">Previous</a>
                                    </li>
                                  )}
                                  {Array.from(
                                    {
                                      length: Math.ceil(
                                        allOrders.length / itemsPerPage
                                      ),
                                    },
                                    (_, i) => (
                                      <li
                                        key={i}
                                        className={`page-item ${
                                          i + 1 === currentPage ? "active" : ""
                                        }`}
                                        onClick={() => setCurrentPage(i + 1)}
                                      >
                                        <span className="page-link">
                                          {i + 1}
                                        </span>
                                      </li>
                                    )
                                  )}
                                  {endIndex < allOrders.length && (
                                    <li className="page-item">
                                      <a
                                        className="page-link"
                                        onClick={() =>
                                          setCurrentPage(currentPage + 1)
                                        }
                                      >
                                        Next
                                      </a>
                                    </li>
                                  )}
                                  {endIndex >= allOrders.length && (
                                    <li className="page-item disabled">
                                      <a
                                        className="page-link"
                                        onClick={() =>
                                          setCurrentPage(currentPage + 1)
                                        }
                                      >
                                        Next
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Orders;
