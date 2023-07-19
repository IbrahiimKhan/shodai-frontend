import * as React from "react";
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import ProductApi from "../../api/ProductApi";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import OrderApi from "../../api/OrderApi";
import man from "../../media/noorder.gif"
import { setOrdersData } from "../../store/slices/orderSlice";
import { get } from "http";
import "./dashboard.css"

const OrderList = () => {
    const user = useSelector((state: any) => state.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const columns: GridColDef[] = [
        {

            field: "orderId",
            headerName: "Order Id",
            flex: 1,

            renderCell: (params: any) => {
                const orderId: string = params.value;
                console.log(orderId, "all order id")
                // console.log(orderId, "orderId")

                return (
                    <Typography>
                        {orderId}
                    </Typography>
                );
            },
        },
        {

            field: "user",
            headerName: "Customer Name",
            flex: 1,


            renderCell: (params: any) => {
                const name: string = params.value.name;


                return (
                    <Typography>
                        {name}
                    </Typography>
                );
            },
        },
        {

            field: "createdAt",
            headerName: "Date",
            flex: 1,
            renderCell: (params: any) => {
                const date: string = params.value.split("T").join(" ");
                const dateObj = new Date(date);
                const hours = dateObj.getHours();
                const minutes = dateObj.getMinutes();
                const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`;


                return (
                    <Typography>
                        {date.slice(0, date.indexOf(" "))} <small>{formattedTime}</small>
                    </Typography>
                );
            },
        },
        {

            field: "orderStatus",
            headerName: "Status",
            flex: 1,

            renderCell: (params: any) => {
                const status: string = params.value[0].status;


                return (
                    <Typography>
                        {status}
                    </Typography>
                );
            },
        },
        {

            field: "payMethod",
            headerName: "Payment Method",
            flex: 1,

            renderCell: (params: any) => {
                const mode: string = params.value


                return (
                    <Typography>
                        {mode}
                    </Typography>
                );
            },
        },
        {

            field: "address",
            headerName: "Billing",
            flex: 1,


            renderCell: (params: any) => {
                const billing: string = params.value


                return (
                    <Typography>
                        {billing}
                    </Typography>
                );
            },
        },
        {

            field: "totalProduct",
            headerName: "Purchased",
            flex: 1,

            renderCell: (params: any) => {
                const purchased: string = params.value


                return (
                    <Typography>
                        {purchased} items
                    </Typography>
                );
            },
        },
        {

            field: "amount",
            headerName: "Total Amount",
            flex: 1,

            renderCell: (params: any) => {
                const total: string = params.value;
                // console.log(, "all order id")
                // console.log(orderId, "orderId")

                return (
                    <Typography>
                        {total} Tk.
                    </Typography>
                );
            },
        },

    ];
    const [orders, setorders] = useState<any>([]);
    const [offset, setOffset] = useState<any>(0);
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
    useEffect(() => {
        getAllOrders();
    }, []);
    console.log("orders", orders);
    // console.log("user", user)
    //giving raw style
    const getRowClassName = (params: any) => {
        return "custom-row";
    };
    return (
        <Container>
            <Grid container spacing={2} sx={{ backgroundColor: "white", textAlign: "center" }}>
                <Grid xs={2} md={2}>
                    <SideBar userProfile={user.id} getmenu={""} />
                </Grid>
                <Grid sx={{ borderRadius: 0 }} xs={10} py={5} pl={2} md={10}>
                    <div style={{ width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }} my={1}>
                            <Typography variant="h6" marginRight={1} fontWeight={"bold"}>
                                Order List
                            </Typography>

                        </Box>
                        {orders?.length < 1 ? (<>
                            <img src={man} alt="no order" style={{ width: "50%", height: "100%" }} />
                            <Typography variant="h4">No Order Found</Typography>
                        </>) : (
                            <DataGrid
                                // sx={{ cursor: "pointer" }}
                                rows={orders}
                                getRowId={(row) => row._id}
                                // columnBuffer={0}
                                onRowClick={(params: any) => handleRowClick(params.row)}
                                getRowClassName={getRowClassName}
                                columns={columns}
                                columnBuffer={0}

                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                hideFooterSelectedRowCount={true}
                                density="comfortable"
                            // checkboxSelection
                            />
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>

    );
}


export default OrderList;