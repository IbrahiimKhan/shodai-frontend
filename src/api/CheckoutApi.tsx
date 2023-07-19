import axios from "./BASE_API";
import AuthHeader from "./AuthHeader";
let token = localStorage.getItem("token")
// class define for category
class CheckoutAPI {
    // get all  category list

    generateUserToken: any = (id: any) => {
        // console.log("authheader", AuthHeader())
        return axios.get(

            `/braintree/getToken/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    };
    confirmOrder: any = (id: any, data: any) => {
        // console.log("authheader", AuthHeader())
        return axios.post(

            `/order/create/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            }
        }
        );
    }

}
export default new CheckoutAPI();
