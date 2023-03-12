import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Error from "../commun/errors";
import * as yup from "yup";
import axios from "axios";
const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function SignUp() {
  const handleSubmitt = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]); // add the image file to the form data
  
    // append the other form data to the form data
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("roles", ["user"]);
  
    axios
      .post("http://localhost:5000/api/auth/signup", formData)
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  
    console.log(data);
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <section className="my-lg-14 my-8">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
            {/* img */}
            <img
              src="../assets/images/svg-graphics/signup-g.svg"
              alt=""
              className="img-fluid"
            />
          </div>
          {/* col */}
          <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
            <div className="mb-lg-9 mb-5">
              <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
              <p>Welcome to FreshCart! Enter your email to get started.</p>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit((data) => handleSubmitt(data))} encType="multipart/form-data">
              <div className="row g-3">
                {/* col */}

                <div className="col-12">
                  {/* input */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    id="username"
                    autoComplete="off"
                    autoSave="off"
                    aria-label="Last name"
                    {...register("username")}
                  />
                  <Error message={errors.username?.message}></Error>
                </div>
                <div className="col-12">
                  {/* input */}
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <Error message={errors.email?.message}></Error>
                </div>
                <div className="col-12">
                  <div className="password-field position-relative">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                      className="form-control"
                      {...register("password")}
                    />
                    <Error message={errors.password?.message}></Error>
                    <span>
                      <i id="passwordToggler" className="bi bi-eye-slash" />
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  {/* input */}
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    placeholder="Upload Image"
                    {...register("image")}
                  />
                  <Error message={errors.image?.message}></Error>
                </div>
                {/* btn */}
                <div className="col-12 d-grid">
                  {" "}
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                {/* text */}
                <p>
                  <small>
                    By continuing, you agree to our{" "}
                    <a href="#!"> Terms of Service</a> &amp;{" "}
                    <a href="#!">Privacy Policy</a>
                  </small>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
