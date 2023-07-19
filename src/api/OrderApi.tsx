import axios from "./BASE_API";
let token = localStorage.getItem("token")
// class define for category
class OrderAPI {
    //get all orders
    getallOrders: any = (id: any, data: any) => {
        // console.log("authheader", AuthHeader())
        return axios.get(
            `/order-list/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            }
        }
        );
    }
    //update single order
    updateOrder: any = (orderId: any, userId: any, status: any) => {

        const data = { status }
        return axios.put(
            `/order/update/${orderId}/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            }
        }
        );
    }
    //get single user orders
    getSingleUserOrders: any = (id: any) => {
        return axios.get(`/order/by/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            }
        });
    }

}
export default new OrderAPI();
