import React, { useEffect } from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import "../assets/style.css";
import Stats from "./Stats";
import getQuiz from "../api/getQuiz";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(localStorage.getItem("showScore"));
  const [numOfCorrect, setNumOfCorrect] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [subject, setSubject] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Quiz App | Quiz";
    async function getQuizData() {
      const quizId = localStorage.getItem("quizId");
      const response = await getQuiz(quizId);
      setQuestions(response.Questions);
      setSubject(response.subject);
    }
    const quizId = localStorage.getItem("quizId");
    if (quizId) getQuizData();
    const currentQuestion = localStorage.getItem("currentQuestion");
    if (currentQuestion) setCurrentQuestion(parseInt(currentQuestion));

    if (localStorage.getItem("showScore")) {
      setShowScore(true);
    }

    //if reloads the page, delete local storage and navigate to home
  }, []);

  const handleQuestions = (option) => {
    if (option.is_correct) setNumOfCorrect(numOfCorrect + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      localStorage.setItem("currentQuestion", nextQuestion);
    } else if (nextQuestion >= questions.length) {
      localStorage.removeItem("currentQuestion");
      localStorage.setItem("showScore", true);
      setShowScore(true);
    }
  };

  return (
    questions && (
      <div className="quiz-body">
        {showScore ? (
          <Stats
            all={questions.length}
            correct={numOfCorrect}
            incorrect={questions.length - numOfCorrect}
          />
        ) : (
          <Flex
            bg={"rgb(255 249 228)"}
            boxShadow={"9px 9px 1px #000000"}
            borderRadius={"14px"}
            flexDirection={"column"}
            border={"5px solid black"}
            margin={"8vh auto 0 auto"}
            w={{ md: "50%", base: "90%" }}
            className="Quiz"
          >
            <Flex
              p={"1em"}
              borderRadius={"14px 14px 0 0"}
              borderBottom={"3px solid black"}
              bg={"white"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box>
                <Heading wordBreak={"break-word"} color={"black"}>
                  {subject}
                </Heading>
              </Box>
            </Flex>
            <form>
              <Flex h={"60%"} m={"0 auto"} w={"80%"} flexDirection={"column"}>
                <Flex
                  p={"1em"}
                  borderBottom={"2px solid black"}
                  justifyContent={"space-around"}
                  fontWeight={"bold"}
                >
                  <Box>
                    <Text>
                      {currentQuestion + 1}/{questions.length}
                    </Text>
                  </Box>
                </Flex>
                <Flex>
                  <Flex mt={"2em"} p={"0.3em"}>
                    <Text
                      color={"black"}
                      fontSize={"1.8em"}
                      fontWeight={"bold"}
                    >
                      {questions && questions[currentQuestion]["question"]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  gap={4}
                  m={"0 auto"}
                  w={"100%"}
                  pt={"1em"}
                  pb={"2em"}
                  flexDirection={"column"}
                  flexWrap={"wrap"}
                >
                  {questions[currentQuestion].Options &&
                    questions[currentQuestion].Options.map((option, index) => {
                      return (
                        <Button
                          key={index}
                          onClick={() => handleQuestions(option)}
                          height={"auto"}
                          minHeight={"3.5em"}
                          boxShadow={"4px 4px 0 #000000"}
                          bg={"#ffffff"}
                          border={"4px solid #000000"}
                          bottom={0}
                          transition={"transform 0.2s ease-out"}
                          wordBreak={"break-word"}
                          whiteSpace={"normal"}
                          _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "100%",
                          }}
                          _hover={{
                            _before: {
                              height: "calc(100% + 0.5em)",
                            },
                            backgroundColor: "black",
                            color: "white",
                            transform: "translate(0, -4px)",
                          }}
                        >
                          {option.option}
                        </Button>
                      );
                    })}
                </Flex>
              </Flex>
            </form>
          </Flex>
        )}
      </div>
    )
  );
}
