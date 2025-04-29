"use client";

import { getCompleteList, getMarks } from "@/redux/Task/actionCreator";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTableCell, StyledTableRow } from "./AdminDashboard.styled";
import { Heading, HeadingAllPage } from "../users/User.styled";

export default function CompletedTaskUsers() {
  const dispatch = useDispatch();
  const marks = useSelector((state) => state.Task.marks || []);

  // console.log("marks", marks);
  useEffect(() => {
    dispatch(getCompleteList());
  }, [dispatch]);
  return (
    <div>
      <HeadingAllPage>Completed List</HeadingAllPage>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">UserId</TableCell>
              <TableCell align="center"> Username</TableCell>
              <TableCell align="center">Total Marks</TableCell>
              <TableCell align="center">Completed Topics</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(marks) && marks.length > 0 ? (
              marks.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{item.userId}</TableCell>
                  <TableCell align="center">{item.username}</TableCell>
                  <TableCell align="center">
                    {(() => {
                      try {
                        const parsed = JSON.parse(item.score); // e.g., "[2,1]" => [2, 1]
                        return Array.isArray(parsed)
                          ? parsed.reduce((sum, val) => sum + val, 0)
                          : 0;
                      } catch (e) {
                        return 0; // fallback if JSON.parse fails
                      }
                    })()}
                  </TableCell>
                  {/* <TableCell align="center">
                    {(() => {
                      try {
                        const parsed = JSON.parse(item.score); // e.g., "[2,1]" => [2, 1]
                        const sum = Array.isArray(parsed)
                          ? parsed.reduce((sum, val) => sum + val, 0)
                          : 0;

                        // Define your maximum score, for example, 10
                        const maxScore = 10;

                        // Calculate the percentage
                        const percentage = (sum / maxScore) * 100;

                        return `${percentage}%`; // Format to 2 decimal places
                      } catch (e) {
                        return "0%"; // fallback if JSON.parse fails
                      }
                    })()}
                  </TableCell> */}
                  <TableCell align="center">
                    {(Array.isArray(item.topic)
                      ? item.topic
                      : typeof item.topic === "string"
                      ? item.topic.replace(/[\[\]"]+/g, "").split(",")
                      : []
                    ).map((t, index) => (
                      <span
                        key={index}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#e0f7fa",
                          color: "#00796b",
                          padding: "2px 6px",
                          margin: "2px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </TableCell>
                </StyledTableRow>
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
