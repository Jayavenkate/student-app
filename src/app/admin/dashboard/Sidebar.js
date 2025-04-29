// import React from "react";
// import {
//   List,
//   ListItemText,
//   Divider,
//   ListItemIcon,
//   Drawer,
//   ListItemButton,
// } from "@mui/material";
// import {
//   GroupAdd as GroupAddIcon,
//   Task as TaskIcon,
//   Assignment as AssignmentIcon,
//   AddCircle as AddCircleIcon,
//   Dashboard as DashboardIcon,
// } from "@mui/icons-material";

// const Sidebar = ({ setSelectedMenu }) => {
//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon /> },
//     { text: "CompltedList", icon: <DashboardIcon /> },
//     { text: "Users", icon: <GroupAddIcon /> },
//     { text: "Approved users", icon: <TaskIcon /> },
//     { text: "All Tasks", icon: <AssignmentIcon /> },
//     { text: "Create Task", icon: <AddCircleIcon /> },
//   ];

//   return (
//     <Drawer
//       sx={{
//         width: 200,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 200,
//           boxSizing: "border-box",
//           paddingTop: "20px",
//           height: "calc(100vh - 70px)",
//           position: "absolute",
//           top: 70,
//         },
//       }}
//       variant="persistent"
//       anchor="left"
//       open
//     >
//       <List>
//         {menuItems.map((item, index) => (
//           <div key={index}>
//             <ListItemButton onClick={() => setSelectedMenu(item.text)}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//             <Divider />
//           </div>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  List,
  ListItemText,
  Divider,
  ListItemIcon,
  Drawer,
  ListItemButton,
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import {
  GroupAdd as GroupAddIcon,
  Task as TaskIcon,
  Assignment as AssignmentIcon,
  AddCircle as AddCircleIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@/redux/Login/actionCreator";
const Sidebar = ({ setSelectedMenu }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    // { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Create Task", icon: <AddCircleIcon /> },
    { text: "CompltedList", icon: <DashboardIcon /> },
    { text: "Users", icon: <GroupAddIcon /> },
    { text: "Approved users", icon: <TaskIcon /> },
    { text: "All Tasks", icon: <AssignmentIcon /> },
  ];

  const drawerContent = (
    <List>
      {menuItems.map((item, index) => (
        <div key={index}>
          <ListItemButton
            onClick={() => {
              setSelectedMenu(item.text);
              if (isMobile) setMobileOpen(false); // Close drawer on mobile after selection
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
          <Divider />
        </div>
      ))}
    </List>
  );
  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/");
  };
  return (
    <>
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div">
                Welcome, Quiz.io <WavingHandOutlinedIcon color="primary" />
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "10px", fontWeight: 400, color: "#bdbdbd" }}
              >
                Here's what happened with your learning system
              </Typography>
            </Box>
            <IconButton onClick={handleLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: 200,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            paddingTop: isMobile ? 0 : "20px",
            top: isMobile ? 60 : 70,
            height: isMobile ? "100vh" : "calc(100vh - 70px)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
