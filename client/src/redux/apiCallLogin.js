import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  const user = response.data;
  if (response.data) {
    const data = {
      email: user.email,
      token: user.body.token,
    };
    localStorage.setItem("user", JSON.stringify(data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("profile");
  localStorage.removeItem("user");
};

const authUser = {
  logout,
  login,
};

export default authUser;
