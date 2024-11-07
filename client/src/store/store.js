import { configureStore } from "@reduxjs/toolkit";
import adminuser from "../reducers/adminuser";

export const Store = configureStore({
    reducer: {
        user: adminuser
    }
})