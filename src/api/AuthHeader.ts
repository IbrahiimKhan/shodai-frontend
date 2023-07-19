import React from "react";
import { useSelector } from "react-redux";

const AuthHeader = () => {
  const token = useSelector((state: any) => state.auth);

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export default AuthHeader;
