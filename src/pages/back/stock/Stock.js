import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function Stock() {
  const [stock, setStock] = useState({ quantity: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Action");
  const [stockHistories, setStockHistories] = useState([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  function handleItemsPerPageChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const { id } = useParams();

  function handleSelectChange(event) {
    setSelectedOption(event.target.value);

    const fetchStockHistories = async (action) => {
      const response = await axios.get(
        `/products/prod/stockHistories/${id}/remove`
      );
      setStockHistories(response.data);
      console.log(response.data);
    };

    if (event.target.value === "Add") {
      fetchStockHistories();
      console.log("edddd");
    } else if (event.target.value === "Remove") {
      fetchStockHistories();
    }
  }
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchStockHistories = async () => {
      const response = await axios.get(`/products/prod/stockHistories/${id}`);
      setStockHistories(response.data);
    };
    fetchStockHistories();
  }, [() => stock]);

  const addToStock = async () => {
    try {
      const response = await axios.post(
        `/products/prod/addToStock/${id}`,
        stock
      );
      console.log(response.data); // Assuming that the server returns some data upon successful addition to stock
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const handleChangeQuantity = (e) => {
    setStock({ quantity: e.target.value });
  };
  const removeFromStock = async () => {
    try {
      const response = await axios.post(
        `/products/prod/removeFromStock/${id}`,
        stock
      );
      console.log(response.data); // Assuming that the server returns some data upon successful addition to stock
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-8">
          <div className="col-md-12">
            {/* page header */}
            <div className="d-md-flex justify-content-between align-items-center">
              <div>
                <h2>Products</h2>
                {/* breacrumb */}
                <nav aria-label="breadcrumb"></nav>
              </div>
            </div>
          </div>
        </div>
        {/* row */}
        <div className="row ">
          <div className="col-xl-12 col-12 mb-5">
            {/* card */}
            <div className="card h-100 card-lg">
              <div className="px-6 py-6 ">
                <div className="row justify-content-between">
                  {/* form */}
                  <div className="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                    <a className="btn btn-primary" onClick={handleClick}>
                      Update the stock
                    </a>
                    {isOpen && (
                      <div>
                        <div>
                          <br />

                          <input
                            className="form-control"
                            type="number"
                            placeholder="Enter the qunatity"
                            aria-label="Search"
                            onChange={handleChangeQuantity}
                            min={0}
                          />
                          <br />
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                          <button
                            type="button"
                            aria-controls="example-collapse-text"
                            className="btn btn-secondary m-1"
                            onClick={addToStock}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            aria-controls="example-collapse-text"
                            onClick={removeFromStock}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* select option */}
                  <div className="col-lg-2 col-md-4 col-12">
                    <select
                      className="form-select"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <option defaultValue="Action">Action</option>
                      <option>Add</option>
                      <option>Remove</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* card body */}
              <div className="card-body p-0">
                {/* table */}
                <div className="table-responsive">
                  <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                    <thead className="bg-light">
                      <tr>
                        <th>Actual quantity</th>
                        <th>Action</th>
                        <th>Added quantity</th>
                        <th>Removed quantity</th>
                        <th>Create at</th>

                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {stockHistories
                        .slice(startIndex, endIndex)
                        .map((stockHistories) => (
                          <tr key={stockHistories._id}>
                            <td>{stockHistories.newValue}</td>
                            <td>
                              {stockHistories.action == "add" ? (
                                <span className="badge bg-light-primary text-dark-primary">
                                  {stockHistories.action}
                                </span>
                              ) : (
                                <span className="badge bg-light-danger text-dark-danger">
                                  {stockHistories.action}
                                </span>
                              )}
                            </td>
                            {stockHistories.action == "add" ? (
                              <td>{stockHistories.quantity}</td>
                            ) : (
                              <td>-</td>
                            )}
                            {stockHistories.action == "remove" ? (
                              <td>{stockHistories.quantity}</td>
                            ) : (
                              <td>-</td>
                            )}
                            <td>
                              {new Date(
                                stockHistories.createdAt
                              ).toLocaleString("en-GB", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="10">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              Showing{" "}
                              {Math.min(itemsPerPage, stockHistories.length)} of{" "}
                              {stockHistories.length} products
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
                                        stockHistories.length / itemsPerPage
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
                                  {endIndex < stockHistories.length && (
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
                                  {endIndex >= stockHistories.length && (
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
}
export default Stock;
