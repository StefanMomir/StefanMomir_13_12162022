import { configureStore } from "@reduxjs/toolkit";
import authUser from "./auth.js";
import profileUser from "./profile.js";

const store = configureStore({
  reducer: {
    auth: authUser,
    profiles: profileUser,
  },
});

export default store;
