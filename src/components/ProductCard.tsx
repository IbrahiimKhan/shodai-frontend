import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CategoryApi from "../api/CategoryApi";
import ProductApi from "../api/ProductApi";

import { Badge, CardMedia } from "@mui/material";
import dukati from "../media/dukati.jpg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "../store/slices/productSlice";
import { setCartData } from "../store/slices/cart";
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function ProductCard({
  productId,
  noOfColumn,
  noOfProd,
  offset,
  view
}: {
  productId: any;
  noOfColumn: any;
  noOfProd: any;
  offset: any;
  view: any
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>([]);
  const [erroMsg, setErroMsg] = useState<any>("");
  const baseURL = process.env.REACT_APP_API_URL;
  const cartProducts = useSelector((state: any) => state.cart);
  const baseURL2 = process.env.REACT_APP_API_URL2;

  //get all category list
  const getProducts = () => {
    //  console.log("productId at product card page", productId)
    if (productId === "All") {
      ProductApi.getProductList(offset)
        .then((response: any) => {
          //console.log(response.data);
          setProduct(response?.data?.data);
          dispatch(setProductsData(response?.data?.data));
        })
        .catch((error: any) => {
          // console.log(error);
        });
    } else if (productId?.length > 0) {
      //  console.log("executing multiple")
      ProductApi.getMulProdByMulCategroy(productId, offset)
        .then((response: any) => {
          // console.log(response.data);
          setProduct(response?.data?.data);
          setProductsData(response?.data?.data);
        })
        .catch((error: any) => {
          setErroMsg(error?.response?.data?.message);
        });
      return;
    } else {
      console.log("executing single", productId?.lenth);
      ProductApi.getProductListBySingleCategory(productId)
        .then((response: any) => {
          //  console.log(response.data);
          setProduct(response?.data?.data);
          setProductsData(response?.data?.data);
        })
        .catch((error: any) => {
          // console.log(error?.response?.data?.message);
          setErroMsg(error?.response?.data?.message);
        });
    }
  };
  //handle the cart
  const handleCart = (item: any) => {
    if (item?.quantity < 1) {
      toast.error("This product is out of stock", { position: "top-left" });
      return;
    }

    const newItem = { ...item }; // Create a new object by copying 'item'
    newItem.quantityFront = 1; // Add the 'quantityFront' property to the new object

    let isProductAlreadyInCart = false;

    cartProducts.forEach((prod: any) => {
      if (prod?._id === item?._id) {
        toast.error("This product is already added! Please check your cart", {
          position: "top-left",
        });
        isProductAlreadyInCart = true;
      }
    });

    if (!isProductAlreadyInCart) {
      dispatch(setCartData(newItem));
      toast.success("Product added to cart", { position: "top-left" });
    }
  };

  useEffect(() => {
    getProducts();
    if (productId === "All") {
      setErroMsg("");
    }
  }, [productId, offset]);
  // handling the infinite scroll
  const handleScroll = () => {
    // console.log("document height", document.documentElement.scrollHeight)
    // console.log("inner  height", window.innerHeight)
    // console.log("scroll top", document.documentElement.scrollTop)
    // console.log("scroll top + inner height", document.documentElement.scrollTop + window.innerHeight)
    // if (Math.floor(document.documentElement.scrollTop + window.innerHeight) === (document.documentElement.scrollHeight - 200)) {
    //     alert("you can now load more data")
    // }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  // console.log("product id at product card page", productId)
  // console.log("product or error", product, erroMsg)
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${noOfColumn.toString()}, 1fr)`, // Display items in six columns
        gap: 2, // Add gap between columns

        marginBottom: 5,
        bgcolor: "transparent",
        cursor: "pointer",
        paddingBottom: 2,
        borderRadius: 1,
        overflow: "auto", // Enable vertical scrolling if items exceed window height
      }}
    >
      {erroMsg ? (
        <>
          <Box textAlign={"center"}>
            <Typography variant="h6" color={"black"}>
              No Product Found!
            </Typography>
          </Box>
        </>
      ) : (
        product?.slice(0, noOfProd)?.map((prod: any, index: any) => (
          <Card
            sx={{
              boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
              textAlign: "left",
            }}
            key={index}
          >
            <Badge
              badgeContent={prod?.quantity > 0 ? "In Stock" : "Out of Stock"}
              sx={{
                color: "black",
                backgroundColor: "black!important",
                position: "absolute",
                marginLeft: 4.8,
                marginTop: 2,
                textAlign: "left",
                fontSize: "5px",
              }}
            ></Badge>
            <CardMedia
              component="img"
              loading="lazy"
              onClick={() => navigate(`/product/single/${prod?._id}`)}
              sx={{ height: 120 }}
              image={`${baseURL}/product/photo/${prod?._id}`}
              title="product image"
            />
            <CardContent>
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  fontSize: 14,
                  fontWeight: "600",
                  textTransform: "capitalize",
                  lineHeight: 1.3,
                  cursor: "pointer",
                }}
                color="text.secondary"
                gutterBottom
              >
                {prod?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 2.5,
                  paddingTop: 1,
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    fontSize: 12,
                    fontWeight: "600",
                    textTransform: "capitalize",
                    cursor: "pointer",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  Price: <span style={{ color: "black" }}>{prod?.price} ৳</span>
                </Typography>
                {view !== "eye" ? <AddShoppingCartIcon sx={{}} onClick={() => handleCart(prod)} /> : <VisibilityIcon
                  onClick={() => navigate(`/product/single/${prod?._id}`)}
                />}
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
