import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import ProductApi from "../../api/ProductApi";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";


export default function () {
  const user = useSelector((state: any) => state.userInfo);

  // console.log("userid", user?.id)
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "photo",
      headerName: "Photo",

      renderCell: (params: GridCellParams) => {
        const prodId = params.row._id;
        const photoUrl = `${baseURL}/product/photo/${prodId}`; // Assuming baseURL is defined as the base URL of your API
        return (
          <img
            src={photoUrl}
            alt="Product"
            width={50}
            height={50}
            style={{ borderRadius: "50%", padding: 1, margin: 1 }}
          />
        );
      },
    },
    { field: "name", headerName: "name", width: 280 },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    {
      field: "category",
      headerName: "Category",

      valueGetter: (params: GridValueGetterParams) =>
        params.row.category ? params.row.category.name : "",
    },
    { field: "sold", headerName: "Sold" },
    // { field: "createdAt", headerName: "Created At" },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const handleDelete = () => {
          const productId = params.row._id;
          ProductApi.deleteSingleProduct(user?._id, productId)
            .then((res: any) => {
              toast.success("Product deleted successfully");
              getAllProduct();
            })
            .catch((err: any) => {
              console.log(err);
            });
        };

        const handleUpdate = () => {
          const productId = params.row._id;
          navigate(`/dashboard/admin/product/view/${productId}`);

        };

        return (
          <>

            <DeleteForeverIcon

              onClick={handleDelete}
              style={{ marginRight: 8 }}
              sx={{
                color: "black", cursor: "pointer"
              }}
            />
            <VisibilityIcon

              onClick={handleUpdate}
            />


          </>
        );
      },
    },
  ];
  const [products, setProducts] = useState<any>([]);
  const [offset, setOffset] = useState<any>(0);
  const baseURL = process.env.REACT_APP_API_URL;
  //get all product
  const getAllProduct = () => {
    ProductApi.getProductList(offset)
      .then((response: any) => {
        //console.log(response.data);
        setProducts(response?.data?.data);
        // dispatch(setProductsData(response?.data?.data))
      })
      .catch((error: any) => {
        // console.log(error);
      });
  };
  useEffect(() => {
    getAllProduct();
  }, [offset]);
  console.log("products", products);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={2} md={2}>
          <SideBar userProfile={user.id} getmenu={""} />
        </Grid>
        <Grid sx={{ borderRadius: 0 }} xs={10} py={5} pl={2} md={10}>
          <div style={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center" }} my={1}>
              <Typography variant="h6" marginRight={1} fontWeight={"bold"}>
                Product List
              </Typography>
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  ":hover": { backgroundColor: "black", color: "white" },
                }}
                onClick={() => {
                  navigate("/dashboard/admin/product/create");
                }}
                style={{ marginRight: 8 }}
              >
                Add Product
              </Button>
            </Box>
            <DataGrid
              rows={products}
              getRowId={(row) => row._id}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick


            // checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </Container>

  );
}
