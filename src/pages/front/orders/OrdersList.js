import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import Payment from "./Payment";
import PaymentModel from "./modal/PaymentModel";

const OrdersList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [ShowPaymentModal, setShowPaymentModal] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    axios
      .post("http://localhost:5000/orders/getCustomerOrders", {
        customerId: currentUser.id,
      })
      .then(function (response) {
        console.log(response.data.orders);
        setAllOrders(response.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentUser.id]);

  const handleShowPayment = () => {
    setShowPaymentModal(true);
  };
  const handleConfirmDelete = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="container mt-8">
      <PaymentModel
        message="Are you sure you want to delete this item?"
        show={ShowPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        onConfirm={handleConfirmDelete}
      />
      <div className="table-responsive-xxl border-0">
        {/* Table */}
        <table className="table mb-0 text-nowrap table-centered ">
          {/* Table Head */}
          <thead className="bg-light">
            <tr>
              <th>&nbsp;</th>
              
              <th>Order</th>
              <th>Date</th>

              <th>Status</th>
              <th>Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {allOrders?.slice(startIndex, endIndex).map((order, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle border-top-0 w-0">
                    <a href="#">
                      <i
                        class="bi bi-cart-check"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </a>
                  </td>

                  <td className="align-middle border-top-0">
                    <a href="#" className="text-inherit">
                      #{order._id}
                    </a>
                  </td>
                  <td className="align-middle border-top-0">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>

                  <td className="align-middle border-top-0">
                    <span className="badge bg-warning"> {order.status}</span>
                  </td>
                  <td className="align-middle border-top-0">
                    {order.totalAmount} DT
                  </td>
                  <td className="text-muted align-middle border-top-0">
                    <Link to={`/OrderDetail/${order._id}`}>
                      <a
                        href="#"
                        className="text-inherit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                      >
                        <i className="feather-icon icon-eye" />
                      </a>
                    </Link>
                    <span
                      style={{ marginLeft: "20px", marginRight: "-20px" }}
                      className="dropdown btn btn-primary btn-sm"
                    >
                      <i
                        style={{ marginRight: "6px" }}
                        class="bi bi-credit-card-fill"
                      ></i>{" "}
                      <a
                        onClick={() => handleShowPayment()}
                      >
                        Pay
                      </a>
                      {/*<div
                        style={{
                          border: " 1px solid rgb(76, 196, 36)",
                          borderRadius: "10px",
                        }}
                        className="dropdown-menu dropdownForcedAttributes"
                      >
                        <Payment></Payment>
                      </div>*/}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
