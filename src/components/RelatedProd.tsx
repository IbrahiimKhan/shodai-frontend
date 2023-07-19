import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import ProductApi from '../api/ProductApi';

import { Badge, CardMedia } from '@mui/material';
import dukati from "../media/dukati.jpg"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./style.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '../store/slices/cart';
import { toast } from 'react-toastify';
export default function RelatedProd({ prodId }: { prodId: any }) {
    const navigate = useNavigate()
    const [product, setProduct] = useState<any>([]);
    const baseURL = process.env.REACT_APP_API_URL
    const cartProducts = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    //get all category list
    const getProductList = () => {
        ProductApi.getRelatedProduct(prodId)
            .then((response: any) => {
                console.log("related prod", response.data);
                setProduct(response?.data?.data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };
    //handling cart click
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
        getProductList();
    }, [prodId]);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)', // Display items in six columns
                gap: 2, // Add gap between columns
                marginTop: 5,
                marginBottom: 5,
                bgcolor: 'transparent',
                cursor: "pointer",
                paddingBottom: 2,
                borderRadius: 1,
                overflow: 'auto', // Enable vertical scrolling if items exceed window height


            }}
        >
            {product?.slice(0, 12)?.map((prod: any, index: any) => (
                <Card

                    sx={{ boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px", textAlign: "left" }} key={index}>
                    <Badge badgeContent={prod?.quantity > 0 ? "In Stock" : "Out of Stock"} sx={{ color: "black", backgroundColor: "black!important", position: "absolute", marginLeft: 4.8, marginTop: 2, textAlign: "left", fontSize: "5px" }}></Badge>
                    <CardMedia
                        onClick={() => navigate(`/product/single/${prod?._id}`)}
                        sx={{ height: 120 }}
                        image={`${baseURL}/product/photo/${prod?._id}`}
                        title="product image"
                    />
                    <CardContent>

                        <Typography
                            onClick={() => navigate(`/product/single/${prod?._id}`)}
                            variant='h6' component="h6" sx={{ fontSize: 14, fontWeight: "600", textTransform: "capitalize", lineHeight: 1.3, cursor: "pointer" }} color="text.secondary" gutterBottom>
                            {prod?.name}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 2.5, paddingTop: 1 }}>
                            <Typography
                                onClick={() => navigate(`/product/single/${prod?._id}`)}
                                variant='h6' component="h6" sx={{ fontSize: 12, fontWeight: "600", textTransform: "capitalize", cursor: "pointer" }} color="text.secondary" gutterBottom>
                                Price:  <span style={{ color: "black" }}>{prod?.price} ৳</span>
                            </Typography>
                            <AddShoppingCartIcon
                                onClick={() => handleCart(prod)}
                                sx={{}} />
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
