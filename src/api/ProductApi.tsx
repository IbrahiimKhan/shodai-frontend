import axios from "./BASE_API";
import AuthHeader from "./AuthHeader";
import { AnyAaaaRecord } from "dns";
const token = localStorage.getItem("token");
// class define for category
class ProductApi {
  //get all products
  getProductList: any = (offset: any) => {
    return axios.get(`/products?order=desc&limit=25&offset=${offset}`);
  };
  // get all  category list
  getProductListBySingleCategory: any = (productId: any) => {
    //  console.log(productId, "productId for api call")
    return axios.get(`/products/category/${productId}`);
  };
  //get single product photo
  getProductPhoto: any = (id: any) => {
    return axios.get(`/product/photo/${id}`);
  };
  //get a single product
  getSingleProduct: any = (id: any) => {
    return axios.get(`/product/${id}`);
  };
  //get multiple product based on multiple category
  getMulProdByMulCategroy: any = (categories: any, offset: any) => {
    console.log("our offset", offset);
    return axios.post(`/products/categories?limit=25&offset=${offset}`, {
      categories: categories,
    });
  };
  //get all related product
  getRelatedProduct: any = (id: any) => {
    return axios.get(`/products/related/${id}`);
  };
  deleteSingleProduct: any = (userId: any, prodId: any) => {
    return axios.delete(`/product/${prodId}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  //create a new product
  createProduct: any = async (userId: any, product: any) => {
    return axios.post(`/product/create/${userId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });
  };
  //update a product
  updateProduct: any = (productId: any, userId: any, product: any) => {
    return axios.patch(`/product/${productId}/${userId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });
  }
}
export default new ProductApi();
