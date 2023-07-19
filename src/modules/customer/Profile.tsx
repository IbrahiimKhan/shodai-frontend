import { Container, Box, Button, FormControl, TextField, Typography, Paper } from '@mui/material'
import React, { useEffect, useState, useRef, } from 'react'
import { useDispatch, useSelector } from 'react-redux'


//get user information


const Profile = () => {
    //user user information
    const user = useSelector((state: any) => state.userInfo)
    const dispatch = useDispatch()
    //setting states
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    //get orders
    return (
        <Container
            sx={{ minHeight: "80vh" }}
        >

            <Box margin={2} padding={2} sx={{ backgroundColor: "white" }}>
                <Box sx={{ display: 'flex', }} mb={2}>
                    <TextField value={name} id="outlined-basic" sx={{ marginRight: 2, width: "100%" }} label="Name" variant="outlined" />
                    <TextField value={phone} id="outlined-basic" label="Phone" sx={{ width: "100%", marginRight: 2 }} variant="outlined" />
                    <TextField value={email} id="outlined-basic" label="Email" sx={{ width: "100%" }} variant="outlined" />
                </Box>


            </Box>


        </Container>
    )
}

export default Profile