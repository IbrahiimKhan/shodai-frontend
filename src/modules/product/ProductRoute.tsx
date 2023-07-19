import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Product from '../../pages/Product'
import Error404 from '../../components/Error404'
import ProductBySingleCat from './ProductBySingleCat'
const AuthRoute = () => {
    return (
        < Routes>

            <Route path="/single/:porductId" element={<Product />} />
            <Route path="/all/:categoryId/:categoryName" element={<ProductBySingleCat />} />

            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}

export default AuthRoute