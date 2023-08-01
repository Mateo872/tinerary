const URL_USER = "https://backend-itineraries.vercel.app/api/users";

export const login = async (user) => {
  try {
    const response = await fetch(URL_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return {
      status: response.status,
      user: data.name,
      email: data.email,
      image: data.image,
      role: data.role,
      favorites: data.favorites,
      _id: data.uid,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${URL_USER}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    return {
      status: response.status,
      password: data.password,
      user: data.name,
      email: data.email,
      image: data.image,
      role: data.role,
      favorites: data.favorites,
      _id: data._id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(URL_USER);
    const listUsers = await response.json();
    return listUsers;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`${URL_USER}/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (user, id) => {
  try {
    const response = await fetch(`${URL_USER}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addFavorites = async (userID, newFavorites) => {
  try {
    const user = await getUser(userID);

    if (!user) {
      throw new Error("User not found");
    }

    const citiesNow = user.favorites || [];

    const newCities = newFavorites.filter(
      (idCity) => !citiesNow.includes(idCity)
    );

    const cityToRemove = citiesNow.filter((idCity) =>
      newFavorites.includes(idCity)
    );

    user.favorites = [...citiesNow, ...newCities];
    user.favorites = user.favorites.filter(
      (platoId) => !cityToRemove.includes(platoId)
    );

    await editUser(user, userID);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
