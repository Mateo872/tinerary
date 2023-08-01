import axios from "axios";

const citiesActions = {
  searchResult: (filterResult) => {
    return (dispatch, getState) => {
      dispatch({ type: "searchResult", payload: filterResult });
    };
  },

  getCities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get(
        "https://api-cities-crud-xh50.onrender.com/api/cities"
      );
      dispatch({ type: "loadCities", payload: res.data.response.cities });
    };
  },
};

export default citiesActions;
