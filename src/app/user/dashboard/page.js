"use client";

import { useEffect, useState } from "react";
import UserNavbar from "./Navbar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMarks,
  getname,
  getTasks,
  submitMarks,
} from "@/redux/Task/actionCreator";

export default function UserDashboard() {
  const [open, setOpen] = useState(false);
  const [storeTopic, setStoreTopic] = useState([]);
  const name = useSelector((state) => state.Login.username);
  const dispatch = useDispatch();
  const filterTask = useSelector((state) => state.Task.task);
  const marks = useSelector((state) => state.Task.marks);
  // console.log("marks", marks);

  const userMarks = Array.isArray(marks)
    ? marks.find((mark) => mark.username === String(name))
    : null;
  // console.log("userMarks", userMarks); // This will log `userMarks` or `null`

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getMarks());
    // console.log("marks from Redux", marks); // Add this to check the data
  }, [dispatch]);

  const nameByFilter = useSelector((state) => state.Task.getNameByFilter);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (userMarks) {
      // Check if score is already an array
      if (Array.isArray(userMarks.score)) {
        setScore(userMarks.score.reduce((acc, curr) => acc + curr, 0));
      } else {
        try {
          // Attempt to parse the score if it's a JSON string
          const parsedScore = JSON.parse(userMarks.score);
          if (Array.isArray(parsedScore)) {
            setScore(parsedScore.reduce((acc, curr) => acc + curr, 0));
          } else {
            // console.error("Parsed score is not an array:", parsedScore);
            setScore(0);
          }
        } catch (error) {
          // If JSON parsing fails, set the score to 0
          // console.error("Error parsing score:", error);
          setScore(0);
        }
      }
    }
  }, [userMarks]);

  const handleNext = () => {
    // Save current question and selected answer
    const currentTask = nameByFilter[currentQuestionIndex];
    setAnswers((prev) => [
      ...prev,
      {
        question: currentTask.question,
        selectedAnswer: selectedOption,
        quizz_id: currentTask.id,
      },
    ]);

    setSelectedOption(""); // Clear selection
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const currentTask = nameByFilter?.[currentQuestionIndex];

  const handleFinish = async () => {
    const currentTask = nameByFilter[currentQuestionIndex];
    // console.log("currentTask", currentTask);

    const allAnswers = [
      ...answers,
      {
        question: currentTask.question,
        selectedAnswer: selectedOption,
        quizz_id: currentTask.id,
      },
    ];
    const finalAnswer = {
      user: name,
      quizz: allAnswers,
    };
    // console.log("All answers:", finalAnswer);

    const results = finalAnswer.quizz.map((answer) => {
      const correspondingQuiz = filterTask.find(
        (quiz) => quiz.id === answer.quizz_id
      );

      if (!correspondingQuiz) {
        return {
          ...answer,
          isCorrect: false,
        };
      }

      return {
        ...answer,
        isCorrect: answer.selectedAnswer === correspondingQuiz.correctAnswer,
      };
    });

    let totalMarks = results.filter((res) => res.isCorrect).length;
    // let completedtask = [currentTask.title];

    // console.log("Results with correctness:", results);
    // console.log("Current Total Marks:", totalMarks);

    // 🚀 Now dispatch with updated marks
    dispatch(
      submitMarks({
        user: name,
        marks: totalMarks,
        topic: currentTask.title,
      })
    );
    handleClose(); // Close dialog
    setCurrentQuestionIndex(0); // Reset
    setAnswers([]);
    setSelectedOption("");
  };

  const handleClickOpen = (topic) => {
    const filteredArray = filterTask.filter(
      (task) =>
        task.title.trim().toLowerCase() === topic.title.trim().toLowerCase()
    );
    dispatch(getname(filteredArray)); // now sending an array
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const topics = [
    {
      title: "HTML",
      description:
        "The foundation of web development. Learn to structure content semantically for better accessibility and SEO.",
      buttonText: "Start",
    },
    {
      title: "CSS",
      description:
        "Style your web pages with powerful layout systems like Flexbox and Grid. Create responsive designs that work on all devices.",
      buttonText: "Start",
    },
    {
      title: "JavaScript",
      description:
        "Add interactivity to your websites. Master DOM manipulation, async programming, and modern ES6+ features.",
      buttonText: "Start",
    },
    {
      title: "React",
      description:
        "Build dynamic user interfaces with this popular JavaScript library. Learn components, hooks, and state management.",
      buttonText: "Start",
    },
  ];

  return (
    <>
      <UserNavbar />
      <Button
        sx={{
          backgroundColor: "#00796b", // Custom background color
          color: "#fff", // White text
          fontWeight: "600", // Bold text
          padding: "8px 20px", // Padding for the button
          borderRadius: "12px", // Rounded corners
          fontSize: "12px", // Font size
          "&:hover": {
            backgroundColor: "#004d40", // Darker background on hover
          },
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Button shadow
          display: "block", // Makes button a block-level element
          marginLeft: "auto",
          marginTop: "10px",
        }}
      >
        Total marks - {score}
      </Button>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              let completedTopics = [];

              try {
                const rawTopics = userMarks?.topic;

                if (Array.isArray(rawTopics)) {
                  completedTopics = rawTopics;
                } else if (typeof rawTopics === "string") {
                  completedTopics = JSON.parse(rawTopics);
                }
              } catch (error) {
                // console.error("Failed to parse completed topics:", error);
              }

              const isCompleted = completedTopics.includes(topic.title);
              return (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {topic.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                  </div>
                  <button
                    className={`px-4 py-2 transition-colors duration-300 ${
                      isCompleted
                        ? "bg-green-500"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                    onClick={() => handleClickOpen(topic)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Completed" : topic.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Your Selected Topic</DialogTitle>

        <DialogContent>
          {currentTask ? (
            <div className="p-4 mb-4 rounded-md border shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-blue-700">
                {currentTask.question}
              </h2>

              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <FormControlLabel
                  value={currentTask.answer1}
                  control={<Radio />}
                  label={currentTask.answer1}
                />
                <FormControlLabel
                  value={currentTask.answer2}
                  control={<Radio />}
                  label={currentTask.answer2}
                />
                <FormControlLabel
                  value={currentTask.answer3}
                  control={<Radio />}
                  label={currentTask.answer3}
                />
                <FormControlLabel
                  value={currentTask.answer4}
                  control={<Radio />}
                  label={currentTask.answer4}
                />
              </RadioGroup>
            </div>
          ) : (
            <p className="text-gray-500">Quiz completed! 🎉</p>
          )}
        </DialogContent>

        <DialogActions>
          {currentQuestionIndex < nameByFilter.length - 1 && (
            <Button onClick={handleNext} disabled={!selectedOption}>
              Next
            </Button>
          )}
          {currentQuestionIndex === nameByFilter.length - 1 && currentTask && (
            <Button onClick={handleFinish} disabled={!selectedOption}>
              Finish
            </Button>
          )}
        </DialogActions>
      </Dialog>
      );
    </>
  );
}
