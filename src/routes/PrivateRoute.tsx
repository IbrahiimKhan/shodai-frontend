import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../modules/authentication/Login";
import Register from "../modules/authentication/Register";
import AuthRoute from "../modules/authentication/AuthRoute";
import ProductRoute from "../modules/product/ProductRoute";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Error404 from "../components/Error404";
import ShopRoute from "../modules/shop/ShopRoute";
import { Container } from "@mui/material";
import CartRoute from "../modules/cart/CartRoute";
import DashboardRoute from "../modules/dashboard/DashboardRoute";
import CustomerRoute from "../modules/customer/CustomerRoute";

const PrivateRoute = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/product/*" element={<ProductRoute />} />
        <Route path="/shop/*" element={<ShopRoute />} />
        <Route path="/cart/*" element={<CartRoute />} />
        <Route path="/dashboard/*" element={<DashboardRoute />} />
        <Route path="/customer/*" element={<CustomerRoute />} />

        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  );
};

export default PrivateRoute;
