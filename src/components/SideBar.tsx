import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChairIcon from "@mui/icons-material/Chair";
import { Box, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function SideBar({
  userProfile,
  getmenu,
}: {
  userProfile: any;
  getmenu: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(1);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.userInfo._id);
  const handleClick = (value: any, id: any) => {
    switch (value) {
      case "Product":
        navigate("/dashboard/admin/product-list");
        break;
      case "orders":
        navigate("/dashboard/admin/orders");
        break;
      case "dashboard":
        navigate(`/dashboard/admin/${user}`);
        break;
      case "categories":
        navigate("/dashboard/admin/category-list");
        break;
      default:
        break;
    }
    setSelected(id);
  };
  React.useEffect(() => {
    const pathname = window.location.pathname;
    switch (pathname) {
      case "/dashboard/admin/product-list":
        setSelected(5);
        break;
      case "/dashboard/admin/orders":
        setSelected(3);
        break;
      case `/dashboard/admin/${user}`:
        setSelected(2);
        break;
      case "/dashboard/admin/category-list":
        setSelected(6);
        break;
      default:
        setSelected(2);
        break;
    }
  }, [window.location.pathname]);

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          paddingTop: "45px",
          color: "white",
          bgcolor: "black",
          minHeight: "80vh",
          maxHeight: "100%",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={{
            backgroundColor: selected === 2 ? "grey" : "",
            "&:hover": {
              backgroundColor: selected === 2 ? "grey" : "",
            },
          }}
          onClick={() => handleClick("dashboard", 2)}>
          <ListItemIcon>
            <GridViewIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            color="white"

            primary="Dashboard"
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            backgroundColor: selected === 3 ? "grey" : "",
            "&:hover": {
              backgroundColor: selected === 3 ? "grey" : "",
            },
          }}
          onClick={() => handleClick("orders", 3)}
        >
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <ListItemButton
          sx={{
            backgroundColor: selected === 5 ? "grey" : "",
            "&:hover": {
              backgroundColor: selected === 5 ? "grey" : "",
            },
          }}
          onClick={() => handleClick("Product", 5)}
        >
          <ListItemIcon>
            <ChairIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton

          sx={{
            backgroundColor: selected === 6 ? "grey" : "",
            "&:hover": {
              backgroundColor: selected === 6 ? "grey" : "",
            },
          }}
          onClick={() => handleClick("categories", 6)}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
      </List>
    </>
  );
}
