import "../styles/footer.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [sendEmail, setSendEmail] = useState(false);

  const handleSend = (data) => {
    setSendEmail(true);
    setTimeout(() => {
      setSendEmail(false);
      Swal.fire({
        icon: "success",
        title: "We are processing your request",
        text: "Thanks for subscribing to our newsletter",
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
    }, 2000);
  };

  return (
    <>
      <footer className="mt-auto" id="footer">
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col-md-4 text-center text-md-start">
              <h3>INFORMATION</h3>
              <ul className="list-unstyled">
                <li className="py-1">
                  <Link to={"/cities"}>Cities</Link>
                </li>
                <li className="py-1">
                  <Link to={"/about"}>About</Link>
                </li>
                <li className="py-1">
                  <Link to={""}>Privacy policies</Link>
                </li>
                <li className="py-1">
                  <Link to={""}>Terms and Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-center text-md-start">
              <h3>MY ACCOUNT</h3>
              <ul className="list-unstyled">
                <li className="py-1">
                  <Link to={"/login"}>Login</Link>
                </li>
                <li className="py-1">
                  <Link to={"/register"}>Register</Link>
                </li>
                <li className="py-1">
                  <Link to={""}>refunds</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-center text-md-start">
              <h3 className="text-decoration-none">NEWSLETTER</h3>
              <p className="text-center text-md-start">
                Subscribe to our newsletters now and stay up to date with
                exclusive offers.
              </p>
              <form onSubmit={handleSubmit(handleSend)}>
                <div>
                  <input
                    type="email"
                    className="form-control w-100"
                    placeholder="Enter email"
                    id="user_email"
                    required
                    {...register("user_email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                      minLength: 5,
                      maxLength: 100,
                    })}
                  />
                  <div className="text-danger mt-2 texto_email">
                    {errors.email?.message}
                  </div>
                </div>
                <button className="w-100" type="submit">
                  {sendEmail ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
