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
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "./styles/SideNav.module.css";
import {Menu, MenuItem} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsReception4 } from "react-icons/bs";
import { IoReceipt } from "react-icons/io5";
import { BrowserRouter as Switch, Router, Route, Link } from "react-router-dom";

const drawerWidth = 240;
function ResponsiveDrawer(props) {
  const rute = window.location.pathname;

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () =>{
    setAnchorEl(null);
    setMenuOpen(false);
  }

  const handleClick = (e) =>{
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
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
              <ListItemIcon>
                <AiFillHome />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={styled.link} to={"/major/receipts"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <IoReceipt />
              </ListItemIcon>
              <ListItemText primary="Receipts" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={styled.link} to={"/major/statistics"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BsReception4 />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
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
          {rute === "/major/receipts" ? (
            <Button
              className={styled.add_button}
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleClick}
            >
              ADD RECEIPT
            </Button>
          ) : null}
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
            <MenuItem onClick={handleClose}>All</MenuItem>
            <MenuItem onClick={handleClose}>Water</MenuItem>
            <MenuItem onClick={handleClose}>Energy</MenuItem>
            <MenuItem onClick={handleClose}>Gas</MenuItem>
            <MenuItem onClick={handleClose}>Sewerage</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
