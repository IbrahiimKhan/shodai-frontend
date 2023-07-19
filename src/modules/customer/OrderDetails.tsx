
import { Container, Box, Typography, Tabs, Tab, Paper, Chip } from '@mui/material'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { TabContext, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import AuthenticationApi from '../../api/AuthenticationApi';
import { useDispatch, useSelector } from 'react-redux';
import OrderApi from '../../api/OrderApi';
import moment from 'moment';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const OrderDetails = () => {
    const navigate = useNavigate()
    const [order, setOrder] = useState<any>([]);
    const userId = useSelector((state: any) => state.userInfo._id)
    const user = useSelector((state: any) => state.userInfo)
    const [filteredOrder, setFilteredOrder] = useState<any>([])
    const baseUrl = process.env.REACT_APP_API_URL;
    // console.log(baseUrl, "baseURL")
    const desiredOrderId = useParams().id
    //console.log(desiredOrderId, "desiredOrderId")
    //handle single order
    const handleSingleOrder = (item: any) => {
        navigate(`/customer/order/${item.orderId}`)
    }
    const getOrders = () => {
        //console.log("hi")
        OrderApi.getSingleUserOrders(userId).then((res: any) => {
            // console.log("res", res?.data.orders)
            const desiredOrder = res.data.orders.filter((item: any) => item.orderId == desiredOrderId)
            setFilteredOrder(desiredOrder)
            desiredOrder.map((item: any) => {
                setOrder(item.products)
            })
            // setOrder(desiredOrder)
        }).catch((err: any) => {
            // console.log("error", err)
        })
    }
    const columns: GridColDef[] = [
        {
            field: "photo",
            headerName: "Photo",

            renderCell: (params: any) => {
                const prodId = params.row._id;
                const photoUrl = `${baseUrl}/product/photo/${prodId}`; // Assuming baseURL is defined as the base URL of your API
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

    useEffect(() => {
        getOrders()
    }, [desiredOrderId])
    console.log(order, "order")
    return (
        <>

            <Container>
                <Box margin={2} display={"flex"} justifyContent={"space-between"} marginLeft={"auto"} marginRight={"auto"} padding={2} sx={{ backgroundColor: "white", maxWidth: "900px" }}>
                    <Paper sx={{ padding: 2, mb: 2 }}>
                        {
                            filteredOrder.map((item: any) => {
                                return (<>
                                    <Typography variant="h5" sx={{ fontWeight: "light" }}>Order #{item?.orderId} Details</Typography>
                                    <Typography variant="caption">{moment(item.createdAt).format("YYYY-MM-DD")} {moment(item.createdAt).format("dddd")}</Typography>
                                    <Box marginY={1}>
                                        <Chip label={item?.orderStatus[0].status} sx={{ marginRight: 1 }} />
                                        <Chip label={item?.payMethod} />

                                    </Box>
                                    <Box marginY={1}>
                                        <Typography variant="body2">{item.user.name}</Typography>
                                    </Box>
                                    <Box marginY={1}>
                                        <Typography variant="body2"> {item?.address}</Typography>
                                    </Box>
                                    <Box marginY={1} display={""}>
                                        <Typography variant="body2" marginY={1} sx={{ marginRight: "10px" }}> {user.phone}</Typography>
                                        <Typography variant="body2"> {user.email}</Typography>
                                    </Box>
                                </>)
                            })
                        }

                    </Paper>
                    <Paper sx={{ padding: 2, mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "light" }}>All Products</Typography>
                        <Box sx={{ textAlign: "end" }}>
                            <DataGrid
                                rows={order}
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
                        {
                            filteredOrder.map((item: any) => {
                                return (
                                    <>
                                        <Box textAlign={"right"} mt={1}>
                                            <Typography variant="body1" sx={{ fontWeight: "500" }}>Subtotal: <span>{item.amount}TK.</span></Typography>
                                            {/* <Typography variant="h6" sx={{ fontWeight: "400" }}>Shipping: <span>{orderInformation.shipping}</span></Typography> */}
                                        </Box>
                                    </>
                                )
                            })
                        }

                    </Paper>
                </Box>
            </Container>

        </>
    );

}

export default OrderDetails