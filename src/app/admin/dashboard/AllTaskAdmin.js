"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletetask, getTasks, updateTasks } from "@/redux/Task/actionCreator";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Heading, HeadingAllPage } from "../users/User.styled";
import { StyledTableCell, StyledTableRow } from "./AdminDashboard.styled";

const categories = ["HTML", "CSS", "Javascript", "React"];

export default function AllTaskAdmin() {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.Task.task);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswer: "",
  });

  // Filter tasks by category
  const getTasksByCategory = (category) => {
    return task.filter((item) => item.title === category);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      question: item.question,
      answer1: item.answer1,
      answer2: item.answer2,
      answer3: item.answer3,
      answer4: item.answer4,
      correctAnswer: item.correctAnswer,
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditItem(null);
  };
  const handleDeleteClick = (item) => {
    // console.log("item", item);
    setCurrentItem(item);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setCurrentItem(null);
  };
  const handleConfirmDelete = () => {
    if (currentItem) {
      dispatch(deletetask(currentItem.id));
      handleDeleteClose();
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleUpdateSubmit = async () => {
  //   if (editItem) {
  //     await dispatch(updateTasks({ id: editItem.id, ...formData }));
  //     handleEditClose();
  //   }
  // };
  const handleUpdateSubmit = async () => {
    try {
      if (editItem) {
        await dispatch(updateTasks({ id: editItem.id, ...formData }));
        handleEditClose();
      }
    } catch (error) {
      // console.error("Failed to update task:", error);
    }
  };

  const handleView = (item) => {
    setSelectedQuestion(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedQuestion(null);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div>
      {/* {categories.map((category) => (
        <div
          key={category}
          // style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <Heading style={{ marginTop: "20px" }}>{category}</Heading>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Options</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTasksByCategory(category).map((item, index) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{item.question}</StyledTableCell>
                    <StyledTableCell>
                      <Grid container spacing={1}>
                        {[1, 2, 3, 4].map((num) => (
                          <Grid item key={num}>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleAnswerClick(item[`answer${num}`])
                              }
                              sx={{ fontSize: "8px", padding: "0px 5px" }}
                            >
                              {item[`answer${num}`]}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell>{item.correctAnswer}</StyledTableCell>
                    <TableCell
                      sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                    >
                      <IconButton
                        onClick={() => handleEditClick(item)}
                        sx={{ padding: 0 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleView(item)}
                        sx={{ padding: 0 }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(item)}
                        sx={{ padding: 0 }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))} */}
      {categories.map((category) => {
        const tasksInCategory = getTasksByCategory(category);
        if (tasksInCategory.length === 0) return null; // Skip rendering if no tasks

        return (
          <div key={category}>
            <HeadingAllPage>{category}</HeadingAllPage>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Options</TableCell>
                    <TableCell>Correct Answer</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasksInCategory.map((item, index) => (
                    <StyledTableRow key={item.id} sx={{ height: "auto" }}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{item.question}</StyledTableCell>
                      {/* <StyledTableCell >
                        <Grid container spacing={1}>
                          {[1, 2, 3, 4].map((num) => (
                            <Grid item key={num}>
                              <div
                                // variant="outlined"
                                // onClick={() =>
                                //   handleAnswerClick(item[`answer${num}`])
                                // }
                                style={{
                                  fontSize: "8px",
                                  padding: "0px 5px",
                                  textTransform: "none",
                                  border:"1px solid blue",
                                  borderRadius:"50%"
                                }}
                              >
                                {item[`answer${num}`]}
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </StyledTableCell> */}
                      <StyledTableCell>
                        <Grid
                          container
                          spacing={1}
                          sx={{
                            flexWrap: "wrap",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          {[1, 2, 3, 4].map((num) => (
                            <Grid item key={num}>
                              <div
                                style={{
                                  fontSize: "8px",
                                  padding: "0px 5px",
                                  textTransform: "none",
                                  border: "1px solid blue",
                                  borderRadius: "20px",
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                  minWidth: "60px",
                                }}
                              >
                                {item[`answer${num}`]}
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </StyledTableCell>

                      <StyledTableCell>{item.correctAnswer}</StyledTableCell>
                      <TableCell
                        sx={{ display: "flex", gap: "5px", minHeight: "80px" }}
                      >
                        <IconButton
                          onClick={() => handleEditClick(item)}
                          sx={{ padding: 0 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleView(item)}
                          sx={{ padding: 0 }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(item)}
                          sx={{ padding: 0 }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      })}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
          {[1, 2, 3, 4].map((num) => (
            <TextField
              key={num}
              fullWidth
              margin="dense"
              label={`Answer ${num}`}
              name={`answer${num}`}
              value={formData[`answer${num}`]}
              onChange={handleChange}
            />
          ))}
          <TextField
            fullWidth
            margin="dense"
            label="Correct Answer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Question Details</DialogTitle>
        <DialogContent dividers>
          {selectedQuestion && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Category:</strong> {selectedQuestion.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Question:</strong> {selectedQuestion.question}
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="success">
                <strong>Correct Answer:</strong>{" "}
                {selectedQuestion.correctAnswer}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Options:</strong>
              </Typography>
              <ul>
                {[1, 2, 3, 4].map((num) => (
                  <li key={num}>
                    {selectedQuestion[`answer${num}`]}
                    {selectedQuestion.correctAnswer ===
                      selectedQuestion[`answer${num}`] && " (Correct Answer)"}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
