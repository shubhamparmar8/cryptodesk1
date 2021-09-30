import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Divider,
  Drawer,
  IconButton,
  AppBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from "@mui/material";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";

const drawerWidth = 240;

const menuList = [
  {
    title: "Home",
    path: "/",
    icon: <HomeOutlined />,
  },
  {
    title: "Cryptocurrencies",
    path: "/cryptocurrencies",
    icon: <MoneyCollectOutlined />,
  },
  {
    title: "Exchanges",
    path: "/exchanges",
    icon: <BulbOutlined />,
  },
  {
    title: "News",
    path: "/news",
    icon: <FundOutlined />,
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((item, index) => (
          <Link key={index} to={item.path}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography color="text.primary">{item.title}</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img src={icon} alt="crypto desk" width="50px" height="50px" />
          <Link to="/">
            <Typography
              variant="h6"
              color="primary" 
              sx={{ ml: "0.9rem" }}>
            >
              CryptoDesk
            </Typography>
            </Link>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
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
};

export default Navbar;
