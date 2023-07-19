import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Error404 from '../../components/Error404'
import Auth from '../../pages/Auth'
import Register from './Register'

const AuthRoute = () => {
    return (
        < Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}

export default AuthRoute