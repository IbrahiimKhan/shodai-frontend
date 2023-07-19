import { Container, Box, Typography, Tabs, Tab, Paper, Chip } from '@mui/material'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { TabContext, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import AuthenticationApi from '../../api/AuthenticationApi';
import { useSelector } from 'react-redux';
import OrderApi from '../../api/OrderApi';
import moment from 'moment';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import "../dashboard/dashboard.css"
import OrderCard from './OrderCard';
const Order = () => {
    const [order, setOrder] = useState<any>([]);
    const [value, setValue] = React.useState("Pending");
    const userId = useSelector((state: any) => state.userInfo._id)
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    //get user information
    const getOrders = () => {
        // console.log("hi")
        OrderApi.getSingleUserOrders(userId).then((res: any) => {
            // console.log("res", res?.data)
            setOrder(res.data.orders)
        }).catch((err: any) => {
            // console.log("error", err)
        })
    }

    useEffect(() => {
        getOrders()
    }, [])
    console.log("order", order)
    return (
        <TabContext value={value} >
            <Container sx={{ minHeight: "80vh" }}>
                <Box margin={2} marginLeft={"auto"} marginRight={"auto"} padding={2} sx={{ backgroundColor: "white", maxWidth: "600px" }}>
                    <Typography variant='h4' fontWeight={"lighter"} margin={1}>Orders</Typography>

                    <Tabs
                        sx={{ marginBottom: 0, paddingBottom: 0, backgroundColor: "white", color: "black" }}
                        TabIndicatorProps={{
                            style: { display: 'none' }
                        }}

                        value={value}
                        onChange={handleChange}
                        aria-label="icon position tabs example"
                    >
                        <Tab
                            sx={{ fontSize: 12, padding: 0, minHeight: "30px", textAlign: "center", display: "flex", alignItems: "center", height: "5px", color: "black", borderRadius: "10px 10px 10px 10px", borderBottom: "0", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", marginLeft: "10px", marginRight: "10px", paddingLeft: "5", paddingRight: "5" }}
                            color='secondary'
                            // icon={<CancelIcon />}
                            value={"Pending"}
                            autoCapitalize='false'

                            iconPosition="start"
                            label="Pending"
                        />
                        <Tab
                            sx={{ fontSize: 12, padding: 0, minHeight: "30px", textAlign: "center", display: "flex", alignItems: "center", height: "5px", color: "black", borderRadius: "10px 10px 10px 10px", borderBottom: "0", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", marginLeft: "10px", marginRight: "10px", paddingLeft: "5", paddingRight: "5" }}


                            color='black'

                            value={"Processing"}
                            iconPosition="start"
                            label="Processing"
                        />
                        <Tab
                            sx={{ fontSize: 12, padding: 0, minHeight: "30px", textAlign: "center", display: "flex", alignItems: "center", height: "5px", color: "black", borderRadius: "10px 10px 10px 10px", borderBottom: "0", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", marginLeft: "10px", marginRight: "10px", paddingLeft: "5", paddingRight: "5" }}

                            color='black'

                            value={"Completed"}
                            iconPosition="start"
                            label="Completed"
                        />
                        <Tab
                            sx={{ fontSize: 12, padding: 0, minHeight: "30px", textAlign: "center", display: "flex", alignItems: "center", height: "5px", color: "black", borderRadius: "10px 10px 10px 10px", borderBottom: "0", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", marginLeft: "10px", marginRight: "10px", paddingLeft: "5", paddingRight: "5" }}

                            color='black'
                            value={"Delivered"}
                            iconPosition="start"
                            label="Delivered"
                        />
                        <Tab
                            sx={{ fontSize: 12, padding: 0, minHeight: "30px", textAlign: "center", display: "flex", alignItems: "center", height: "5px", color: "black", borderRadius: "10px 10px 10px 10px", borderBottom: "0", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", marginLeft: "10px", marginRight: "10px", paddingLeft: "5", paddingRight: "5" }}

                            color='black'

                            value={"Cancelled"}
                            iconPosition="start"
                            label="Cancelled"
                        />
                    </Tabs>

                    <TabPanel value="Pending">
                        <OrderCard order={order}
                            status="Pending"
                        />

                    </TabPanel>
                    <TabPanel value="Processing">
                        <OrderCard
                            status={"Processing"}
                            order={order}
                        />
                    </TabPanel>
                    <TabPanel value="Completed">
                        <OrderCard order={order} status={"Completed"} />
                    </TabPanel>
                    <TabPanel value="Delivered">
                        <OrderCard order={order} status={"Delivered"} />
                    </TabPanel>

                    <TabPanel value="Cancelled">
                        <OrderCard order={order} status={"Cancelled"} />
                    </TabPanel>
                </Box>
            </Container>
        </TabContext>
    )
}

export default Order;
