import { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import styled from './styles/SideNav.module.css';
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsReception4 } from "react-icons/bs";
import { IoReceipt } from "react-icons/io5";
import Home from "./Home";
import Statistics from "./Statistics";
import Receipts from "./Receipts";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menudata, setMenudata] = useState("Home");


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/');
  }

  const drawer = (
    <div className={styled.div_main}>
      <Toolbar className={styled.toolbar_title}>
        <h3>ServiceGuide</h3>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() =>setMenudata("Home")}>
          <ListItemButton>
            <ListItemIcon>
              <AiFillHome />
            </ListItemIcon>
            <ListItemText primary ='Home' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() =>setMenudata("Receipts")}>
          <ListItemButton>
            <ListItemIcon>
              <IoReceipt />
            </ListItemIcon>
            <ListItemText primary ='Receipts' />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() =>setMenudata("Statistics")}>
          <ListItemButton>
            <ListItemIcon>
              <BsReception4 />
            </ListItemIcon>
            <ListItemText primary ='Statistics' />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        <Toolbar className={styled.toolbar_button}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            className={styled.add_button}
            variant="contained"
            color="secondary"
            size="large"
          >
            ADD RECEIPT
        </Button>
          <Typography variant="h6" noWrap component="div">
            

          </Typography>
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
        {menudata == "Home" ? <Home /> : null}
        {menudata == "Receipts" ? <Receipts /> : null}
        {menudata == "Statistics" ? <Statistics /> : null}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {

  window: PropTypes.func,
};

export default ResponsiveDrawer;