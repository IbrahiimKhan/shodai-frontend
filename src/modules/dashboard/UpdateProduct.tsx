import {
    Container,
    Box,
    Typography,
    Button,
    TextField,
    Radio,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    ListItemButton,
    ListItemText,
    Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductApi from "../../api/ProductApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryApi from "../../api/CategoryApi";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";


const UpdateProduct = () => {
    const [name, setName] = useState<any>("");
    const [photo, setPhoto] = useState<any>(null);
    const [price, setPrice] = useState<any>("");
    const [quantity, setQuantity] = useState<any>("");
    const [category, setCategory] = useState<any>("");
    const [sold, setSold] = useState<any>("");
    const [shipping, setShipping] = useState<any>(false);
    const [description, setDescription] = useState<any>("");

    const [previewURL, setPreviewURL] = useState<any>("");
    const [categoryList, setCategoryList] = useState<any>([]); //category list
    const userId = useSelector((state: any) => state.userInfo._id);
    const [hide, setHide] = useState<any>(true); //hide the category list
    const [product, setProduct] = useState<any>([]); //product list
    const [categoryId, setCategoryId] = useState<any>(""); //category id
    const productId = useParams().productId
    const base_url = process.env.REACT_APP_API_URL;
    //console.log("prod id", productId)
    const navigate = useNavigate();
    //console.log(userId, "user id");
    //handling the photo
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPreviewURL(URL.createObjectURL(file));
    };
    console.log("product photo", photo);
    //handling the product adding
    const handleUpdate = (e: any) => {
        e.preventDefault();

        if (photo === "" || photo === undefined || photo === null) {
            toast.warning("Please Select Product Photo");
            return;
        }
        if (name === "" || name === undefined) {
            toast.warning("Please Enter Product Name");
            return;
        } else if (description === "" || description === undefined) {
            toast.warning("Please Enter Product Description");
            return;
        } else if (price === "" || price === undefined) {
            toast.warning("Please Enter Product Price");
            return;
        } else if (categoryId === "" || categoryId === undefined) {
            toast.warning("Please Select Product Category");
            return;
        } else if (quantity === "" || quantity === undefined) {
            toast.warning("Please Enter Product Quantity");
            return;
        }
        const product = new FormData();
        product.append("name", name);
        product.append("photo", photo);
        product.append("price", price);
        product.append("quantity", quantity);
        product.append("category", categoryId);
        // product.append("sold", sold);
        product.append("shipping", shipping);
        product.append("description", description);

        ProductApi.updateProduct(productId, userId, product)
            .then((res: any) => {
                //  console.log(res, "created product");

                toast.success("Product updated Successfully");
                navigate("/dashboard/admin/product-list");

            })
            .catch((err: any) => {
                console.log(err);
                toast.error("Product updating Failed");
            });
    };
    //useEffect for handling the category
    //fetch all the category
    const fetchAllCategory = () => {
        CategoryApi.getCategoryList()
            .then((res: any) => {
                //     console.log(res?.data?.categories, "all categories");
                setCategoryList(res.data?.categories);
            })
            .catch((err: any) => {
                //  console.log(err);
            });
    };
    //get a single product
    const fetchSingleProduct = (prodId: any) => {
        ProductApi.getSingleProduct(prodId).then((res: any) => {
            console.log(res?.data?.data, "single product");
            setProduct(res.data?.data);
            setName(res.data?.data.name);
            setDescription(res.data?.data.description);
            setPrice(res.data?.data.price);
            setQuantity(res.data?.data.quantity);
            setCategory(res.data?.data.category?.name);
            setCategoryId(res.data?.data.category?._id)
            // setSold(res.data?.data.sold);
            // setShipping()
        }).catch((err: any) => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchAllCategory();
        fetchSingleProduct(productId);
        setPreviewURL(`${base_url}/product/photo/${productId}`);
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid xs={2} md={2}>
                    <SideBar userProfile={""} getmenu={""} />
                </Grid>
                <Grid sx={{ borderRadius: 0 }} xs={10} py={4} pl={2} md={10}>
                    <Box width={"50%"} sx={{ backgroundColor: "white", padding: "20px", }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            component="div"
                            fontWeight={"bolder"}

                        >
                            Update Product
                        </Typography>
                        <Box sx={{ marginBottom: 1 }}>
                            {/* File input for selecting the photo */}
                            <input type="file" onChange={handleFileChange} />
                        </Box>
                        {previewURL && (
                            <Box sx={{ marginBottom: 1 }}>
                                <img
                                    src={previewURL}
                                    alt="Product Preview"
                                    style={{ maxWidth: "45%", maxHeight: 200 }}
                                />
                            </Box>
                        )}
                        <Box sx={{ marginBottom: 1, width: "100%" }}>
                            <TextField
                                fullWidth
                                id="outlined-controlled"
                                label="Name"
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                fullWidth
                                id="outlined-controlled"
                                label="Description"
                                value={description}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                fullWidth
                                id="outlined-controlled"
                                label="Price"
                                value={price}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setPrice(event.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                fullWidth
                                id="outlined-controlled"
                                label="Categroy"
                                value={category}
                                onFocus={() => setHide(false)}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setCategory(event.target.value);
                                }}
                            />
                            {!hide && categoryList?.length > 0 && (
                                <Box sx={{ maxHeight: "200px", width: "50%", zIndex: "10", backgroundColor: "white", overflow: "scroll", overflowX: "hidden", position: "absolute" }}>
                                    {categoryList?.map((category: any) => {
                                        return (
                                            <ListItemButton
                                                onClick={() => {
                                                    setCategory(category.name);
                                                    setCategoryId(category._id);
                                                    setHide(true);
                                                }}
                                                sx={{ backgroundColor: "white" }}
                                                key={category._id}
                                            >
                                                <ListItemText primary={category.name} />
                                            </ListItemButton>
                                        );
                                    })}
                                </Box>
                            )}
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <TextField
                                fullWidth
                                id="outlined-controlled"
                                label="Quantity"
                                value={quantity}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setQuantity(event.target.value);
                                }}
                            />
                        </Box>
                        <Box sx={{ marginBottom: 1 }}>
                            <Typography variant="body2">Shipping</Typography>
                        </Box>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={shipping}
                                onChange={(e) => setShipping(e.target.value)}
                            >
                                <FormControlLabel
                                    sx={{
                                        "& .MuiRadio-colorDefault": {
                                            color: "black",
                                        },
                                    }}
                                    value="true"
                                    control={<Radio color="default" />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    sx={{
                                        "& .MuiRadio-colorDefault": {
                                            color: "black",
                                        },
                                    }}
                                    value="false"
                                    control={<Radio color="default" />}
                                    label="No"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Box sx={{ marginBottom: 1 }}>
                            <Button

                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    marginTop: 1,
                                    ":hover": { backgroundColor: "black", color: "white" },
                                }}
                                onClick={(e) => handleUpdate(e)}
                                style={{ marginRight: 8 }}
                            >
                                Update Product
                            </Button>
                        </Box>
                        <Box sx={{ marginBottom: 1 }}></Box>
                    </Box>
                </Grid>
            </Grid>
            <Container />
        </Container>
    );

};
export default UpdateProduct;
