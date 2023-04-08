import React from "react";
import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import logo from "../assets/vectorpaint.svg";
import Navbar from "./Navbar";
import "../assets/style.css";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import getUniGroup from "../api/getUniGroup";
import getSubject from "../api/getSubject";
import getQuestions from "../api/getQuestions";
import createQuiz from "../api/createQuiz";
import findQuiz from "../api/findQuiz";
import getUnigroupbyID from "../api/getUnigroupbyID";
import updateQuiz from "../api/updateQuiz";

export default function Welcome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSubjectText, setSelectedSubjectText] = useState("");
  const [selectedGroupText, setSelectedGroupText] = useState("");
  const [group, setGroup] = useState();
  const toast = useToast();

  const handleGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedGroup(selectedGroup);
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedGroupText(selectedOption.text);
    const fetchUnigroupbyID = async () => {
      const response = await getUnigroupbyID(selectedGroup);
      setGroup(response);
    };
    if (selectedGroup) {
      fetchUnigroupbyID();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //if name includes space or digit, show toast
    if (
      name.includes(" ") ||
      (/\d/.test(name) && surname.includes(" ")) ||
      /\d/.test(surname)
    ) {
      toast({
        title: "Name and Surname cannot include space or digit",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    const fullname = name + " " + surname;
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("group", selectedGroupText);
    localStorage.setItem("subject", selectedSubjectText);
    const response = await getQuestions();
    //map through the response and filter the questions by group and subject
    const filteredQuestions = response.filter(
      (question) =>
        question.groupId == selectedGroup &&
        question.subjectId == selectedSubject
    );

    //write all filtered questions id to an array
    const questionIdArray = filteredQuestions.map((question) =>
      parseInt(question.id)
    );

    if (questionIdArray.length > 0) {
      const responseQuizFind = await findQuiz(
        parseInt(selectedSubject),
        parseInt(selectedGroup)
      );
      if (!(responseQuizFind.status == 404)) {
        if (responseQuizFind.Questions.length == 0) {
          const responseQuizUpdate = await updateQuiz(
            responseQuizFind.id,
            questionIdArray
          );
        }
        localStorage.setItem("quizId", responseQuizFind.id);
      } else {
        const responseQuizCreate = await createQuiz(
          parseInt(selectedSubject),
          parseInt(selectedGroup),
          questionIdArray
        );
        localStorage.setItem("quizId", responseQuizCreate.id);
      }
    }
    if (name && surname && selectedGroup && selectedSubject) {
      if (filteredQuestions.length > 0) {
        navigate("/quiz");
      } else {
        toast.closeAll();
        toast({
          title: "No questions found",
          status: "error",
          isClosable: true,
          duration: 1000,
        });
      }
    } else {
      toast.closeAll();
      toast({
        title: "Fill all inputs correctly",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    document.title = "Quiz App | Home";

    async function fetchGroupData() {
      const response = await getUniGroup();
      setGroups(response);
    }

    fetchGroupData();
  }, []);

  useEffect(() => {
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("showScore");
    localStorage.removeItem("quizId");
    localStorage.removeItem("fullname");
    localStorage.removeItem("group");
    localStorage.removeItem("subject");
  }, [selectedSubjectText]);

  return (
    <div className="quiz-body">
      <Navbar />
      <Flex
        gap={10}
        flexDirection={"column"}
        w={{ md: "50%", base: "90%" }}
        margin={"0 auto"}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Image src={logo} w={"20em"} />
          </Box>
        </Flex>

        <Flex
          borderRadius={"10px"}
          border={"5px solid black"}
          justifyContent={"center"}
          backgroundColor={"white"}
          boxShadow={"5px 5px 1px black"}
          p={"5em"}
        >
          <Box>
            <Heading color={"black"} fontWeight={"bold"}>
              Quiz Application
            </Heading>
          </Box>
        </Flex>

        <Flex color={"black"} justifyContent={"center"}>
          <Box>
            <Button
              className="startButton"
              boxShadow={"4px 4px 1px black"}
              onClick={onOpen}
              border={"2px solid black"}
              variant="outline"
              position={"relative"}
              bottom={0}
              transition={"bottom 0.2s ease-out"}
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
                bottom: "4px",
                transform: "translate(0, -4px)",
              }}
              _focus={{ backgroundColor: "inherit" }}
            >
              Start
            </Button>
            <form>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color={"black"}>Student Form</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl
                      display={"flex"}
                      gap={2}
                      flexDirection={"column"}
                    >
                      <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        boxShadow={"4px 4px 1px black"}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        placeholder={"Name"}
                      />
                      <Input
                        boxShadow={"4px 4px 1px black"}
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        placeholder={"Surname"}
                        type="text"
                        pattern="[^\d]+"
                      />
                      <Select
                        boxShadow={"4px 4px 1px black"}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        value={selectedGroup}
                        color={selectedGroup ? "black" : "gray"}
                        onChange={handleGroupChange}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        placeholder="Group"
                      >
                        {groups.map((group) => {
                          return (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          );
                        })}
                      </Select>
                      <Select
                        boxShadow={"4px 4px 1px black"}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        color={selectedSubject ? "black" : "gray"}
                        value={selectedSubject}
                        placeholder="Subject"
                        onChange={(event) => {
                          setSelectedSubject(parseInt(event.target.value));

                          const selectedOption =
                            event.target.options[event.target.selectedIndex];
                          setSelectedSubjectText(selectedOption.text);
                        }}
                      >
                        {group &&
                          group.Subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                              {subject.name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      _hover={{ backgroundColor: "black", color: "white" }}
                      borderColor={"black"}
                      backgroundColor={"black"}
                      mr={3}
                      color={"white"}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      borderColor={"black"}
                      color={"black"}
                      _hover={{ backgroundColor: "black", color: "white" }}
                      variant="ghost"
                      onClick={handleSubmit}
                    >
                      Start
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </form>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
