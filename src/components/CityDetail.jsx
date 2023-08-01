import axios from "axios";
import { BsStar, BsInfoCircle, BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "../styles/itinerary.css";
import "../styles/cityDetail.css";
import { addFavorites, getUser } from "../helpers/queries";

const CityDetail = () => {
  const { id } = useParams();
  const [showSpinner, setShowSpinner] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [city, setCity] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const [userDB, setUserDB] = useState(null);

  useEffect(() => {
    if (user) {
      getUser(user._id).then((res) => {
        setUserDB(res);
      });
    }
  }, [userDB]);

  useEffect(() => {
    async function getCity() {
      try {
        setShowSpinner(true);
        const response = await axios.get(
          `https://api-cities-crud-xh50.onrender.com/api/cities/${id}`
        );
        setTimeout(() => {
          setCity(response.data.response.city);
          setShowSpinner(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    }

    getCity();
  }, []);

  useEffect(() => {
    const getItinerary = async () => {
      const response = await axios.get(
        "https://backend-itineraries.vercel.app/api/itineraries"
      );
      setItinerary(response.data);
    };
    getItinerary();
  }, [id, userDB]);

  const itineraryID = itinerary.find((it) => it?.idCity === city?._id);

  const handleFav = async () => {
    const exist = user.favorites.find((fav) => fav === city._id);

    try {
      if (!exist) {
        await addFavorites(user._id, [city._id]);
      } else {
        const newsFavorites = user.favorites.filter((fav) => fav !== city._id);
        await addFavorites(user._id, newsFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <article className="container_detail">
        {showSpinner ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <ClipLoader size={45} />
          </div>
        ) : city ? (
          <>
            <div className="d-flex gap-1 pagination mb-1">
              <Link to={"/cities"}>CITY /</Link>
              <span className="pagination_detail">
                {city.country?.toUpperCase()} /
              </span>
              <span className="pagination_detail-color">
                {city.name?.toUpperCase()}
              </span>
            </div>
            <div className="container_image-charac d-flex flex-column flex-md-row gap-4 position-relative">
              <div
                className="container_image-detail"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${city.image})`,
                }}
              ></div>
              {userDB && userDB.role !== "admin" && (
                <div onClick={handleFav}>
                  {userDB &&
                  userDB.favorites.find((fav) => fav === city._id) ? (
                    <BsStarFill
                      className="star position-absolute"
                      style={{ color: "#FFD700" }}
                    />
                  ) : (
                    <BsStar
                      className="star position-absolute"
                      style={{ color: "#FFD700" }}
                    />
                  )}
                </div>
              )}
              <div className="container_charac-detail d-flex flex-column justify-content-lg-between">
                <h2 className="mt-0">{city.name}</h2>
                <p className="description_detail mb-0" title="">
                  {city.description}
                </p>
                <h4 className="mt-3">Population</h4>
                <p className="mb-0" title="">
                  Quantity: {""}
                  <span style={{ fontWeight: "bold" }}>
                    {parseInt(city.population).toLocaleString()}
                  </span>
                </p>
                <div className="description_detail"></div>
                <h4 className="mt-3">Itinerary</h4>
                <Link
                  to={""}
                  className="button_itinerary"
                  onClick={() => setShowItinerary(!showItinerary)}
                >
                  <BsInfoCircle />{" "}
                  {showItinerary ? "Close itinerary" : "View itinerary"}
                </Link>
              </div>
            </div>
            {showItinerary && (
              <div
                className="containerr d-flex flex-column flex-md-row gap-4"
                style={{ marginTop: "2rem" }}
              >
                <div className="container_itinerary d-flex flex-column justify-content-start align-items-center">
                  <div className="container_profile d-flex gap-2 align-items-center">
                    <div
                      className="itinerary_image"
                      style={{
                        backgroundImage: `url(${itineraryID?.profileImage})`,
                      }}
                    ></div>
                    <div className="d-flex flex-column">
                      <h5 className="title_collaborator mb-0">
                        {itineraryID?.collaborator}
                      </h5>
                      <p className="title_time mb-0">{itineraryID?.time}</p>
                    </div>
                  </div>
                  <div className="container_images d-flex flex-column justify-content-center w-100">
                    <div
                      className="image w-100"
                      style={{
                        backgroundImage: `url(${itineraryID?.imageOne})`,
                        borderBottom: "2px solid #ddd",
                      }}
                    ></div>
                    <div className="d-flex w-100">
                      <div
                        className="image w-100"
                        style={{
                          backgroundImage: `url(${itineraryID?.imageTwo})`,
                        }}
                      ></div>
                      <div
                        className="image w-100"
                        style={{
                          backgroundImage: `url(${itineraryID?.imageThree})`,
                          borderLeft: "2px solid #ddd",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="container_charac">
                    <h4 className="mb-0">
                      Activity: <span>{itineraryID?.titleActivity}</span>
                    </h4>
                    <h4 className="mb-0 pt-0">
                      Features: <span>{itineraryID?.description}</span>
                    </h4>
                    <h4 className="charac_language">
                      Language: <span>{itineraryID?.language}</span>
                    </h4>
                  </div>
                </div>
                <div className="container_things px-2">
                  <h4>Things to do in city</h4>
                  <p className="pt-2 mb-0 tinerary_desc">
                    {itineraryID?.thingsToDoInCity}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <ClipLoader size={45} />
          </div>
        )}
      </article>
    </section>
  );
};

export default CityDetail;
