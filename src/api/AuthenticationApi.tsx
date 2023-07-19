import axios from "./BASE_API";
import AuthHeader from "./AuthHeader";
const token = localStorage.getItem("token");
// class define for user authentication
class AuthenticationApi {
  // get all  category list
  usrLogin: any = async (data: any) => {
    // console.log("authheader")
    return axios.post(`/login`, data);
  };
  usrSignup: any = (data: any) => {
    return axios.post("/signup", data);
  };
  usrSignOut: any = () => {
    return axios.get("/logout");
  };
  //get user information by admin
  getUserInfo: any = (adminId: any, customerId: any) => {
    return axios.get(`/singleuser/${adminId}/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  //get single user information user all information including orders
  getSingleUserInfo: any = (id: any) => {
    return axios.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
export default new AuthenticationApi();
