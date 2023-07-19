import * as Yup from 'yup';

const phoneRegExp = /^(?:\+?88)?01[3-9]\d{8}$/;
export const singUpSchema = Yup.object({
    name: Yup.string().min(2).max(30).required("Name is required"),
    phone: Yup.string()
        .matches(phoneRegExp, "Invalid phone number")
        .required("Phone is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).max(20).required("Password is required"),
})
export const singInSchema = Yup.object({

    phone: Yup.string()
        .matches(phoneRegExp, "Invalid phone number")
        .required("Phone is required"),
    password: Yup.string().min(6).max(20).required("Password is required"),
})