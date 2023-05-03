import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Footer() {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    axios.get("/products/cat").then((res) => {
      setAllCategories(res.data);
    });
    console.log("here !! ");
  }, []);

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row g-4 py-4'>
          <div className='col-12 col-md-12 col-lg-4'>
            <h6 className='mb-4'>Categories</h6>
            <div className='row'>
              <div className='col-4'>
              <div class="nav-column">
                <ul className='nav flex-column'>
                {allCategories?.map((category, index) => {
                return (
                  <li className='nav-item '  key={index}>
                    <Link
                                  to={`/shopByCategory/${category._id}`}
                                  reloadDocument={true}
                                >
                    <a   className='nav-link'>
                    {category.label}
                    </a>
                    </Link>
                  </li>
                  
                  );
                })}
                </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-12 col-lg-8'>
            <div className='row g-4'>
              
            <div className='col-6 col-sm-6 col-md-3'>
                <h6 className='mb-4'>Menu</h6>
                <ul className='nav flex-column'>
                <Link to='/home'>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Home
                    </a>
                  </li>
                  </Link>
                  <Link to='/ordersList'>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      My orders
                    </a>
                  </li>
                  </Link>
                  <Link to='/settings'>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Settings
                    </a>
                  </li>
                  </Link>
                </ul>
              </div>
              <div className='col-6 col-sm-6 col-md-3'>
                <h6 className='mb-4'>Get to know us</h6>

                <ul className='nav flex-column'>
                  <li className='nav-item mb-2'>
                    <a  className='nav-link'>
                      Company
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      About
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a href='#1' className='nav-link'>
                      Blog
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
              <div className='col-6 col-sm-6 col-md-3'>
                <h6 className='mb-4'>For Consumers</h6>
                <ul className='nav flex-column'>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Payments
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Product Returns
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      FAQ
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a href='pages/shop-checkout.html' className='nav-link'>
                      Shop Checkout
                    </a>
                  </li>
                </ul>
              </div>
              <div className='col-6 col-sm-6 col-md-3'>
                <h6 className='mb-4'>EcoWaste programs</h6>
                <ul className='nav flex-column'>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      EcoWaste programs
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Gift Cards
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      Promos & Coupons
                    </a>
                  </li>
                  <li className='nav-item mb-2'>
                    <a   className='nav-link'>
                      EcoWaste Ads
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='border-top '>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <span className='small text-muted'>
                Copyright {new Date().getFullYear()} © EcoWaste . All rights
                reserved. Powered by{" "}
                <a href='https://codescandy.com/'>Dev'Up</a>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
