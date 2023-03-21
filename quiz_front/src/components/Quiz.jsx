import React, {useEffect} from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import "../assets/style.css";
import Stats from "./Stats";
export default function Quiz() {

  useEffect(()=> {
    document.title = "Quiz App | Quiz"
  })
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [numOfCorrect, setNumOfCorrect] = useState(0);
  const quizData = [
    {
      question: "Who was the 4th president of the USA?",
      options: [
        { answerText: "James Madison", isCorrect: false },
        { answerText: "Andrew Jackson", isCorrect: false },
        { answerText: "Thomas Jefferson", isCorrect: true },
        { answerText: "Grover Cleveland", isCorrect: false },
      ],
    },
    {
      question: "What is the capital of France?",
      options: [
        { answerText: "Berlin", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Madrid", isCorrect: false },
        { answerText: "Baku", isCorrect: false },
      ],
    },
    {
      question: "What is the largest country in the world?",
      options: [
        { answerText: "Russia", isCorrect: true },
        { answerText: "China", isCorrect: false },
        { answerText: "Canada", isCorrect: false },
        { answerText: "USA", isCorrect: false },
      ],
    },
  ];

  const handleQuestions = (option) => {
    if (option.isCorrect) setNumOfCorrect(numOfCorrect + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
    console.log(numOfCorrect)
  };

  return (
    <div className="quiz-body">
      {showScore ? (
        <Stats
          all={quizData.length}
          correct={numOfCorrect}
          incorrect={quizData.length-numOfCorrect}
        />
      ) : (
        <Flex
          bg={"rgb(255 249 228)"}
          boxShadow={"9px 9px 1px #000000"}
          borderRadius={"14px"}
          flexDirection={"column"}
          border={"5px solid black"}
          margin={"1em auto 0 auto"}
          w={"50%"}
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
              <Heading>Quiz App</Heading>
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
                  <Text>{currentQuestion+1}/{quizData.length}</Text>
                </Box>
              </Flex>
              <Flex>
                <Flex mt={"2em"} p={"0.3em"}>
                  <Text fontSize={"1.8em"} fontWeight={"bold"}>
                    {quizData[currentQuestion]["question"]}
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={4} p={"2.3em"} flexDirection={"column"} flexWrap={"wrap"}>

                {quizData[currentQuestion]["options"].map((option, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() => handleQuestions(option)}
                      h={"3.5em"}
                      boxShadow={"4px 4px 1px #000000"}
                      bg={"#ffffff"}
                      border={"4px solid #000000"}
                      position={"relative"}
                      bottom={0}
                      transition={"bottom 0.2s ease-out"}
                      _hover={{
                        backgroundColor: "black",
                        color: "white",
                        bottom: "4px",
                      }}
                    >
                      {option.answerText}
                    </Button>
                  );
                })}
              </Flex>
            </Flex>
          </form>
        </Flex>
      )}
    </div>
  );
}
