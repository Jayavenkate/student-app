import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMarks } from "@/redux/Task/actionCreator";
import { autoLogin, logout } from "@/redux/Login/actionCreator";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
export default function UserNavbar() {
  const name = useSelector((state) => state.Login.username);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(autoLogin());
    dispatch(getMarks());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout()); // First, clear cookies and dispatch logout
    router.push("/"); // Then, navigate to home
  };
  const handleSignup = () => {
    router.push("/api/signup");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          {/* <Button color="inherit">{name}</Button> */}
          <Button
            variant="outlined"
            sx={{ marginRight: "10px" }}
            onClick={handleSignup}
          >
            Signup
          </Button>

          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
