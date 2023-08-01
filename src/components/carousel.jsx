import "../styles/carousel.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function Carousel() {
  const cities = [
    { name: "Tokyo", image: "./images/tokyo.jpg" },
    { name: "Buenos Aires", image: "./images/buenosAires.jpg" },
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "New York",
      image:
        "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "London",
      image:
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    },
    {
      name: "Rome",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=796&q=80",
    },
    {
      name: "Sydney",
      image:
        "https://images.unsplash.com/photo-1523428096881-5bd79d043006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Amsterdam",
      image:
        "https://images.unsplash.com/photo-1605101100278-5d1deb2b6498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Barcelona",
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    },
    {
      name: "San Francisco",
      image:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Berlin",
      image:
        "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
  ];

  return (
    <>
      <h2 className="text-light text-center mb-3 title_tineraries">
        Popular MyTineraries
      </h2>
      <div className="carousel-container">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slider d-flex flex-column flex-md-row justify-content-center">
              {cities.slice(0, 4).map((city, index) => (
                <div key={index} className="slide">
                  <img src={city.image} alt={city.name} />
                  <p>{city.name}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider d-flex flex-column flex-md-row justify-content-center">
              {cities.slice(4, 8).map((city, index) => (
                <div key={index} className="slide">
                  <img src={city.image} alt={city.name} />
                  <p>{city.name}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider d-flex flex-column flex-md-row justify-content-center">
              {cities.slice(8, 12).map((city, index) => (
                <div key={index} className="slide">
                  <img src={city.image} alt={city.name} />
                  <p>{city.name}</p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
