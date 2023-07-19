import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import CategoryApi from '../api/CategoryApi';
import { useNavigate } from 'react-router-dom';
export default function CategoriesCard() {
  const [categories, setCategories] = useState<any>([]);
  const navigate = useNavigate()

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

  useEffect(() => {
    categoryList();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)', // Display items in six columns
        gap: 2, // Add gap between columns
        marginTop: 5,
        marginBottom: 5,
        bgcolor: 'transparent',
        cursor: "pointer",
        paddingBottom: 2,
        borderRadius: 1,
        overflow: 'auto', // Enable vertical scrolling if items exceed window height


      }}
    >
      {categories?.slice(0, 12)?.map((category: any, index: any) => (
        <Card
          onClick={() => {
            navigate(`/product/all/${category?._id}/${category?.name}`)
          }}
          sx={{ height: 70, alignItems: "center", justifyContent: "center", display: "flex", boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px" }} key={index}>
          <CardContent sx={{

          }}>
            <Typography variant='h6' component="h6" sx={{ fontSize: 15, fontWeight: "600", textTransform: "capitalize", cursor: "pointer" }} color="text.secondary" gutterBottom>
              {category?.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
