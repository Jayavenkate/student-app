"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useDispatch, useSelector } from "react-redux";
import { UserNameAcount, UserNameAcountRole } from "./AdminDashboard.styled";
import { logout } from "@/redux/Login/actionCreator";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Navbar() {
  const name = useSelector((state) => state.Login.username);
  const role = useSelector((state) => state.Login.role);
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#FFFFFF",
        boxShadow: "none",
        color: "#212121",
        height: "70px",
        // border: "1px solid",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Roboto",
            fontSize: "26px",
            fontSize: { xs: "18px", sm: "22px", md: "26px" },

            fontWeight: 800,
            color: "#1b5e20",
            margin: 0,
            padding: 0,
          }}
        >
          Welcome, Quiz.io {""}
          <WavingHandOutlinedIcon color="primary" />
          <p style={{ fontSize: "10px", fontWeight: 400, color: "#bdbdbd" }}>
            Here's what happened with your learning system
          </p>
        </Typography>

        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>

        <div>
          {/* <PermIdentityIcon fontSize="large" /> */}
          {/* <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <UserNameAcount>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </UserNameAcount>
            <UserNameAcountRole>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </UserNameAcountRole>
          </div> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
