"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../dashboard/Navbar";
import CreateTask from "../dashboard/CreateTask";
import { getusers, updateUsers } from "@/redux/Users/actionCreator";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import { Heading, HeadingAllPage } from "./User.styled";
export default function ActiveUsers() {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.Users);

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);
  const activeUsers = users?.filter((user) => user.status === true);
  return (
    // <div style={{ padding: "20px" }}>
    //   <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Active Users</h1>

    //   {loading && <p>Loading users...</p>}
    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   {/* Map users in Cards */}
    //   <div
    //     style={{
    //       display: "flex",
    //       flexWrap: "wrap",
    //       gap: "20px",
    //       justifyContent: "center",
    //     }}
    //   >
    //     {activeUsers && activeUsers.length > 0
    //       ? activeUsers.map((user) => (
    //           <div
    //             key={user.id}
    //             style={{
    //               backgroundColor: "white",
    //               padding: "20px",
    //               borderRadius: "10px",
    //               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //               width: "300px",
    //               textAlign: "left",
    //             }}
    //           >
    //             <h2 style={{ marginBottom: "10px", color: "#00796b" }}>
    //               {user.username}
    //             </h2>
    //             <p>
    //               <strong>Email:</strong> {user.email}
    //             </p>
    //             <p>
    //               <strong>Password:</strong> {user.hashpassword}
    //             </p>
    //             <p>
    //               <strong>Status:</strong>{" "}
    //               <span
    //                 style={{
    //                   color: user.status === "active" ? "green" : "red",
    //                 }}
    //               >
    //                 <Button onClick={() => hadleClickbutton(user.id)}>
    //                   {user.status === false ? "InActive" : "Active"}
    //                 </Button>
    //               </span>
    //             </p>
    //           </div>
    //         ))
    //       : !loading && <p>No users found.</p>}
    //   </div>
    // </div>
    <div>
      <HeadingAllPage>Active Users List</HeadingAllPage>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading users...</p>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>

              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeUsers?.length > 0 &&
              activeUsers.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>

                  <TableCell align="center">
                    <Switch
                      checked={row.status}
                      onChange={() => hadleClickbutton(row.id)}
                      color="primary"
                    />
                    <span>{row.status ? "Active" : "InActive"}</span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
