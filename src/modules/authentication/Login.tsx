import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import "./style.css"
import { useFormik } from 'formik';
import { singInSchema } from '../../schemas/Index';
import AuthenticationApi from '../../api/AuthenticationApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { setUserInfo } from '../../store/slices/userInfoSlice';
export default function Register() {
    //get the token
    const token = useSelector((state: any) => state.auth.token);
    const navigate = useNavigate()
    //dispatch
    const dispatch = useDispatch();
    //formik to handle form
    const initialValues = {
        phone: "",
        password: "",

    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: singInSchema,
        onSubmit: (values) => {
            // Handle form submission


            AuthenticationApi.usrLogin(values).then((res: any) => {
                toast.success(res?.data?.message, { theme: "dark" })
                // console.log(res?.data?.token)
                // localStorage.setItem("token", res?.data?.token)
                // const token = localStorage.getItem("token")
                // console.log(token, "token from local storage")
                dispatch(setToken(res?.data?.token))
                dispatch(setUserInfo(res?.data?.data))
                // navigate("/")
            }).catch((err: any) => {
                toast.error(err?.response?.data?.message)
                //   console.log("error", err?.response?.data?.message)
            })

        },
    });
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        //  console.log(errors)
        let size = Object.keys(errors).length;
        if (size > 0) {
            toast.error(`${errors.phone ? errors.phone : errors.password ? errors.password : ""}`);
            return;
        }

        handleSubmit(e);
    };
    useEffect(() => {
        console.log(token)
        if (token) {
            navigate("/")
        }
    }, [token])

    return (
        <form onSubmit={handleFormSubmit}>
            <div className='form wrapper'>
                <Typography variant="h6" gutterBottom component="div" style={{ textAlign: "center" }}>Log In your Shodai account</Typography>

                <Typography variant="body2" style={{ marginBottom: "10px", marginTop: "20px" }} gutterBottom component="div">Phone</Typography>
                <TextField
                    style={{ width: "100%", color: "#000000b3" }}
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="019"
                    name='phone'
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}

                />

                <Typography variant="body2" style={{ marginBottom: "10px", marginTop: "20px" }} gutterBottom component="div">Password</Typography>
                <TextField
                    style={{ width: "100%", color: "#000000b3" }}
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="123456"
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}

                />
                <Box sx={{ marginTop: 2, marginBottom: 1, textAlign: "center" }}>
                    <Button type='submit' variant="contained"

                    >Login</Button>

                    <Typography variant="body2" style={{ marginBottom: "10px", marginTop: "20px" }} gutterBottom component="div">New User? <Link style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to={"/auth/register"}>Register</Link></Typography>
                </Box>

            </div>
        </form>

    );
}