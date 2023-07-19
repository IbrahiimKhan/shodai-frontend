
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
import { useNavigate, useNavigation } from 'react-router-dom';
const OrderCard = ({ order, status }: { order: any, status: any }) => {
    const navigate = useNavigate()
    //handle single order
    const handleSingleOrder = (item: any) => {
        navigate(`/customer/order/${item.orderId}`);
    };

    // Filter orders that match the status
    const filteredOrders = order.filter((item: any) => item.orderStatus[0].status === status);

    if (filteredOrders.length === 0) {
        return <Typography variant='h6' fontWeight={"500"} marginTop={1} marginBottom={1}>0 Order Found</Typography>;
    }
    return (
        <>
            {filteredOrders.map((item: any) => (
                <div key={item.orderId}>
                    <Paper
                        onClick={() => { handleSingleOrder(item); }}
                        sx={{ padding: 2, marginBottom: 1, display: "flex", cursor: "pointer", alignItems: "center", justifyContent: "space-between", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" }}
                    >
                        <Box>
                            <Box display={"flex"}>
                                <Typography variant='h5' fontWeight={"light"}>#{item.orderId}</Typography>
                                <Chip sx={{ marginLeft: 1, marginRight: 1 }} label={`${item.orderStatus[0].status}`} />
                                <Chip label={`${item.payMethod}`} />
                            </Box>
                            <Typography variant='h6' fontWeight={"300"} marginTop={1} marginBottom={1}>
                                {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')} {moment(item.createdAt).format("dddd")}
                            </Typography>
                            <Box display={"flex"}>
                                <Typography variant='h6' fontWeight={"light"}>{item.totalProduct} Products</Typography>
                            </Box>
                        </Box>
                        <Box display={"flex"} marginTop={1}>
                            <Typography variant='h6' fontWeight={"500"} marginTop={1} marginBottom={1}>৳{item.amount}</Typography>
                        </Box>
                    </Paper>
                </div>
            ))}
        </>
    );
};

export default OrderCard;