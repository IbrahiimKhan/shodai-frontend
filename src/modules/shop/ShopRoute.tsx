import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shop from '../../pages/Shop'
import Error404 from '../../components/Error404'


const AuthRoute = () => {
    return (
        < Routes>

            <Route path="/shop" element={<Shop />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}

export default AuthRoute