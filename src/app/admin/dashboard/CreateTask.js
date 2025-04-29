"use client";
import { postTask } from "@/redux/Task/actionCreator";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardContainer,
  CardPieChatContainer,
  HomeContainer,
  IconWrapper,
} from "./AdminDashboard.styled";

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
import { Heading, HeadingAllPage } from "../users/User.styled";

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

const CreateTask = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  const dispatch = useDispatch();
  const { loading, error, task } = useSelector((state) => state.Task); // Access the state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "question") setQuestion(value);
    if (name === "correctAnswer") setCorrectAnswer(value);
    else {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      question,
      correctAnswer,
      ...answers,
    };

    // Dispatch action to create task
    dispatch(postTask(taskData));
  };

  return (
    <HomeContainer>
      <HeadingAllPage>Create Task</HeadingAllPage>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div className="space-y-2">
          <label className="block text-gray-700">Quiz Title</label>
          <select
            name="title"
            required
            value={title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a quiz title</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Javascript">Javascript</option>
            <option value="React">React</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter quiz description"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700">Question</label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your question"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700">Answer 1</label>
          <input
            type="text"
            name="answer1"
            value={answers.answer1}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter first answer"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700">Answer 2</label>
          <input
            type="text"
            name="answer2"
            value={answers.answer2}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter second answer"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700">Answer 3</label>
          <input
            type="text"
            name="answer3"
            value={answers.answer3}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter third answer"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700">Answer 4</label>
          <input
            type="text"
            name="answer4"
            value={answers.answer4}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter fourth answer"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-gray-700"> Correct Answer</label>
          <input
            type="text"
            name="correctAnswer"
            value={correctAnswer}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Correct Answer "
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Quiz"}
        </button>
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* {task && (
          <div className="text-green-500">Task Created Successfully!</div>
        )}{" "} */}
      </form>
      {/* )} */}
    </HomeContainer>
  );
};

export default CreateTask;
