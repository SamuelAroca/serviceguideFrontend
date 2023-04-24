import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import styled from "./styles/SideNav.module.css";
import { AiFillHome } from "react-icons/ai";
import { BsReception4, BsSave2Fill, BsHouseAddFill } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";
import {
  BrowserRouter as Switch,
  Router,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

const drawerWidth = 240;
function ResponsiveDrawer(props) {
  const location = useLocation();
  const { "*": path } = useParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={styled.div_main}>
      <Toolbar className={styled.toolbar_title}>
        <h3>ServiceGuide</h3>
      </Toolbar>
      <Divider />
      <List>
        <Link className={styled.link} to={"/major/home"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <AiFillHome />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link className={styled.link} to={"/major/receipts"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <IoReceipt />
              </ListItemIcon>
              <ListItemText primary="Receipts" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className={styled.link} to={"/major/receipts/addreceipt"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <MdOutlinePostAdd />
              </ListItemIcon>
              <ListItemText primary="Add receipt" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link className={styled.link} to={"/major/houses"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <FaHouseUser />
              </ListItemIcon>
              <ListItemText primary="Houses" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className={styled.link} to={"/major/houses/addhouse"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <BsHouseAddFill />
              </ListItemIcon>
              <ListItemText primary="Add house" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link className={styled.link} to={"/major/statistics"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <BsReception4 />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className={styled.link} to={"/major/statistics/savedstatistics"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className={styled.icon}>
                <BsSave2Fill />
              </ListItemIcon>
              <ListItemText primary="Saved statistics" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
          className={styled.toolbar_button}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {location.pathname === "/major/receipts" || path ? (
            <Link to={"/major/receipts/addreceipt"}>
              <Button
              className={styled.add_button}
              variant="contained"
              color="secondary"
              size="large"
              >
              ADD RECEIPT
              </Button>
            </Link>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
