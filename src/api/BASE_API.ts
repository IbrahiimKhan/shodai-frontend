import axios from "axios";

const BASE_API: any = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});
export default BASE_API;
