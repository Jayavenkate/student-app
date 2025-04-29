"use client";
// import { postTask } from "@/redux/Task/actionCreator";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { CardContainer, IconWrapper } from "./AdminDashboard.styled";

import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import GroupAddIcon from "@mui/icons-material/GroupAdd";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#43a047",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const AdminComponent = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <CardContainer>
            <IconWrapper>
              <GroupAddIcon fontSize="medium" style={{ color: "#43a047" }} />
            </IconWrapper>
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Users</h2>
              <p className="text-gray-600">32 Learners</p>
            </div>
          </CardContainer>

          <CardContainer>
            <IconWrapper>
              <GroupAddIcon fontSize="medium" style={{ color: "#43a047" }} />
            </IconWrapper>
            <div>
              <h2 className="text-xl font-semibold mb-2">Avg.Learning Time</h2>
              <p className="text-gray-600">42 Minutes</p>
            </div>
          </CardContainer>

          <CardContainer>
            <IconWrapper>
              <GroupAddIcon fontSize="medium" style={{ color: "#43a047" }} />
            </IconWrapper>
            <div>
              <h2 className="text-xl font-semibold mb-2">Avg.Access Time</h2>
              <p className="text-gray-600">56 Minute</p>
            </div>
          </CardContainer>
          <CardContainer>
            <IconWrapper>
              <GroupAddIcon fontSize="medium" style={{ color: "#43a047" }} />
            </IconWrapper>
            <div>
              <h2 className="text-xl font-semibold mb-2">Avg.Access Time</h2>
              <p className="text-gray-600">56 Minute</p>
            </div>
          </CardContainer>
        </div>
        {/* <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        {/* <CardPieChatContainer>
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Contents</h2>
              <p className="text-gray-600">32 Learners</p>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "A" },
                      { id: 1, value: 20, label: "B" },
                      { id: 2, value: 30, label: "C" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
          </CardPieChatContainer>
          <CardPieChatContainer>
            <div>
              <h2 className="text-xl font-semibold mb-2">Total Contents</h2>
              <p className="text-gray-600">32 Learners</p>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                  },
                ]}
                height={300}
              />
            </div>
          </CardPieChatContainer> */}
      </div>
    </div>
  );
};

export default AdminComponent;
