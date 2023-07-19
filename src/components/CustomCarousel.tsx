import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Container } from '@mui/material'
import caroImg1 from "../media/caro.jpg"
import caroImg2 from "../media/caro1.jpg"
import caroImg3 from "../media/caro2.jpg"
const CustomCarousel = ({ duration }: { duration: any }) => {
    const items = [
        {
            img: caroImg1
        },
        {
            img: caroImg2
        },
        {
            img: caroImg3
        },


    ];
    const Item = ({ img }: { img: any }) => {
        return (
            <Paper sx={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", marginTop: "10px" }}>
                <img src={img} alt="carousel" style={{ width: "100%", height: "100%" }} />
            </Paper>
        );
    };

    return (

        <Carousel duration={1000} swipe={true} animation='slide'>
            {items.map((item, i) => (
                <Item key={i} {...item} />
            ))}
        </Carousel>

    );
}



export default CustomCarousel;