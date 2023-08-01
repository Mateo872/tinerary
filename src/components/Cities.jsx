import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillGeoFill, BsSearch, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../styles/cities.css";
import { ClipLoader } from "react-spinners";
import { getUser } from "../helpers/queries";

function Cities() {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userDB, setUserDB] = useState(null);
  async function getData() {
    const response = await axios.get(
      "https://api-cities-crud-xh50.onrender.com/api/cities"
    );
    setCities(response.data.response.cities);
    setSpinnerLoading(false);
  }

  useEffect(() => {
    getData();
    setSpinnerLoading(true);
  }, []);

  const handleSearch = (e) => {
    setInput(e.target.value);
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 300);
  };

  useEffect(() => {
    if (user) {
      getUser(user._id).then((res) => {
        setUserDB(res);
      });
    }
  }, [userDB]);

  const filteredCities = cities.filter((citie) =>
    citie.name.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <section>
      <article className="section_cities">
        <h1 className="title text-center lead mb-0">Cities</h1>
        <div className="container_input d-flex align-items-center justify-content-end">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
            className="form-control"
          />
          <div
            className={`icon_search ${
              input.length > 0 ? "d-none" : "d-flex"
            } align-items-center justify-content-center`}
          >
            <BsSearch />
          </div>
        </div>
        {showSpinner ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "18rem" }}
          >
            <ClipLoader color="#232229" size={35} />
          </div>
        ) : (
          <div
            className={`container_city d-flex flex-wrap justify-content-center my-4 align-items-center ${
              filteredCities.length < 3
                ? "justify-content-center"
                : "justify-content-md-between"
            }
          `}
            style={{ height: "15rem" }}
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <Link
                  key={city._id}
                  to={`/cityDetails/${city._id}`}
                  className="city d-flex flex-column justify-content-end p-3 position-relative"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${city.image})`,
                  }}
                >
                  {userDB &&
                    userDB.role !== "admin" &&
                    userDB.favorites.find((fav) => fav === city._id) && (
                      <div className="star position-absolute">
                        <BsStarFill style={{ color: "#FFD700" }} />
                      </div>
                    )}
                  <div className="container_other d-flex flex-column">
                    <h4 className="mb-0">{city.name}</h4>
                    <div className="point d-flex align-items-center gap-1">
                      <BsFillGeoFill className="mb-0" />
                      <p className="mb-0">{city.country}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : filteredCities.length === 0 && !spinnerLoading ? (
              <p className="mb-0">No cities found</p>
            ) : (
              <ClipLoader color="#232229" size={35} />
            )}
          </div>
        )}
      </article>
    </section>
  );
}

export default Cities;
