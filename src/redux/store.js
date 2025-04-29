// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./Task/reducer";
import UsersReducer from "./Users/reducer";
import LoginReducer from "./Login/reducer";

export const store = configureStore({
  reducer: {
    Task: TaskReducer,
    Users: UsersReducer,
    Login: LoginReducer,
  },
});
