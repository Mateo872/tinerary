import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/login.css";
import {
  createUser,
  editUser,
  getUser,
  getUsers,
  login,
} from "../helpers/queries";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Login = () => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userDB, setUserDB] = useState(null);
  const [edit, setEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (user && user._id) {
      getUser(user._id).then((res) => {
        setUserDB(res);
        setFlag(true);
      });
    }
  }, [userDB]);

  useEffect(() => {
    if (location.pathname === "/user/login" && flag && !edit) {
      setValue("email", userDB?.email);
      setValue("password", userDB?.password);
      setValue("name", userDB?.name);
      setValue("image", userDB?.image);
      setEdit(true);
    } else if (location.pathname === "/user/register" && flag) {
      navigation("/cities");
    }
  }, [userDB]);

  const onSubmit = async (data) => {
    if (location.pathname === "/user/login" && user && edit) {
      setEdit(true);
      const userUpdated = {
        email: getValues("email"),
        password: getValues("password"),
        name: getValues("name"),
        image: getValues("image"),
        favorites: userDB?.favorites,
        role: userDB?.role,
      };
      Swal.fire("User updated!", "The user has been updated.", "success").then(
        async (res) => {
          if (res.isConfirmed) {
            await editUser(userUpdated, userDB?._id);
            navigation("/cities");
            sessionStorage.setItem("user", JSON.stringify(userDB));
            setUserDB(userDB);
          }
        }
      );
      reset();
    } else if (
      (location.pathname === "/user/login" && !flag) ||
      (userDB && !edit)
    ) {
      login(data).then((response) => {
        getUser(response._id).then((res) => {
          if (res.password !== data.password) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email or password incorrect!",
            });
          } else if (response.status === 200) {
            if (response.role === "admin") {
              Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "You have successfully logged in as an administrator",
              }).then((res) => {
                if (res.isConfirmed) {
                  window.location.href = "/admin";
                }
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Welcome!",
                text: "You have successfully logged in",
              }).then((res) => {
                if (res.isConfirmed) {
                  window.location.href = "/";
                  sessionStorage.setItem("user", JSON.stringify(response));
                }
              });
            }
          }
        });
      });
    } else if (
      location.pathname === "/user/register" &&
      userDB === null &&
      !edit
    ) {
      const newUser = {
        name: data.name,
        email: data.email,
        image: data.image,
        password: data.password,
        role: "user",
        favorites: [],
      };
      const users = await getUsers();

      const userExist = users.find((user) => user.email === newUser.email);

      if (userExist) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The email is already registered!",
        });
      } else {
        createUser(newUser).then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Welcome!",
              text: `The user ${newUser.name} has been successfully registered`,
            }).then((res) => {
              if (res.isConfirmed) {
                Swal.fire({
                  icon: "info",
                  title: "Login",
                  text: "You must log in to continue",
                }).then((res) => {
                  if (res.isConfirmed) {
                    navigation("/user/login");
                  }
                });
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      }
    }
  };

  return (
    <section className="container container_login d-flex flex-column justify-content-center ">
      <article className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4 text-center">
            {location.pathname === "/user/login" && !edit
              ? "Login"
              : edit
              ? `Hi, ${userDB?.name}!`
              : "Register"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {edit && (
              <div
                className="container_image-edit mb-3"
                style={{
                  backgroundImage: `url(${userDB?.image})`,
                }}
              ></div>
            )}
            {location.pathname === "/user/register" && !flag ? (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  {...register("name", {
                    required: "The name is required",
                    minLength: {
                      value: 2,
                      message: "The name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 60,
                      message: "The name must be less than 60 characters",
                    },
                  })}
                />
                <div className="text-danger fw-bold">
                  {errors.name?.message}
                </div>
              </div>
            ) : (
              location.pathname === "/user/login" &&
              edit && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    id="name"
                    {...register("name", {
                      required: "The name is required",
                      minLength: {
                        value: 2,
                        message: "The name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 60,
                        message: "The name must be less than 60 characters",
                      },
                    })}
                  />
                  <div className="text-danger fw-bold">
                    {errors.name?.message}
                  </div>
                </div>
              )
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "The email is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "The email is not valid",
                  },
                })}
              />
              <div className="text-danger fw-bold">{errors.email?.message}</div>
            </div>
            {(location.pathname === "/user/login" && flag) ||
              (location.pathname === "/user/register" && (
                <div className="mb-3">
                  <label
                    htmlFor="image"
                    className="form-label"
                    placeholder="Image URL"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    placeholder="Image URL"
                    {...register("image", {
                      required: "The image is required",
                      pattern: {
                        value:
                          /^https?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                        message: "The image is not valid",
                      },
                    })}
                  />
                  <div className="text-danger fw-bold">
                    {errors.image?.message}
                  </div>
                </div>
              ))}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "The password is required",
                  minLength: {
                    value: 6,
                    message: "The password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 60,
                    message: "The password must be less than 60 characters",
                  },
                })}
              />
              <div className="text-danger fw-bold">
                {errors.password?.message}
              </div>
            </div>
            <button type="submit" className="button_login w-100">
              {location.pathname === "/user/login" && !edit
                ? "Login"
                : edit
                ? "Edit"
                : "Register"}
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
