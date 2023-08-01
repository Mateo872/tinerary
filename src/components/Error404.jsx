import { PacmanLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "../styles/error404.css";

const Error404 = () => {
  return (
    <section className="pacman_container d-flex align-items-center justify-content-center text-center">
      <article>
        <>
          <div
            className="pacman d-flex justify-content-center"
            style={{ marginTop: "5rem" }}
          >
            <PacmanLoader
              color="#1e1e1e"
              size={window.innerWidth < 700 ? 35 : 97.5}
              loading
            />
          </div>
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            Oops...
          </h1>
          <p className="pacman_text">
            Page not found, go back to the{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "#ff6347",
                  fontWeight: "bold",
                }}
              >
                top
              </span>
            </Link>
            .
          </p>
        </>
      </article>
    </section>
  );
};

export default Error404;
