import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Error404 from "../../components/Error404";
import Admin from "../dashboard/Admin";
import User from "../dashboard/User";
import Cart from "../../pages/Cart";

const CartRoute = () => {
  return (
    <Routes>
      <Route path="/user/:id" element={<User />} />
      <Route path="/products" element={<Cart />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default CartRoute;
