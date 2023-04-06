import React from "react";
import { useEffect } from "react";
import {
  FormControl,
  ListItem,
  UnorderedList,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import file_upload from "../assets/file.png";
import {
  Flex,
  Box,
  Text,
  Button,
  FormLabel,
  Input,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Heading,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import getUserInfo from "../api/getUserInfo";
import getTeacherbyID from "../api/getTeacherbyID";
import getUnigroupbyID from "../api/getUnigroupbyID";
import sendFile from "../api/sendFile";
import getQuestions from "../api/getQuestions";
import deleteQuestion from "../api/deleteQuestion";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [teacher, setTeacher] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [unigroup, setUnigroup] = useState("");
  const [teacherName, setTeacherName] = useState(null);
  const [teacherSurname, setTeacherSurname] = useState(null);
  const [teacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isOpen, setIsOpen] = useState(
    Array(filteredQuestions.length).fill(false)
  );

  const toast = useToast();

  const handleGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedGroup(selectedGroup);
    const fetchUnigroupbyID = async () => {
      const response = await getUnigroupbyID(selectedGroup);
      setUnigroup(response);
    };
    if (selectedGroup) {
      fetchUnigroupbyID();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    document.title = "Quiz App | Dashboard";
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      localStorage.setItem("teacherId", response.id);
      setTeacherId(localStorage.getItem("teacherId"));
    };
    if (!localStorage.getItem("teacherId")) fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await getTeacherbyID(teacherId);
        setTeacher(response);
        setTeacherName(response.name);
        setTeacherSurname(response.surname);
      } catch (error) {
        console.error(error);
      }
    };

    if (teacherId) {
      fetchTeacherInfo();
    }
  }, [teacherId]);

  const handleSearch = async () => {
    if (selectedGroup && selectedSubject) {
      const response = await getQuestions();
      setFilteredQuestions(
        response.filter(
          (question) =>
            question.groupId == selectedGroup &&
            question.subjectId == selectedSubject
        )
      );
    } else {
      toast.closeAll();
      toast({
        title: "Select both of the options",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
  };

  const handleSubmit = async () => {
    if (file && selectedGroup && selectedSubject) {
      const response = await sendFile(file, selectedGroup, selectedSubject);
      //if response is badrequest then show error
      if (response.statusText == "Bad Request") {
        toast.closeAll();
        toast({
          title: "Please select a valid file",
          status: "error",
          isClosable: true,
          duration: 1000,
        });
      }
      await handleSearch();
      console.log(response);
    }

    if (selectedGroup && selectedSubject && !file) {
      toast.closeAll();
      toast({
        title: "Please Select a file ",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
    if (!selectedGroup || !selectedSubject) {
      toast.closeAll();
      toast({
        title: "Please Select both of the options ",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  const handleDeleteQuestion = async (id) => {
    const response = await deleteQuestion(id);
    handleSearch();
    console.log(response);
  };

  return (
    <div className="quiz-body">
      <Navbar name={teacherName} surname={teacherSurname} />
      <Flex
        w={"80%"}
        margin={"1em auto 0 auto"}
        h={"80%"}
        gap={2}
        flexDirection={{ md: "row", base: "column" }}
        justifyContent={"space-evenly"}
      >
        <Flex
          boxShadow={"4px 4px 1px black"}
          border={"2px solid black"}
          flexDirection={"column"}
          p={"1em"}
          gap={2}
          maxW={"25%"}
          minH={{ md: "", base: "25%" }}
          minW={{ md: "25%", base: "100%" }}
          overflowY={"auto"}
          overflowX={"hidden"}
        >
          {filteredQuestions &&
            filteredQuestions.map((questions, index) => {
              return (
                <>
                  <Flex
                    cursor={"pointer"}
                    key={questions.id}
                    onClick={() => {
                      const newIsOpen = [...isOpen];
                      newIsOpen[index] = true;
                      setIsOpen(newIsOpen);
                    }}
                    boxShadow={"4px 4px 0px black"}
                    border={"2px solid black"}
                    borderRadius={"0.3em"}
                    backgroundColor={"white"}
                    position={"relative"}
                    bottom={0}
                    transition={"bottom 0.1s ease-out"}
                    _hover={{ bottom: "2px" }}
                    justifyContent={"space-between"}
                    p={"0.4em"}
                    
                  >
                    <Box wordBreak={"break-word"}>{questions.filename}</Box>
                    <Box>
                      <CloseIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuestion(questions.id);
                        }}
                        fontSize={"0.7em"}
                        color="black"
                      />
                    </Box>
                  </Flex>
                  <Modal
                    isOpen={isOpen[index]}
                    onClose={() => {
                      const newIsOpen = [...isOpen];
                      newIsOpen[index] = false;
                      setIsOpen(newIsOpen);
                    }}
                    
                  >
                    <ModalOverlay />
                    <ModalContent>
                      
                      <ModalHeader>{questions.question}</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody >
                        <UnorderedList>
                          {questions.Options.map((options) => (
                            <ListItem>{options.option}</ListItem>
                          ))}
                        </UnorderedList>
                        {questions.Options.map((options) => {
                          if (options.is_correct) {
                            return (
                              <Text key={options.id}>
                                Correct Answer: {options.option}
                              </Text>
                            );
                          }
                        })}
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          border={"2px solid black"}
                          variant="outline"
                          mr={3}
                          onClick={() => {
                            const newIsOpen = [...isOpen];
                            newIsOpen[index] = false;
                            setIsOpen(newIsOpen);
                          }}
                          _hover={{ backgroundColor: "white" }}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              );
            })}
        </Flex>

        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"4px 4px 1px black"}
          border={"2px solid black"}
          maxW={"50%"}
          minH={{ md: "", base: "50%" }}
          minW={{ md: "50%", base: "100%" }}
          p={"10vw"}
          flexWrap={"wrap"}
        >
          <Flex justifyContent={"center"} alignItems={"center"}>
            <form>
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box onClick={() => document.getElementById("upload").click()}>
                  <Image src={file_upload} w={"4em"} cursor="pointer" />
                </Box>
                <Flex justifyContent={"center"} alignItems={"center"}>
                  <Box>
                    <Text wordBreak={"break-word"} htmlFor={"upload"}>
                      {file ? file.name : "Choose File"}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Input
                    id={"upload"}
                    border={"none"}
                    type="file"
                    onChange={handleFileChange}
                    display={"none"}
                    accept=".docx"
                  />
                  <Button
                    size={"xs"}
                    type="button"
                    boxShadow={"4px 4px 1px black"}
                    border={"2px solid black"}
                    variant="outline"
                    position={"relative"}
                    bottom={0}
                    transition={"bottom 0.2s ease-out"}
                    _hover={{ bottom: "4px" }}
                    color={"black"}
                    backgroundColor={"white"}
                    cursor={"pointer"}
                    p={"1em"}
                    _active={{ backgroundColor: "none" }}
                    onClick={handleSubmit}
                    mt={"5px"}
                  >
                    Upload
                  </Button>
                </Box>
              </Flex>
            </form>
          </Flex>
        </Flex>
        <Flex
          flexWrap={"wrap"}
          boxShadow={"4px 4px 1px black"}
          border={"2px solid black"}
          justifyContent={"center"}
          alignItems={"center"}
          maxW={"25%"}
          minH={{ md: "", base: "25%" }}
          minW={{ md: "25%", base: "100%" }}
          flexDirection={"row"}
        >
          <FormControl
            display={"flex"}
            flexDirection={{ md: "column", base: "row" }}
            gap={2}
            width={{ md: "50%", base: "70%" }}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <Flex
              gap={2}
              flexDirection={{ md: "column", base: "row" }}
              width={"-webkit-fill-available"}
            >
              <Box minW={"47%"} maxW={{ md: "100%", base: "50%" }}>
                <Select
                  boxShadow={"4px 4px 1px black"}
                  border={"2px solid black"}
                  _hover={{ border: "2px solid black" }}
                  focusBorderColor={"black"}
                  cursor="pointer"
                  placeholder="Group"
                  backgroundColor={"white"}
                  onChange={handleGroupChange}
                  value={selectedGroup}
                >
                  {teacher &&
                    teacher.Unigroups.map((unigroup) => {
                      return (
                        <option key={unigroup.id} value={unigroup.id}>
                          {unigroup.name}
                        </option>
                      );
                    })}
                </Select>
              </Box>
              <Box minW={"50%"} maxW={{ md: "100%", base: "50%" }}>
                <Select
                  boxShadow={"4px 4px 1px black"}
                  border={"2px solid black"}
                  _hover={{ border: "2px solid black" }}
                  focusBorderColor={"black"}
                  cursor="pointer"
                  placeholder="Speciality"
                  backgroundColor={"white"}
                  onChange={handleSubjectChange}
                  value={selectedSubject}
                >
                  {unigroup &&
                    unigroup.Subjects.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                </Select>
              </Box>
            </Flex>

            <Flex justifyContent={"center"} flexGrow={1}>
              <Box>
                <Button
                  boxShadow={"4px 4px 1px black"}
                  border={"2px solid black"}
                  _hover={{ border: "2px solid black" }}
                  focusBorderColor={"black"}
                  cursor="pointer"
                  backgroundColor={"white"}
                  type={"button"}
                  alignContent={"center"}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </div>
  );
}
