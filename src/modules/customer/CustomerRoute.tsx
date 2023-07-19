import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Error404 from "../../components/Error404";
import Profile from "./Profile";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
const CustomerRoute = () => {
    return (
        <Routes>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/order/:id" element={<OrderDetails />} />

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default CustomerRoute;
