import { Card, styled } from "@mui/material";

export const Heading = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  fontFamily: "Roboto",
  marginBottom: "20px",
}));




export const HeadingAllPage = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  fontFamily: "Roboto",
  marginBottom: "20px",
  marginTop: "20px" ,
  [theme.breakpoints.down("md")]: {
    marginTop: "70px", // increased margin on small screens
  }
}));
