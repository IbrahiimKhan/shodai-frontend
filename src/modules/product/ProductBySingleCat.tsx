import { Container, Typography, Box, Paper } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'

const ProductBySingleCat = () => {
    const { categoryId } = useParams()
    const { categoryName } = useParams()
    // console.log("categoryId", categoryId)
    return (
        <Container>
            <Typography marginY={3} variant='h4' fontWeight={"light"}>{categoryName}</Typography>
            <ProductCard productId={categoryId} noOfColumn={6} noOfProd={25} offset={0} view={undefined} />
        </Container>

    )
}

export default ProductBySingleCat