import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import AdbIcon from "@mui/icons-material/Adb";
import { Container, InputAdornment, TextField } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import "./style.css";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../media/logo.png";
import userIcon from "../media/male.webp";
import ConstValues from "../styles/Constvalues";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AuthenticationApi from "../api/AuthenticationApi";
import { clearUserInfo } from "../store/slices/userInfoSlice";
// eslint-disable-next-line react-hooks/rules-of-hooks

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<any>("");
  const userRole = useSelector((state: any) => state?.userInfo?.role);
  const userId = useSelector((state: any) => state?.userInfo?._id);
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const pages = ["Products", "Pricing", "Blog"];
  let settings: any[] = [];
  if (userRole == 0) {
    settings = ["Profile", "Orders", "Logout"];
  }
  if (userRole == 1) {
    settings = ["Dashboard", "Logout"];
  }
  //search field
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.2),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  //badge style

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      color: "white",
      backgroundColor: "black",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //handling logout
  const handleLogout = () => {
    try {
      AuthenticationApi.usrSignOut()
        .then((res: any) => {
          toast.success("Logout successfull", { theme: "dark" });
          console.log(res, "logout successfull", res);
          dispatch(clearToken());
          dispatch(clearUserInfo());
          navigate("/auth/login");
        })
        .catch((err: any) => {
          toast.error("Logout failed");
          console.log(err, "logout failed");
        });
      // Call the logout API method

      // Optionally, you can perform additional actions like clearing user data from the store
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Logout failed:", error);
    }
  };
  //get profile info
  const token = useSelector((state: any) => state?.auth?.token);
  // console.log("token for home page", token)
  const handleProfile = () => {
    navigate(`/customer/profile/${userId}`);
  };
  console.log("user role", userRole);
  const handleUserDashboard = () => {
    userRole == 1
      ? navigate(`/dashboard/admin/${userId}`)
      : navigate(`/dashboard/user/${userId}`);
  };
  //handle orders
  const handleUserOrders = () => {
    navigate(`/customer/orders/${userId}`);
  }
  return (
    <AppBar style={{ backgroundColor: "white" }} position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Link to={"/"}>
            <img
              loading="lazy"
              style={{ width: "100px" }}
              src={logo}
              className="img-fluid"
              alt="Responsive image"
            />
          </Link>

          <Box sx={{ display: "flex", width: "100%" }}>
            <Search style={{ width: "100%" }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "black", position: "absolute" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search in Sodai"
                sx={{ color: "black", width: "100%" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button
              sx={{
                backgroundColor: ConstValues.btnColor,
                borderRadius: 0,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              variant="contained"
            >
              Search
            </Button>
          </Box>
          <IconButton
            onClick={() => navigate("/shop/shop")}

            sx={{ marginLeft: 2 }}
          >

            <StorefrontIcon sx={{ color: "black" }} />

          </IconButton>
          <IconButton
            onClick={() => navigate("/cart/products")}
            aria-label="cart"
            sx={{ marginLeft: 1 }}
          >
            <StyledBadge
              badgeContent={useSelector((state: any) => state?.cart?.length)}
              color="primary"
            >
              <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
            </StyledBadge>
          </IconButton>

          {!token ? (
            <Box
              onClick={() => navigate("/auth/login")}
              width={100}
              marginLeft={2}
            >
              <Typography sx={{ color: "black", cursor: "pointer" }}>
                Sign In
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 0, marginLeft: 3 }}>
                <Tooltip title="My Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={userIcon} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={
                        setting === "Profile" ? handleProfile :
                          setting === "Logout" ? handleLogout
                            : setting === "Orders" ? handleUserOrders
                              : setting === "Dashboard"
                                ? handleUserDashboard
                                : handleCloseUserMenu
                      }
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
