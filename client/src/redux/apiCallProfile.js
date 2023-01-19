import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user/";

// Get User Profile
const getProfile = async () => {
  const token = JSON.parse(localStorage.getItem("user"));
  const body = {};
  const headerSet = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };
  const response = await axios.post(API_URL + "profile", body, headerSet);
  return response.data.body;
};

// Edit User Profile
const editProfile = async (userData) => {
  const token = JSON.parse(localStorage.getItem("user"));
  const headerSet = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };
  const response = await axios.put(API_URL + "profile", userData, headerSet);
  return response.data.body;
};

const profileUser = {
  getProfile,
  editProfile,
};

export default profileUser;
