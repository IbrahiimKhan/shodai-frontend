import * as React from "react";
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import ProductApi from "../../api/ProductApi";
import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography, Modal, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import OrderApi from "../../api/OrderApi";
import man from "../../media/noorder.gif"
// import { setOrdersData } from "../../store/slices/orderSlice";
import { get } from "http";
import "./dashboard.css"
import CategoryApi from "../../api/CategoryApi";

const CategoryList = () => {
    const user = useSelector((state: any) => state.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const columns: GridColDef[] = [
        {

            field: "_id",
            headerName: "Category Id",
            flex: 1,
            headerClassName: "super-app-theme--header",

        },

        {

            field: "name",
            headerName: "Category Name",
            flex: 1,
        },
        {

            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params: GridCellParams) => {
                const handleDelete = () => {
                    const categoryId = params.row._id;
                    //  console.log("category id", categoryId)
                    CategoryApi.deleteCategory(user?._id, categoryId)
                        .then((res: any) => {
                            toast.success("Category deleted successfully");
                            getAllCategory()
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
                            style={{ marginRight: 20 }}
                            sx={{
                                color: "black", cursor: "pointer"
                            }}
                        />
                        <VisibilityIcon

                        // onClick={handleUpdate}
                        />


                    </>
                );
            },
        },
    ];
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [categories, setCategories] = useState<any>([]);
    const [offset, setOffset] = useState<any>(0);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState<any>("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const baseURL = process.env.REACT_APP_API_URL;
    //get all product
    const getAllCategory = () => {
        CategoryApi.getCategoryList(user?._id)
            .then((response: any) => {
                //   console.log(response.data?.categories);
                setCategories(response?.data?.categories);
                // dispatch(setCategoriesData(response?.data?.data))
            })
            .catch((error: any) => {
                // console.log(error);
            });
    };
    // add new categroy
    const handleAdd = (props: any) => {
        const data = {
            name: name
        }
        if (props === "add") {
            CategoryApi.createCategory(user?._id, data)
                .then((res: any) => {
                    toast.success("Category added successfully")
                    getAllCategory()
                    handleClose()
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
        else {
            CategoryApi.updateCategory(user?._id, props, data)
                .then((res: any) => {
                    toast.success("Category updated successfully")
                    getAllCategory()
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }

    }

    useEffect(() => {
        getAllCategory();
    }, []);
    console.log("categories", categories);
    // console.log("user", user)
    //giving raw style
    const getRowClassName = (params: any) => {
        return "custom-row";
    };
    console.log("category list", categories)
    return (
        <Container>
            <Grid container spacing={2} sx={{ backgroundColor: "white", textAlign: "center" }}>
                <Grid xs={2} md={2}>
                    <SideBar userProfile={user.id} getmenu={""} />
                </Grid>
                <Grid sx={{ borderRadius: 0 }} xs={10} py={5} pl={2} md={10}>
                    <div style={{ width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }} my={1}>
                            <Typography variant="h6" marginRight={1} fontWeight={"bold"}>
                                Category List
                            </Typography>
                            <Button
                                onClick={handleOpen}
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    ":hover": { backgroundColor: "black", color: "white" },
                                }}

                                style={{ marginRight: 8 }}
                            >
                                Add Category
                            </Button>
                        </Box>
                        {categories?.length < 1 ? (<>
                            <img src={man} alt="no order" style={{ width: "50%", height: "100%" }} />
                            <Typography variant="h4">No Order Found</Typography>
                        </>) : (
                            <DataGrid
                                // sx={{ cursor: "pointer" }}
                                rows={categories}
                                getRowId={(row) => row._id}
                                // columnBuffer={0}

                                getRowClassName={getRowClassName}
                                columns={columns}
                                columnBuffer={0}

                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                hideFooterSelectedRowCount={true}
                                density="comfortable"
                            // checkboxSelection
                            />

                        )}
                    </div>
                </Grid>
            </Grid>
            {/* modal */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6">
                        Add Category
                    </Typography>
                    <Box sx={{ marginBottom: 2, marginTop: 2, width: "100%" }}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            sx={{ borderColor: "black" }}
                            label="Category Name"
                            value={name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }}
                        />
                    </Box>
                    <Button
                        onClick={() => handleAdd("add")}
                        sx={{
                            backgroundColor: "black",
                            color: "white",
                            ":hover": { backgroundColor: "black", color: "white" },
                        }}

                        style={{ marginRight: 8 }}
                    >
                        Add
                    </Button>

                </Box>
            </Modal>
        </Container>

    );
}


export default CategoryList;