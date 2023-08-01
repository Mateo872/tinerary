import { Link } from "react-router-dom";
import "../styles/callToAction.css";
import Carousel from "./carousel";

const CallToAction = () => {
  return (
    <section className="container_dishes">
      <article className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-center">
          Our favorite tour operators in one place
        </h1>
        <h3 className="text-center">
          Discover exciting itineraries with our search tool
        </h3>
        <Link to="/cities" className="button_call">
          Get started
        </Link>
      </article>
      <Carousel />
    </section>
  );
};

export default CallToAction;
