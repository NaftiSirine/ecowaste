import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../../actions/auth";
import { notify } from "../../../utils/HelperFunction";
import { toast, ToastContainer } from "react-toastify";

const Wishlist = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [allProductsForWishlist, setAllProductsForWishlist] = useState([]);
  const [call, setCall] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5001/getAllProductsFromWishlist/${currentUser?.email}`
      )
      .then((res) => {
        setAllProductsForWishlist(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [call]);
  const removeProdcutFromWishlist = (removeProdcutFromWishlist) => {
    console.log(removeProdcutFromWishlist);
    const req = {
      email: currentUser?.email,
      id: removeProdcutFromWishlist._id,
    };
    axios
      .put("http://localhost:5000/api/removeProdcutFromWishlist/", req)
      .then((res) => {
        setCall(!call);
        console.log(removeProdcutFromWishlist.price);

        dispatch(refreshUser(currentUser?.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addProdcutToCart = (prod) => {
    const req = {
      email: currentUser?.email,
      products: { ...prod, quantity: 1 },
    };
    axios
      .put("http://localhost:5000/api/addProdcutToCart/", req)
      .then((res) => {
        notify("Product was added to the cart!", toast, "success");
        setCall(!call);

        dispatch(refreshUser(currentUser?.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className='mt-8 mb-14'>
      <ToastContainer />
      <div className='container'>
        {/* row */}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='mb-8'>
              {/* heading */}
              <h1 className='mb-1'>My Wishlist</h1>
              <p>
                There are {allProductsForWishlist?.length} products in this
                wishlist.
              </p>
            </div>
            <div>
              {/* table */}
              <div className='table-responsive'>
                <table className='table text-nowrap table-with-checkbox'>
                  <thead className='table-light'>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProductsForWishlist.map((item) => {
                      return (
                        <tr>
                          <td className='align-middle'>
                            <a href='#'>
                              <img
                                src={`http://localhost:5002/productUploads/${item?.image}`}
                                className='icon-shape icon-xxl'
                                alt=''
                              />
                            </a>
                          </td>
                          <td className='align-middle'>
                            <div>
                              <h5 className='fs-6 mb-0'>
                                <a href='#' className='text-inherit'>
                                  {item.name}
                                </a>
                              </h5>
                            </div>
                          </td>
                          <td className='align-middle'> {item.price} DT</td>
                          <td className='align-middle'>
                            <span className='badge bg-success'>
                              {" "}
                              {item.inStock ? "In stock" : "Out of stock"}
                            </span>
                          </td>
                          <td className='align-middle'>
                            <div
                              className='btn btn-primary btn-sm'
                              onClick={() => addProdcutToCart(item)}
                            >
                              Add to Cart
                            </div>
                          </td>
                          <td className='align-middle '>
                            <span
                              className='text-muted'
                              data-bs-toggle='tooltip'
                              data-bs-placement='top'
                              aria-label='Delete'
                              data-bs-original-title='Delete'
                              style={{ cursor: "pointer" }}
                              onClick={() => removeProdcutFromWishlist(item)}
                            >
                              <i className='feather-icon icon-trash-2'></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
