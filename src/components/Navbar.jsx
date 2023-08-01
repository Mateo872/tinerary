import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { getUser } from "../helpers/queries";
import Swal from "sweetalert2";

const Header = () => {
  const menu_overlay = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const [scroll, setScroll] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userDB, setUserDB] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      setUserDB(user);
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 1) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    if (user) {
      getUser(user._id).then((res) => {
        setUserDB(res);
      });
    }
  }, [userDB]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const menuVisible = () => {
    menu_overlay.current.classList.add("menu_overlay-visible");
    menuRef.current.classList.add("ul-visible");
  };

  const menuHidden = (e) => {
    if (
      e.target.classList.contains("menu_overlay") ||
      e.target.classList.contains("menu_link")
    ) {
      menu_overlay.current.classList.remove("menu_overlay-visible");
      menuRef.current.classList.remove("ul-visible");
    }
  };

  const logout = () => {
    Swal.fire({
      html: `
        <div class="image_container-swal mt-3">
        <a href="/user/login" class="container_edit position-absolute d-flex justify-content-center align-items-center">
          <i class="bi bi-pencil"></i>
        </a>
        <img class="w-100 h-100" src="${userDB?.image}" alt="${userDB?.name}" />
        </div>
        <h2 class="mt-3">${userDB?.name}</h2>
        <p class="mb-0">¿Do you want to log out?</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Session closed",
          text: "You have successfully logged out",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          sessionStorage.removeItem("user");
          setUserDB(null);
          navigation("/");
        });
      }
    });
  };

  return (
    <header>
      <nav
        className="d-flex align-items-center justify-content-between w-100"
        style={{
          backgroundColor:
            !scroll && location.pathname === "/" ? "transparent" : "#232229",
        }}
      >
        <Link to={"/"} className="nav_brand">
          MY
          <span
            style={{
              color:
                scroll || (!scroll && location.pathname !== "/")
                  ? "#ff6347"
                  : "#fff",
            }}
          >
            TINERARY
          </span>
        </Link>
        <div
          className="menu_overlay"
          ref={menu_overlay}
          onClick={(e) => menuHidden(e)}
        >
          <ul
            className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4"
            ref={menuRef}
          >
            <div
              className="icon_close d-md-none"
              onClick={() => {
                menu_overlay.current.classList.remove("menu_overlay-visible");
                menuRef.current.classList.remove("ul-visible");
              }}
            >
              <BsX />
            </div>
            <li>
              <Link to={"/cities"} className="menu_link">
                Cities
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="menu_link">
                About
              </Link>
            </li>
            <li>
              <a href="#footer" className="menu_link">
                Contact
              </a>
            </li>

            {user?.email ? (
              <>
                {user?.role === "admin" ? (
                  <li className="d-flex d-md-none flex-column justify-content-end align-items-center gap-1 user_log">
                    <Link to={"/admin"} className="menu_link link_admin p-0">
                      Admin
                    </Link>
                    <div
                      className="d-flex flex-column align-items-center gap-1"
                      onClick={logout}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "1.2rem",
                          color: "#fff",
                        }}
                      >
                        {userDB?.name}
                      </p>
                      <div
                        style={{
                          width: "2.4rem",
                          height: "2.4rem",
                          borderRadius: "100%",
                          backgroundColor: "#fff",
                          order: -1,
                        }}
                      >
                        <img
                          className="w-100 h-100"
                          src={userDB?.image}
                          alt={userDB?.name}
                          style={{
                            objectFit: "cover",
                            backgroundPosition: "center",
                            borderRadius: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="d-flex d-md-none flex-column justify-content-end align-items-center gap-1 user_log">
                    <div
                      className="d-flex flex-column align-items-center gap-1"
                      onClick={logout}
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "1.2rem",
                          color: "#fff",
                        }}
                      >
                        {userDB?.name}
                      </p>
                      <div
                        style={{
                          width: "2.4rem",
                          height: "2.4rem",
                          borderRadius: "100%",
                          backgroundColor: "#fff",
                          order: -1,
                        }}
                      >
                        <img
                          className="w-100 h-100"
                          src={userDB?.image}
                          alt={userDB?.name}
                          style={{
                            objectFit: "cover",
                            backgroundPosition: "center",
                            borderRadius: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="d-md-none">
                  <Link to={"/user/login"} className="menu_link">
                    Login
                  </Link>
                </li>

                <li className="d-md-none">
                  <Link to={"/user/register"} className="menu_link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <BiMenu onClick={menuVisible} className="d-md-none" />
        {user?.email ? (
          <>
            {user?.role === "admin" ? (
              <li className="d-none d-md-flex justify-content-end align-items-center gap-1 user_log">
                <Link to={"/admin"} className="menu_link link_admin p-0">
                  Admin
                </Link>
                <div
                  className="d-flex align-items-center gap-1"
                  onClick={logout}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "1.2rem",
                      color: "#fff",
                    }}
                  >
                    {userDB?.name}
                  </p>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      className="w-100 h-100"
                      src={userDB?.image}
                      alt={userDB?.name}
                      style={{
                        objectFit: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
              </li>
            ) : (
              <li className="d-none d-md-flex justify-content-end align-items-center gap-1 user_log">
                <div
                  className="d-flex align-items-center gap-1"
                  onClick={logout}
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "1.2rem",
                      color: "#fff",
                    }}
                  >
                    {userDB?.name}
                  </p>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      className="w-100 h-100"
                      src={userDB?.image}
                      alt={userDB?.name}
                      style={{
                        objectFit: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>
                </div>
              </li>
            )}
          </>
        ) : (
          <div className="d-none d-md-flex align-items-center gap-1">
            <li>
              <Link
                to={"/user/login"}
                className={`${
                  location.pathname === "/user/login" && "d-none"
                } menu_link`}
              >
                Login
              </Link>
            </li>
            <span style={{ color: "#fff" }}>|</span>
            <li>
              <Link
                to={"/user/register"}
                className={`${
                  location.pathname === "/user/register" && "d-none"
                } menu_link`}
              >
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
