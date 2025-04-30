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
import { StyledTableRow } from "../dashboard/AdminDashboard.styled";
export default function ActiveUsers() {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.Users);

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);
  const activeUsers = users?.filter((user) => user.status === true);
  return (
    <div>
      <HeadingAllPage>Active Users List</HeadingAllPage>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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
            {activeUsers?.length > 0 ? (
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
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
