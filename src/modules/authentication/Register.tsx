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
import { singUpSchema } from '../../schemas/Index';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import AuthenticationApi from '../../api/AuthenticationApi';
export default function Register() {
    //formik to handle form
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        password: "",

    }

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: singUpSchema,
        onSubmit: async (values) => {
            try {
                const res = await AuthenticationApi.usrSignup(values);
                toast.success(res?.data?.message, { theme: "dark" });
                console.log(res?.data?.message);

            } catch (err: any) {
                toast.error(err?.response?.data?.error, { theme: "dark" });
            }
        }

    });
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        let size = Object.keys(errors).length;
        if (size > 0) {
            toast.error(`${errors.name ? errors.name : errors.phone ? errors.phone : errors.email ? errors.email : errors.password ? errors.password : ""}`);
            return;
        }

        handleSubmit(e);
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <div className='form wrapper'>
                <Typography variant="h6" gutterBottom component="div" style={{ textAlign: "center" }}>Create Your Shodai Account</Typography>
                <Typography variant="body2" style={{ marginBottom: "10px", marginTop: "20px" }} gutterBottom component="div">Name</Typography>
                <TextField
                    style={{ width: "100%", color: "#000000b3" }}
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Ex: John Doe"
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}

                />
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
                <Typography variant="body2" style={{ marginBottom: "10px", marginTop: "20px" }} gutterBottom component="div">Email</Typography>
                <TextField
                    style={{ width: "100%", color: "#000000b3" }}
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="ex@gmail.com"
                    name='email'
                    value={values.email}
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

                    >Register</Button>

                    <Typography variant="body2" style={{ marginBottom: "10px", marginTop: "20px" }} gutterBottom component="div">Already have an account? <Link style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to={"/auth/login"}>Sign In</Link></Typography>
                </Box>

            </div>
        </form>

    );
}