import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";

const Users = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  //search
  const [searchQuery, setSearchQuery] = useState("");
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
    axios.get("/api/auth/getAllUsers").then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  const makeTechnical = (id) => {
    axios
      .post("/api/auth/maketechnical", { userId: id })
      .then((res) => {
        notify("user become technical", toast, "info");
      })
      .catch((err) => console.log(err));
  };

  const makeManager = (id) => {
    console.log(id);
    axios
      .post("/api/auth/makemanager", { userId: id })
      .then((res) => {
        notify("user become manager", toast, "info");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ToastContainer />

      <main className="main-content-wrapper">
        <div className="container">
          <div className="row mb-8">
            <div className="col-md-12">
              <div className="d-md-flex justify-content-between align-items-center">
                <div>
                  <h2>Customers</h2>
                  {/* breacrumb */}
                  <nav aria-label="breadcrumb"></nav>
                </div>
                {/*   <div>
                  <a href='#!' className='btn btn-primary'>
                    Add New Customer
                  </a>
                </div>
                */}
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-xl-12 col-12 mb-5">
              <div className="card h-100 card-lg">
                <div className="p-6">
                  <div className="row justify-content-between">
                    <div className="col-md-4 col-12">
                      <form className="d-flex" role="search">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Customers"
                          aria-label="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0 ">
                  <div className="table-responsive">
                    <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                      <thead className="bg-light">
                        <tr>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Verified</th>
                          <th>Phone</th>
                          <th>Change role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers
                          ?.filter((user) =>
                            Object.values(user)
                              .join(" ")
                              .toLowerCase()
                              .includes(searchQuery)
                          )
                          .slice(startIndex, endIndex)
                          .map((user, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={`http://localhost:5001/uploads/${user?.image}`}
                                      alt=""
                                      className="avatar avatar-xs rounded-circle"
                                    />
                                    <div className="ms-2">
                                      <a href="#" className="text-inherit">
                                        {user.username}
                                      </a>
                                    </div>
                                  </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                  {user?.verified ? "Verified" : "Not Verified"}
                                </td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                  <div className="dropdown">
                                    <a
                                      href="#"
                                      className="text-reset"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="feather-icon icon-more-vertical fs-5" />
                                    </a>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <span
                                          className="dropdown-item"
                                          onClick={() =>
                                            makeTechnical(user._id)
                                          }
                                        >
                                          Technical
                                        </span>
                                      </li>
                                      <li>
                                        <span
                                          className="dropdown-item"
                                          onClick={() => makeManager(user._id)}
                                        >
                                          Manager
                                        </span>
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
                                Showing{" "}
                                {Math.min(itemsPerPage, allUsers.length)} of{" "}
                                {allUsers.length} products
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
                                          allUsers.length / itemsPerPage
                                        ),
                                      },
                                      (_, i) => (
                                        <li
                                          key={i}
                                          className={`page-item ${
                                            i + 1 === currentPage
                                              ? "active"
                                              : ""
                                          }`}
                                          onClick={() => setCurrentPage(i + 1)}
                                        >
                                          <span className="page-link">
                                            {i + 1}
                                          </span>
                                        </li>
                                      )
                                    )}
                                    {endIndex < allUsers.length && (
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
                                    {endIndex >= allUsers.length && (
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
    </>
  );
};
export default Users;
