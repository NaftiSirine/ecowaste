import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = (props) => {
  const navigate = useNavigate();

  const { productId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [name, setName] = useState("");

  const [product, setProduct] = useState({});

  const [ratingValue, setRatingValue] = useState(0);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [review, setReview] = useState({});
  const [reviews, setReviews] = useState([]);

  const [reviewMessage, setReviewMessage] = useState("");
  const [headline, setHeadline] = useState("");
  console.log(currentUser);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };
  console.log(product);
  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:5000/products/prod/${id}`)
      .then(function (response) {
        console.log(response.data);
        setProduct(response.data);
        //setName(response.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addReview = async () => {
    setReview({
      username: currentUser.username,
      image: currentUser.image,
      rating: ratingValue,
      review: reviewMessage,
      headline: headline,
    });
    console.log(review);
    console.log("ddddddddddddddddddddddddddddd");
    try {
      const response = await axios.post(`/products/prod/addReview/${id}`, {
        username: currentUser.username,
        image: currentUser.image,
        rating: ratingValue,
        review: reviewMessage,
        headline: headline,
      });
      console.log(response.data); // Assuming that the server returns some data upon successful addition to stock
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`/products/prod/reviews/${id}`);
      setReviews(response.data);
    };
    fetchReviews();
  }, [() => review]);

  return (
    <>
      <div>
        <div className='container'>
          <div className='modal-dialog modal-xl modal-dialog-centered'>
            <div
              className='modal-content '
              style={{ paddingTop: "150 px", marginTop: "150 px" }}
            >
              <div className='modal-body p-8'>
                <div className='position-absolute top-0 end-0 me-3 mt-3'>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  />
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    {/* img slide */}
                    <div className='product productModal' id='productModal'>
                      <div
                        className='zoom'
                        onmousemove='zoom(event)'
                        style={{
                          backgroundImage:
                            "url(../assets/images/products/product-single-img-1.jpg)",
                        }}
                      >
                        {/* img */}
                        <img
                          src='../assets/images/products/product-single-img-1.jpg'
                          alt=''
                        />
                      </div>
                    </div>
                    {/* product tools */}
                    <div className='product-tools'>
                      <div
                        className='thumbnails row g-3'
                        id='productModalThumbnails'
                      >
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                            {/* img */}
                            <img
                              src='../assets/images/products/product-single-img-1.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                            {/* img */}
                            <img
                              src='../assets/images/products/product-single-img-2.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                            {/* img */}
                            <img
                              src='../assets/images/products/product-single-img-3.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                        <div className='col-3'>
                          <div className='thumbnails-img'>
                            {/* img */}
                            <img
                              src='../assets/images/products/product-single-img-4.jpg'
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-lg-6'>
                    <div className='ps-lg-8 mt-6 mt-lg-0'>
                      <a href='#!' className='mb-4 d-block'>
                        {" "}
                        {product.price}{" "}
                      </a>
                      <h2 className='mb-1 h1'>{product.name} </h2>
                      <div className='mb-4'>
                        <small className='text-warning'>
                          <i className='bi bi-star-fill' />
                          <i className='bi bi-star-fill' />
                          <i className='bi bi-star-fill' />
                          <i className='bi bi-star-fill' />
                          <i className='bi bi-star-half' />
                        </small>
                        <a href='#' className='ms-2'>
                          (30 reviews)
                        </a>
                      </div>
                      <div className='fs-4'>
                        <span className='fw-bold text-dark'>
                          {product.reduction} DT{" "}
                        </span>
                        <span className='text-decoration-line-through text-muted'>
                          {" "}
                          {product.price} DT
                        </span>
                        <span>
                          <small className='fs-6 ms-2 text-danger'>
                            26% Off
                          </small>
                        </span>
                      </div>
                      <hr className='my-6' />
                      {/*<div className="mb-4">
                            <button type="button" className="btn btn-outline-secondary">
                            250g
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                            500g
                            </button>
                            <button type="button" className="btn btn-outline-secondary">
                            1kg
                            </button>
                         </div>*/}
                      <div>
                        {/* quantity */}
                        <div className='input-group input-spinner'>
                          <input
                            type='button'
                            value='-'
                            className='button-minus btn btn-sm'
                            data-field='quantity'
                            onClick={handleDecrement}
                          />
                          <input
                            type='number'
                            step='1'
                            max='10'
                            value={quantity}
                            name='quantity'
                            className='quantity-field form-control-sm form-input'
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          />
                          <input
                            type='button'
                            value='+'
                            className='button-plus btn btn-sm'
                            data-field='quantity'
                            onClick={handleIncrement}
                          />
                        </div>
                      </div>
                      <div className='mt-3 row justify-content-start g-2 align-items-center'>
                        <div className='col-lg-4 col-md-5 col-6 d-grid'>
                          {/* button */}
                          {/* btn */}
                          <button type='button' className='btn btn-primary'>
                            <i className='feather-icon icon-shopping-bag me-2' />
                            Add to cart
                          </button>
                        </div>
                        <div className='col-md-4 col-5'>
                          {/* btn */}
                          <a
                            className='btn btn-light'
                            href='#'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            aria-label='Compare'
                          >
                            <i className='bi bi-arrow-left-right' />
                          </a>
                          <a
                            className='btn btn-light'
                            href='#!'
                            data-bs-toggle='tooltip'
                            data-bs-html='true'
                            aria-label='Wishlist'
                          >
                            <i className='feather-icon icon-heart' />
                          </a>
                        </div>
                      </div>
                      <hr className='my-6' />
                      <div>
                        <table className='table table-borderless'>
                          <tbody>
                            <tr>
                              <td>Product Code:</td>
                              <td>#{product.code} </td>
                            </tr>
                            <tr>
                              <td>Availability:</td>
                              <td>
                                {product?.inStock ? "In Stock" : "Out of Stock"}
                              </td>
                            </tr>
                            <tr>
                              <td>Create at:</td>
                              <td>
                                {new Date(product.addedDate).toLocaleString()}
                              </td>
                            </tr>
                            <tr>
                              <td>Description:</td>
                              <td>{product.description}.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='mt-lg-14 mt-8 '>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <ul
                className='nav nav-pills nav-lb-tab'
                id='myTab'
                role='tablist'
              >
                {/* nav item */}
                <li className='nav-item' role='presentation'>
                  {/* btn */}{" "}
                  <button
                    className='nav-link'
                    id='reviews-tab'
                    data-bs-toggle='tab'
                    data-bs-target='#reviews-tab-pane'
                    type='button'
                    role='tab'
                    aria-controls='reviews-tab-pane'
                    aria-selected='false'
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              {/* tab content */}
              <div className='tab-content' id='myTabContent'>
                {/* tab pane */}
                <div
                  className='tab-pane fade'
                  id='reviews-tab-pane'
                  role='tabpanel'
                  aria-labelledby='reviews-tab'
                  tabIndex={0}
                >
                  <div className='my-8'>
                    {/* row */}
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='me-lg-12 mb-6 mb-md-0'>
                          <div className='mb-5'>
                            {/* title */}
                            <h4 className='mb-3'>Customer reviews</h4>
                            <span>
                              {/* rating */}{" "}
                              <small className='text-warning'>
                                <i className='bi bi-star-fill' />
                                <i className='bi bi-star-fill' />
                                <i className='bi bi-star-fill' />
                                <i className='bi bi-star-fill' />
                                <i className='bi bi-star-half' />
                              </small>
                              <span className='ms-3'>4.1 out of 5</span>
                              <small className='ms-3'>
                                11,130 global ratings
                              </small>
                            </span>
                          </div>
                          <div className='mb-8'>
                            {/* progress */}
                            <div className='d-flex align-items-center mb-2'>
                              <div className='text-nowrap me-3 text-muted'>
                                <span className='d-inline-block align-middle text-muted'>
                                  5
                                </span>
                                <i className='bi bi-star-fill ms-1 small text-warning' />
                              </div>
                              <div className='w-100'>
                                <div
                                  className='progress'
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className='progress-bar bg-warning'
                                    role='progressbar'
                                    style={{ width: "60%" }}
                                    aria-valuenow={60}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                              <span className='text-muted ms-3'>53%</span>
                            </div>
                            {/* progress */}
                            <div className='d-flex align-items-center mb-2'>
                              <div className='text-nowrap me-3 text-muted'>
                                <span className='d-inline-block align-middle text-muted'>
                                  4
                                </span>
                                <i className='bi bi-star-fill ms-1 small text-warning' />
                              </div>
                              <div className='w-100'>
                                <div
                                  className='progress'
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className='progress-bar bg-warning'
                                    role='progressbar'
                                    style={{ width: "50%" }}
                                    aria-valuenow={50}
                                    aria-valuemin={0}
                                    aria-valuemax={50}
                                  />
                                </div>
                              </div>
                              <span className='text-muted ms-3'>22%</span>
                            </div>
                            {/* progress */}
                            <div className='d-flex align-items-center mb-2'>
                              <div className='text-nowrap me-3 text-muted'>
                                <span className='d-inline-block align-middle text-muted'>
                                  3
                                </span>
                                <i className='bi bi-star-fill ms-1 small text-warning' />
                              </div>
                              <div className='w-100'>
                                <div
                                  className='progress'
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className='progress-bar bg-warning'
                                    role='progressbar'
                                    style={{ width: "35%" }}
                                    aria-valuenow={35}
                                    aria-valuemin={0}
                                    aria-valuemax={35}
                                  />
                                </div>
                              </div>
                              <span className='text-muted ms-3'>14%</span>
                            </div>
                            {/* progress */}
                            <div className='d-flex align-items-center mb-2'>
                              <div className='text-nowrap me-3 text-muted'>
                                <span className='d-inline-block align-middle text-muted'>
                                  2
                                </span>
                                <i className='bi bi-star-fill ms-1 small text-warning' />
                              </div>
                              <div className='w-100'>
                                <div
                                  className='progress'
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className='progress-bar bg-warning'
                                    role='progressbar'
                                    style={{ width: "22%" }}
                                    aria-valuenow={22}
                                    aria-valuemin={0}
                                    aria-valuemax={22}
                                  />
                                </div>
                              </div>
                              <span className='text-muted ms-3'>5%</span>
                            </div>
                            {/* progress */}
                            <div className='d-flex align-items-center mb-2'>
                              <div className='text-nowrap me-3 text-muted'>
                                <span className='d-inline-block align-middle text-muted'>
                                  1
                                </span>
                                <i className='bi bi-star-fill ms-1 small text-warning' />
                              </div>
                              <div className='w-100'>
                                <div
                                  className='progress'
                                  style={{ height: "6px" }}
                                >
                                  <div
                                    className='progress-bar bg-warning'
                                    role='progressbar'
                                    style={{ width: "14%" }}
                                    aria-valuenow={14}
                                    aria-valuemin={0}
                                    aria-valuemax={14}
                                  />
                                </div>
                              </div>
                              <span className='text-muted ms-3'>7%</span>
                            </div>
                          </div>
                          <div className='d-grid'>
                            <h4>Review this product</h4>
                            <p className='mb-0'>
                              Share your thoughts with other customers.
                            </p>
                            <a
                              href='#'
                              className='btn btn-outline-gray-400 mt-4 text-muted'
                            >
                              Write the Review
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* col */}
                      <div className='col-md-8'>
                        <div className='mb-10'>
                          <div className='d-flex justify-content-between align-items-center mb-8'>
                            <div>
                              {/* heading */}
                              <h4>Reviews</h4>
                            </div>
                            <div>
                              <select className='form-select'>
                                <option selected>Top Review</option>
                                <option value={1}>One</option>
                                <option value={2}>Two</option>
                                <option value={3}>Three</option>
                              </select>
                            </div>
                          </div>
                          {reviews.map((reviews) => (
                            <div className='d-flex border-bottom pb-6 mb-6 pt-4'>
                              {/* img */}
                              <img
                                src={`http://localhost:5001/uploads/${reviews?.image}`}
                                alt=''
                                className='rounded-circle avatar-lg'
                              />
                              <div className='ms-5'>
                                <h6 className='mb-1'>{reviews.username}</h6>
                                {/* content */}
                                <p className='small'>
                                  {" "}
                                  <span className='text-muted'>
                                    {new Date(reviews.createdAt).toLocaleString(
                                      "en-GB",
                                      {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                      }
                                    )}
                                  </span>
                                </p>
                                {/* rating */}
                                <div className=' mb-2'>
                                  {[...Array(Math.floor(reviews.rating))].map(
                                    (_, index) => (
                                      <i
                                        key={index}
                                        className='bi bi-star-fill text-warning'
                                      ></i>
                                    )
                                  )}
                                  {[
                                    ...Array(5 - Math.floor(reviews.rating)),
                                  ].map((_, index) => (
                                    <i
                                      key={Math.floor(reviews.rating) + index}
                                      className='bi bi-star text-warning'
                                    ></i>
                                  ))}

                                  <span className='ms-3 text-dark fw-bold'>
                                    {reviews.headline}
                                  </span>
                                </div>
                                <p>
                                  Product quality is good. But, weight seemed
                                  less than 1kg. Since it is being sent in open
                                  package, there is a possibility of pilferage
                                  in between. FreshCart sends the veggies and
                                  fruits through sealed plastic covers and
                                  Barcode on the weight etc. .
                                </p>
                              </div>
                            </div>
                          ))}
                          <div>
                            <a
                              href='#'
                              className='btn btn-outline-gray-400 text-muted'
                            >
                              Read More Reviews
                            </a>
                          </div>
                        </div>
                        <div>
                          {/* rating */}
                          <h3 className='mb-5'>Create Review</h3>
                          <div className='border-bottom py-4 mb-4'>
                            <h4 className='mb-3'>Overall rating</h4>
                            <div id='rater' />
                            <Rating
                              onClick={handleRating}
                              ratingValue={ratingValue}
                              showTooltip
                              fillColorArray={[
                                "#f17a45",
                                "#f19745",
                                "#f1a545",
                                "#f1b345",
                                "#f1d045",
                              ]}
                              tooltipArray={[
                                "Terrible",
                                "Bad",
                                "Average",
                                "Great",
                                "Prefect",
                              ]}
                            />
                          </div>

                          {/* form control */}
                          <div className='border-bottom py-4 mb-4'>
                            <h5>Add a headline</h5>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='What’s most important to know'
                              onChange={(e) => setHeadline(e.target.value)}
                            />
                          </div>

                          <div className=' py-4 mb-4'>
                            {/* heading */}
                            <h5>Add a written review</h5>
                            <textarea
                              className='form-control'
                              rows={3}
                              placeholder='What did you like or dislike? What did you use this product for?'
                              onChange={(e) => setReviewMessage(e.target.value)}
                            />
                          </div>
                          {/* button */}
                          <div className='d-flex justify-content-end'>
                            <a
                              type='button'
                              href='#'
                              className='btn btn-primary'
                              onClick={addReview}
                            >
                              Submit Review
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* tab pane */}
                <div
                  className='tab-pane fade'
                  id='sellerInfo-tab-pane'
                  role='tabpanel'
                  aria-labelledby='sellerInfo-tab'
                  tabIndex={0}
                >
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
