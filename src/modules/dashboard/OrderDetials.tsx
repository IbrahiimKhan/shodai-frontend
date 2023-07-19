import * as React from "react";
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import ProductApi from "../../api/ProductApi";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import OrderApi from "../../api/OrderApi";
import man from "../../media/noorder.gif"
import { setOrdersData } from "../../store/slices/orderSlice";
import AuthenticationApi from "../../api/AuthenticationApi";
import moment from "moment";

const OrderDetails = () => {
    const user = useSelector((state: any) => state.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderInformation = useSelector((state: any) => state.order);
    const date: string = orderInformation.createdAt.split("T").join(" ");
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const baseUrl = process.env.REACT_APP_API_URL
    // const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`;
    // console.log(orderInformation, "orderInformation")
    const columns: GridColDef[] = [
        {
            field: "photo",
            headerName: "Photo",

            renderCell: (params: any) => {
                const prodId = params.row._id;
                const photoUrl = `${baseURL}/product/photo/${prodId}`; // Assuming baseURL is defined as the base URL of your API
                return (
                    <img
                        src={photoUrl}
                        alt="Product"
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%", padding: 1, margin: 1 }}
                    />
                );
            },
        },
        {
            field: "name",
            headerName: "Name ",

            renderCell: (params: any) => {
                const name: string = params.value
                return (
                    <Typography>
                        {name}
                    </Typography>
                );
            },
        },
        {
            field: "total",
            headerName: "Cost",
            valueGetter: (params: any) => {
                const cost: number = Number(params.row.price);
                const quantity: number = Number(params.row.quantityFront);
                return cost / quantity;
            },
            renderCell: (params: any) => {
                const total: number = Number(params.value);
                return (
                    <Typography>
                        {total} TK.
                    </Typography>
                );
            },
        },

        {
            field: "quantityFront",
            headerName: "Quantity",
            renderCell: (params: any) => {
                const quantity: string = params.value
                return (
                    <Typography>
                        {quantity}
                    </Typography>
                );
            },
        },
        {
            field: "price",
            headerName: "Total",
            renderCell: (params: any) => {
                const cost: string = params.value
                return (
                    <Typography>
                        {cost} TK.
                    </Typography>
                );
            },
        },



    ];
    const [orders, setorders] = useState<any>([]);
    const [offset, setOffset] = useState<any>(0);
    const [orderBy, setOrderBy] = useState<any>({});
    const [status, setStatus] = useState<any>(orderInformation.orderStatus[0].status);
    const baseURL = process.env.REACT_APP_API_URL;
    //get all product
    const getAllOrders = () => {
        OrderApi.getallOrders(user?._id)
            .then((response: any) => {
                //   console.log(response.data?.orders);
                setorders(response?.data?.orders);
                // dispatch(setordersData(response?.data?.data))
            })
            .catch((error: any) => {
                // console.log(error);
            });
    };
    //handle row click
    const handleRowClick = (params: any) => {
        dispatch(setOrdersData(params))
        // console.log(params);

        navigate(`/dashboard/admin/order/${params._id}`);
    }
    //hande order update
    const handleOrderUpdate = (e: any) => {
        e.preventDefault();
        const data = {
            orderId: orderInformation.orderId,
            status: status
        }
        OrderApi.updateOrder(orderInformation._id, user._id, status).then((response: any) => {
            //console.log(response.data?.data);
            toast.success(response.data?.message);
            navigate("/dashboard/admin/orders");
            getAllOrders();

        }).catch((error: any) => {
            console.log(error);
        })
    }
    //get user who purchased the product
    const getUser = () => {
        AuthenticationApi.getUserInfo(user._id, orderInformation.user._id).then((response: any) => {
            console.log(response.data?.data);
            const user = response.data?.data;
            setOrderBy(user);
        }).catch((error: any) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getAllOrders();
        getUser()
    }, []);


    return (
        <Container>
            <Grid container spacing={2} sx={{}}>
                <Grid xs={2} md={2}>
                    <SideBar userProfile={user.id} getmenu={""} />
                </Grid>
                <Grid sx={{ borderRadius: 0 }} xs={10} py={5} pl={2} md={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Paper sx={{ padding: 2, mb: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: "light" }}>Order #{orderInformation?.orderId} Details</Typography>
                                <Typography variant="caption">Payment Via {orderInformation?.payMethod} Paid on {moment(orderInformation.createdAt).format("YYYY-MM-DD")} {moment(orderInformation.createdAt).format("dddd")}</Typography>
                                <Box marginY={1}>
                                    <Typography variant="body2">Order Status: {orderInformation?.orderStatus[0].status}</Typography>
                                </Box>
                                <Box marginY={1}>
                                    <Typography variant="body2">Customer Name: {orderInformation.user.name}</Typography>
                                </Box>
                                <Box marginY={1}>
                                    <Typography variant="body2">Customer Address: {orderInformation?.address}</Typography>
                                </Box>
                                <Box marginY={1} display={"flex"}>
                                    <Typography variant="body2" sx={{ marginRight: "10px" }}>Customer Phone: {orderBy.phone}</Typography>
                                    <Typography variant="body2">Customer Email: {orderBy.email}</Typography>
                                </Box>

                            </Paper>
                            <Paper sx={{ padding: 2, mb: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: "light" }}>Items</Typography>
                                <Box sx={{ textAlign: "end" }}>
                                    <DataGrid
                                        rows={orderInformation?.products}
                                        getRowId={(row) => row._id}

                                        columns={columns}

                                        hideFooterPagination
                                        hideFooterSelectedRowCount
                                        hideFooter
                                        rowBuffer={0}
                                        columnBuffer={0}
                                        sx={{
                                            "& .MuiDataGrid-root": {
                                                justifyContent: "flex-end",
                                                textAlign: "end",
                                                display: "flex"
                                            },
                                        }}


                                    />
                                </Box>
                                <Box textAlign={"right"} mt={1}>
                                    <Typography marginRight={6} variant="body1" sx={{ fontWeight: "400" }}>Subtotal: <span>{orderInformation.amount}TK.</span></Typography>
                                    {/* <Typography variant="h6" sx={{ fontWeight: "400" }}>Shipping: <span>{orderInformation.shipping}</span></Typography> */}
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={{ padding: 2, mb: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: "light" }}>Action</Typography>
                                <Box marginTop={1}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Change order Status</FormLabel>
                                        <RadioGroup
                                            onChange={(e: any) => setStatus(e.target.value)}
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel checked={status.toLowerCase() === "pending"} value="Pending" control={<Radio />} label="Pending" />
                                            <FormControlLabel checked={status.toLowerCase() === "processing"} value="Processing" control={<Radio />} label="Processing" />
                                            <FormControlLabel checked={status.toLowerCase() === "completed"} value="Completed" control={<Radio />} label="Completed" />
                                            <FormControlLabel checked={status.toLowerCase() === "delivered"} value="Delivered" control={<Radio />} label="Delivered" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Button

                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                        marginTop: 1,
                                        ":hover": { backgroundColor: "black", color: "white" },
                                    }}
                                    onClick={(e: any) => handleOrderUpdate(e)}
                                    style={{ marginRight: 8 }}
                                >
                                    Update Order
                                </Button>
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    );
}


export default OrderDetails;