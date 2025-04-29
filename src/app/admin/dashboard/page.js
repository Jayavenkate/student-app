// "use client";
// import Navbar from "@/app/admin/dashboard/Navbar";
// import CreateTask from "./CreateTask";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getTasks } from "@/redux/Task/actionCreator";
// import Sidebar from "./Sidebar";

// // src/app/admin/dashboard/page.js
// export default function AdminDashboard() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getTasks());
//   }, [dispatch]);
//   return (
//     <div>
//       <div style={{ height: "70px" }}> <Navbar /></div>
//       <div
//         style={{
//           height: "calc(100vh - 70px)",
//           display: "flex",
//           flex: "row",
//           // border: "1px solid black",
//         }}
//       >
//         <Sidebar />
//         <CreateTask />
//       </div>
//     </div>
//   );
// }

"use client";
import Navbar from "@/app/admin/dashboard/Navbar";
// import CreateTask from "./CreateTask";
// import Users from "./Users";
// import ApprovedUsers from "./ApprovedUsers";
// import AllTasks from "./AllTasks";
// import DashboardHome from "./DashboardHome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "@/redux/Task/actionCreator";
import Sidebar from "./Sidebar";
import CreateTask from "./CreateTask";
import AdminComponent from "./AdminDashboard";
import UserDetails from "../users/page";
import ActiveUsers from "../users/ActiveUsers";
import AllTaskAdmin from "./AllTaskAdmin";
import CompletedTaskUsers from "./CompletedTaskUsers";
import { Box } from "@mui/material";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState("Create Task"); // <-- to track selected sidebar item

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // Render component based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case "CompltedList":
        return <CompletedTaskUsers />;
      // case "Dashboard":
      //   return <AdminComponent />;
      case "Users":
        return <UserDetails />;
      case "Approved users":
        return <ActiveUsers />;
      case "All Tasks":
        return <AllTaskAdmin />;
      case "Create Task":
        return <CreateTask />;
      default:
        return <CreateTask />;
    }
  };

  return (
    <div>
      <Box sx={{ height: "70px", display: { xs: "none", md: "block" } }}>
        <Navbar />
      </Box>
      <div
        style={{
          height: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "row",
          // width: { xs: "0px", md: "200px" },
          // display: { xs: "none", md: "block" },
          // border: "1px solid",
          overflowY: "auto",
        }}
      >
        <Box
          sx={
            {
              // width: { xs: "0px", md: "200px" },
              // display: { xs: "none", md: "block" },
            }
          }
        >
          <Sidebar setSelectedMenu={setSelectedMenu} />
        </Box>
        <div
          style={{
            width: "100%",
            padding: "0px 20px",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
