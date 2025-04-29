import { Card, styled } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
export const HomeContainer = styled("div")(({ theme }) => ({
  position: "relative",

  height: "calc(100vh - 70px)",
  width: "100%",
  overflow: "auto",
  // paddingBottom:"20px"
}));

export const StyledTableCell = styled(TableCell)(() => ({
  fontSize: "8px",
  padding: "4px 8px",
  lineHeight: 1.2,
  verticalAlign: "middle",
}));

export const StyledTableRow = styled(TableRow)(() => ({
  height: "40px", // fixed row height
}));

export const UserNameAcount = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontFamily: "Roboto",
  fontWeight: 500,
  padding: 0,
  margin: 0,
  // border:"1px solid",
}));

export const UserNameAcountRole = styled("div")(({ theme }) => ({
  fontSize: "8px",
  fontFamily: "Roboto",
  fontWeight: 600,
  color: "#9e9e9e",
  padding: 0,
  // border:"1px solid",
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  width: "220px",
  display: "flex",
  flexDirection: "row",
  gap: "15px",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  // border:"1px solid",
  padding: "20px",
}));

export const IconWrapper = styled(Card)(({ theme }) => ({
  height: "35px",
  width: "35px",
  background: "#b9f6ca",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // border:"1px solid",
}));

export const CardPieChatContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "15px",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  // border:"1px solid",
  padding: "20px",
  height: "350px",
}));
