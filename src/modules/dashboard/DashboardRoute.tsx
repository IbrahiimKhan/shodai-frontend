import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Error404 from "../../components/Error404";
import Admin from "../dashboard/Admin";
import User from "../dashboard/User";
import AddProduct from "./AddProduct";
import Product from "./Product";
import UpdateProduct from "./UpdateProduct";
import OrderList from "./OrderList";
import OrderDetials from "./OrderDetials";
import CategoryList from "./CategoryList";
const DashboardRoute = () => {
  return (
    <Routes>
      <Route path="/admin/:id" element={<Admin />} />
      <Route path="/admin/user/:id" element={<User />} />
      <Route path="/admin/product-list" element={<Product />} />
      <Route path="/admin/product-list" element={<Product />} />
      <Route path="/admin/orders" element={<OrderList />} />
      <Route path="/admin/category-list" element={<CategoryList />} />
      <Route path="/admin/order/:id" element={<OrderDetials />} />
      <Route path="/admin/product/view/:productId" element={<UpdateProduct />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoute;
