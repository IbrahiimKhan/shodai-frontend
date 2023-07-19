import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductApi from '../api/ProductApi'
import { Button, Container, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "../components/style.css"
import RelatedProd from '../components/RelatedProd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCartData } from '../store/slices/cart';
const Product = () => {
    //navigate
    const navigate = useNavigate()
    const { porductId } = useParams()
    const baseURL = process.env.REACT_APP_API_URL
    const [product, setProduct] = useState<any>()
    const [quantity, setQuantity] = useState<any>(1)
    const cartProducts = useSelector((state: any) => state.cart);
    const dispatch = useDispatch()
    //get the single product
    const fetchSingleProduct = async () => {
        ProductApi.getSingleProduct(porductId).then((res: any) => {
            setProduct(res?.data?.data)
        }).catch((err: any) => {
            // console.log(err)
        })
    }
    //handling the cart click
    const handleCart = (item: any) => {
        if (item?.quantity < 1) {
            toast.error("This product is out of stock", { position: "top-left" });
            return;
        }
        item.quantityFront = quantity;
        item.price = item.price * quantity;
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
            dispatch(setCartData(item));
            toast.success("Product added to cart", { position: "top-left" });
            navigate("/cart/products");
        }

    };

    useEffect(() => {
        fetchSingleProduct()
    }, [porductId])
    // console.log("category id",)
    return (
        <>
            <Container>
                <Grid container spacing={2} paddingBottom={2} paddingTop={2}>
                    <Grid xs={6} sx={{ padding: 2 }}>
                        {product?._id && <img
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                            loading='lazy'
                            aria-label='responsive'

                            src={`${baseURL}/product/photo/${product?._id}`} />}

                    </Grid>
                    <Grid xs={6} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom component="div">
                            {product?.name},
                        </Typography>

                        <Grid container >
                            <Grid xs={3}>
                                <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom component="div">
                                    Description:
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography sx={{ marginLeft: 2 }} variant="body2" gutterBottom component="div">
                                    {product?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 1 }} >
                            <Grid xs={3}>
                                <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom component="div">
                                    Price:
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography sx={{ marginLeft: 2, fontWeight: "500" }} variant="body2" gutterBottom component="div">
                                    ৳{product?.price}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 1 }} >
                            <Grid xs={3}>
                                <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom component="div">
                                    Category:
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Typography sx={{ marginLeft: 2, fontWeight: "500", textTransform: "capitalize" }} variant="body2" gutterBottom component="div">
                                    {product?.category?.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 1 }} >
                            <Grid xs={3}>
                                <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom component="div">
                                    Quantity:
                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Box display={'flex'} sx={{ alignItems: "center", marginLeft: 2 }}>
                                    <IconButton
                                        onClick={() => setQuantity(quantity - 1)}
                                        disabled={quantity < 2} aria-label="previous"> <RemoveIcon /></IconButton>
                                    <Box>
                                        <Typography sx={{ marginLeft: 2 }} variant="body2" gutterBottom component="div">
                                            {quantity}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        onClick={() => setQuantity(quantity + 1)}
                                        aria-label="next">
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ marginTop: 1 }} >
                            <Grid xs={3}>
                                <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom component="div">

                                </Typography>
                            </Grid>
                            <Grid xs={9}>
                                <Button variant='contained'
                                    onClick={() => handleCart(product)}
                                >Buy Now</Button>
                            </Grid>
                        </Grid>



                    </Grid>
                </Grid>
                <Typography variant="body1" sx={{ fontWeight: "600" }} gutterBottom component="div">
                    Related Products
                </Typography>
                <RelatedProd prodId={porductId} />
            </Container>
        </>
    )
}

export default Product