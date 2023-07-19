import axios from "./BASE_API";
import AuthHeader from "./AuthHeader";
const token = localStorage.getItem("token");
// class define for category
class CategoryApi {

    //create a new category
    createCategory: any = (userId: any, category: any) => {
        return axios.post(`/category/create/${userId}`, category, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    //update a category
    updateCategory: any = (categoryId: any, userId: any, category: any) => {
        return axios.put(`/category/${categoryId}/${userId}`, category, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    // get all  category list
    getCategoryList: any = () => {

        return axios.get(
            `/categories`,
        );
    };
    //get a single category
    getSingleCategory: any = (categoryId: any) => {
        return axios.get(`/category/${categoryId}`);

    }

    //delete category
    deleteCategory: any = (userId: any, categoryId: any) => {
        return axios.delete(`/category/${categoryId}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

}
export default new CategoryApi();
