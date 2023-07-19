import React, { useEffect, useState } from 'react'
import CustomCarousel from '../components/CustomCarousel'
import { Box, Checkbox, Container, Grid, Slider, Typography } from '@mui/material'
import CategoryApi from '../api/CategoryApi'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux';

const Shop = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [categories, setCategories] = useState<any>([]);
    const [value, setValue] = React.useState<number[]>([20, 37]);
    const [checkboxes, setCheckboxes] = useState<any>([])
    const [products, setProducts] = useState<any>([])
    const [offset, setOffset] = useState<number>(0)
    const storedProducts = useSelector((state: any) => state.products)
    console.log(storedProducts, "storedProducts")
    const [id, setId] = useState<any>("All")
    // handling change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, categoryId: any) => {
        let updatedCheckList = [...checkboxes]
        if (event.target.checked) {
            updatedCheckList.push(categoryId)

        } else {
            updatedCheckList.splice(updatedCheckList.indexOf(categoryId), 1)
            if (updatedCheckList.length === 0) {
                setId("All")
            }
        }
        setCheckboxes(updatedCheckList)
    };

    //get all category list
    const categoryList = () => {
        CategoryApi.getCategoryList()
            .then((response: any) => {
                //  console.log(response.data?.categories);
                setCategories(response?.data?.categories);
            })
            .catch((error: any) => {
                //  console.log(error);
            });
    };

    //chanage price

    function valuetext(value: number) {
        return `${value}`;
    }
    const handleChangePrice = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    //handling next
    const handleNext = () => {
        setOffset(offset + 25)
    }
    //handling prev
    const handlePrev = () => { }
    //console.log(checkboxes[0], "checkboxes")
    useEffect(() => {
        categoryList();
    }, []);
    useEffect(() => {
        setProducts((prev: any) => [...prev, ...storedProducts])
    }, [])


    return (
        <>
            <Container>
                <Typography variant='h4' marginTop={1} marginBottom={1} fontWeight={300}>
                    Shop
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <CustomCarousel duration={700} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <CustomCarousel duration={900} />
                    </Grid>
                    {/* main section */}
                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                        <div>
                            <Typography variant='h6'>Categories</Typography>
                            {categories?.map((category: any) => {
                                if (category.name === "Motor bike" || category.name === "cycle" || category.name === "laptop" || category.name === "Car") {
                                    return (
                                        <Box key={category._id} sx={{ display: "flex", alignItems: "center" }}>
                                            <Checkbox
                                                checked={checkboxes.includes(category?._id)}
                                                style={{ color: 'black' }}
                                                onChange={(e) => handleChange(e, category?._id)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <Typography variant='body2' style={{ textTransform: "capitalize" }}>{category.name}</Typography>
                                        </Box>
                                    );
                                } else {
                                    return null; // Skip rendering other categories
                                }
                            })}
                            {/* <Typography variant='h6'>Filter by Price</Typography>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={value}
                                sx={{ color: 'black', marginRight: 4 }}
                                onChange={handleChangePrice}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                            /> */}
                        </div>


                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                        {/* <ProductCard productId={"All"} noOfColumn={4} /> */}
                        <ProductCard
                            view={"eye"}
                            offset={offset} productId={checkboxes.length > 0 ? checkboxes : id} noOfColumn={4} noOfProd={20} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <Typography variant='body2' sx={{ marginRight: 2 }}>Total  {storedProducts?.length} Products</Typography>
                            <Box>
                                <ArrowBackIosNewIcon
                                    onClick={() => {
                                        handlePrev()
                                    }}
                                    fontSize='small' sx={{ marginRight: 2, cursor: "pointer" }} />
                                <ArrowForwardIosIcon
                                    onClick={() => {
                                        handleNext()
                                    }}

                                    fontSize='small' sx={{ cursor: "pointer" }} />
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Shop