import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Grid, Modal, Typography, TextField, FormControlLabel, Radio, RadioGroup, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import cart from "../media/cart.avif";
import { useEffect, useState } from "react";
import { clearCartData, deleteCartData } from "../store/slices/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import CheckoutApi from "../api/CheckoutApi";
// import dropin from "braintree-web-drop-in-react";

export default function Cart() {
  const [quantity, setQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState<any>(0);
  const [subtotal, setSubTotal] = useState<any>(0);
  const dispatch = useDispatch();
  const baseURL = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState<any>(
    useSelector((state: any) => state.cart)
  );
  const token = useSelector((state: any) => state?.auth?.token);
  const userId = useSelector((state: any) => state?.userInfo?._id);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = useState<any>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);
  const [usertoken, setUserToken] = useState<any>("");
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //setting values
  //handling increment
  const handleInc = (index: number) => {
    const newProducts = [...products];
    const updatedProduct = {
      ...newProducts[index],
      quantityFront: newProducts[index].quantityFront + 1,
    };
    updatedProduct.price =
      (updatedProduct.price / newProducts[index].quantityFront) *
      updatedProduct.quantityFront;
    newProducts[index] = updatedProduct;
    setProducts(newProducts);
  };

  const handleDec = (index: number) => {
    const newProducts = [...products];
    if (newProducts[index].quantityFront > 1) {
      const updatedProduct = {
        ...newProducts[index],
        quantityFront: newProducts[index].quantityFront - 1,
      };
      updatedProduct.price =
        (updatedProduct.price / newProducts[index].quantityFront) *
        updatedProduct.quantityFront;
      newProducts[index] = updatedProduct;
      setProducts(newProducts);
    }
  };


  const cartItems = useSelector((state: any) => state.cart)
  const totalInCart = useSelector((state: any) => state?.cart?.length);
  console.log("cartItems", cartItems)
  //handle checkout
  const handlecheckOut = () => {
    // console.log("token", token)
    if (!token) {
      toast.warn("Login to make an order");
      navigate("/auth/login");
      return;
    }
    if (products.length < 1) {
      toast.warn("Add products to cart");
      return;
    }
    else if (address === "") {
      toast.warn("Please enter your address");
      return;
    }
    const createOrderData = {
      products: products,
      amount: subtotal,
      totalProduct: totalQuantity,
      address,
      payMethod: "COD",
    }
    //console.log("createOrderData", createOrderData)
    CheckoutApi.confirmOrder(userId, createOrderData).then((res: any) => {
      //  console.log("res", res)
      if (res.status === 200) {
        toast.success("Order placed successfully");
        //empty the cart
        dispatch(clearCartData());
        //set product array empty
        setProducts([]);
        navigate(`/customer/orders/${userId}`);
      }
    }).catch((err: any) => {
      console.log("err", err)
    })



  };
  //deleting the product
  const handleDelete = (index: any, row: any) => {
    console.log(products[index]);
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    dispatch(deleteCartData(row));
    toast.error(`${row.name} is removed from cart`);
  };
  useEffect(() => {
    // Retrieve cart data from localStorage and set it in the component's state
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setProducts(JSON.parse(cartData));
    }
  }, []);
  useEffect(() => {
    setTotalQuantity(
      products?.reduce((acc: any, item: any) => {
        console.log("our item", item);
        return acc + item?.quantityFront;
      }, 0)
    );
    setSubTotal(
      products?.reduce((acc: any, item: any) => {
        console.log("our item", item);
        return acc + item?.price;
      }, 0)
    );
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  console.log("quantity front", products);
  //console.log("products", products)
  return (

    <Container
      sx={{ paddingTop: 2, paddingBottom: 2, backgroundColor: "white" }}
    >
      {products.length < 1 ? (
        <>
          <img
            loading="lazy"
            src={cart}
            style={{
              maxWidth: "200px",
              textAlign: "center",
              display: "flex",
              margin: "0 auto",
            }}
          ></img>
          <Typography
            variant="h6"
            textAlign={"center"}
            gutterBottom
            component="div"
          >
            Your cart is empty!
          </Typography>
          <Typography
            variant="body2"
            textAlign={"center"}
            gutterBottom
            component="div"
          >
            Looks like you haven't added any items to the cart yet. Go ahead and
            discover our range of products.
          </Typography>
        </>
      ) : (
        <>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TableContainer component={Paper}>
                <Typography variant="h4" fontWeight={"200"} padding={2}>
                  Wow! You have total {totalInCart} {totalInCart > 1 ? "items" : "item"}
                </Typography>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Product Photo</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Quantity</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products?.map((row: any, index: any) => (
                      <TableRow
                        key={row._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">
                          <img
                            style={{ maxWidth: "50px", height: "auto" }}
                            src={`${baseURL}/product/photo/${row?._id}`}
                          ></img>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>

                        <TableCell align="left">
                          <Box
                            display={"flex"}
                            sx={{ alignItems: "center", marginLeft: 2 }}
                          >
                            <IconButton
                              onClick={() => {
                                handleDec(index);
                              }}
                              disabled={row?.quantityFront < 2}
                              aria-label="previous"
                            >
                              {" "}
                              <RemoveIcon />
                            </IconButton>
                            <Box>
                              <Typography
                                sx={{ marginLeft: 2 }}
                                variant="body2"
                                gutterBottom
                                component="div"
                              >
                                {row?.quantityFront}
                              </Typography>
                            </Box>
                            <IconButton>
                              <AddIcon
                                onClick={() => {
                                  handleInc(index);
                                }}
                                aria-label="next"
                              />
                            </IconButton>
                          </Box>
                        </TableCell>

                        <TableCell align="left">৳ {row.price}</TableCell>
                        <TableCell align="left">
                          <CloseIcon
                            onClick={() => {
                              handleDelete(index, row);
                            }}
                            sx={{
                              color: "red",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box padding={2}>
                  <Typography variant="body1">
                    SubTotal: ৳ <span style={{ fontWeight: "bold" }}>{subtotal}</span>
                  </Typography>


                  <Typography variant="body1">
                    Total Quantity:{" "}
                    <span style={{ fontWeight: "bold" }}>{totalQuantity}</span>
                  </Typography>
                </Box>

              </TableContainer>
            </Grid>
            <Grid item xs={4}>
              <Box component={Paper} padding={1}>
                <Box display={"flex"} sx={{ alignItems: "center", marginBottom: 1 }}>
                  <Typography variant="body2">Delivery address</Typography>:
                  <TextField
                    value={address}
                    onChange={(e: any) => { setAddress(e.target.value) }}
                    sx={{ marginLeft: "10px" }}
                    id="outlined-multiline-flexible"
                    label="Address"
                    multiline
                    maxRows={4}
                  />
                </Box>
                <Box display={"flex"} sx={{ alignItems: "center", marginBottom: 1 }}>
                  <Typography variant="body2" style={{ marginRight: "10px" }}>Payment method: </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="female" checked control={<Radio />} label="COD" />
                      <FormControlLabel value="male" control={<Radio />} disabled label="Online" />

                    </RadioGroup>
                  </FormControl>
                </Box>
                <Button
                  onClick={() => {
                    handlecheckOut();
                  }}

                  style={{
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",


                  }}
                >
                  Order Now
                </Button>
              </Box>
            </Grid>

          </Grid>



        </>
      )}

      {/* handling modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <DropIn
                        options={{ authorization: usertoken }}
                        onInstance={(instance) => (this.instance = instance)
                        }
                    /> */}
        </Box>
      </Modal>
    </Container>
  );
}
