import {configureStore } from "@reduxjs/toolkit"
import authSlice from "../user/userSlice"

const store=configureStore({
    reducer:{
       auth:authSlice
    }
});

export default store;
