import React from "react";
import { useEffect } from "react";
import {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [unigroup, setUnigroup] = useState("");
  const [teacherName, setTeacherName] = useState(null);
  const [teacherSurname, setTeacherSurname] = useState(null);
  const [teacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getQuestions();
      setFilteredQuestions(
        response.filter(
          (question) =>
            question.groupId == selectedGroup &&
            question.subjectId == selectedSubject
        )
      );
    };
    fetchQuestions();
    isSubmitted && setIsSubmitted(false);
  }, [isSubmitted]);

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
      setIsSubmitted(true);
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
        gap={1}
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
          {fileList &&
            fileList.map((e, key) => {
              return (
                <>
                  <Flex
                    cursor={"pointer"}
                    onClick={onOpen}
                    key={key}
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
                    <Box wordBreak={"break-word"}>{e}</Box>
                    <Box>
                      <CloseIcon
                        onClick={() => {
                          alert("hello");
                        }}
                        fontSize={"0.7em"}
                        color="black"
                      />
                    </Box>
                  </Flex>
                </>
              );
            })}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Question</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UnorderedList>
                  <ListItem>a</ListItem>
                  <ListItem>a</ListItem>
                  <ListItem>a</ListItem>
                  <ListItem>a</ListItem>
                </UnorderedList>
                <Text>Correct answer:</Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  border={"2px solid black"}
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  _hover={{ backgroundColor: "white" }}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Flex
          justifyContent={"flex-start"}
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
                <Box>
                  <FormLabel wordBreak={"break-word"} htmlFor={"upload"}>
                    {file ? file.name : "Choose File"}
                  </FormLabel>
                </Box>
              </Flex>

              <Input
                id={"upload"}
                border={"none"}
                type="file"
                onChange={(e) => {
                  console.log(e);
                  setFile(e.target.files[0]);
                }}
                display={"none"}
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
                marginLeft={"0.7rem"}
              >
                Upload
              </Button>
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
        >
          <form onSubmit={handleItems}>
            <Flex
              p={"5vw"}
              alignItems="center"
              flexWrap={"wrap"}
              flexDirection={{ md: "column", base: "row" }}
              gap={2}
            >
              <Box>
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
              <Box>
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
              <Box>
                <Button
                  boxShadow={"4px 4px 1px black"}
                  border={"2px solid black"}
                  _hover={{ border: "2px solid black" }}
                  focusBorderColor={"black"}
                  cursor="pointer"
                  backgroundColor={"white"}
                  type={"submit"}
                  alignContent={"center"}
                >
                  Search
                </Button>
              </Box>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </div>
  );
}
