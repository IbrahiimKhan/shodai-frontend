import React from 'react'
import { Container, Grid } from '@mui/material'; // Grid version 2
import Navbar from '../components/Navbar';
import CustomCarousel from '../components/CustomCarousel';
import SectionHead from '../components/SectionHead';
import CategoriesCard from '../components/CategoriesCard';
import ProductCard from '../components/ProductCard';
const Home = () => {


    return (
        <Container   >


            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <CustomCarousel duration={100} />
                </Grid>
                <Grid item xs={6}>
                    <CustomCarousel duration={100} />
                </Grid>

            </Grid>



            <SectionHead title="Categories" btnText="all categorie" />
            <CategoriesCard />
            <SectionHead title="Motor Bike" btnText="all Motorbikes" />
            <ProductCard offset={0} noOfProd={12} noOfColumn={6} productId={"649ae3b9bc3556e9808e9b73"} view={undefined} />

            <SectionHead title="Bicycle" btnText="all Bicycles" />
            <ProductCard offset={0} noOfProd={12} noOfColumn={6} productId={"649b0be8bc3556e9808eefa0"} view={undefined} />
        </Container >
    )
}

export default Home