import React from "react";
import { useEffect } from "react";
import {
  ListItem,
  UnorderedList,
  useDisclosure,
  useToast,
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
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../api/getUserInfo";
import getTeacherbyID from "../api/getTeacherbyID";
import axios from "axios";
import getUnigroupbyID from "../api/getUnigroupbyID";


export default function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [teacher, setTeacher] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [unigroup, setUnigroup] = useState("");
  const [teacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
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
      } catch (error) {
        console.error(error);
      }
    };

    if (teacherId) {
      fetchTeacherInfo();
    }
  }, [teacherId]);

  useEffect(() => {
    console.log("teacher", teacher);
    console.log
  }, [teacher]);
  
  




  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setSelectedSubject(selectedSubject);
  };

  const handleSubmit = () => {
    console.log(file);
    file && setFileList([file.name, ...fileList]);
  };


  const handleItems = (event) => {
    event.preventDefault();
    const group = selectedGroup;
    const subject = selectedSubject;
    if (group && subject) {
      setFileList(listOfFiles.ListOfFiles);
    } else {
      toast.closeAll();
      toast({
        title: "Please Select both of the options ",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };


  return teacher  && (
    <div className="quiz-body">
      <Navbar />
      <Flex
        gap={"2em"}
        w={"60%"}
        margin={"1em auto 0 auto"}
        h={"80%"}
        flexDirection={{ md: "row", base: "column" }}
      >
        <Flex
          boxShadow={"4px 4px 1px black"}
          border={"2px solid black"}
          w={{ md: "35%", base: "100%" }}
          flexDirection={"column"}
          p={"1em"}
          gap={2}
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
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"4px 4px 1px black"}
          border={"2px solid black"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={"5em"}>
            <form>
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"8em"}
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
              >
                Upload
              </Button>
            </form>
          </Flex>
        </Flex>
        <form onSubmit={handleItems}>
          <Flex
            flexWrap={"wrap"}
            boxShadow={"4px 4px 1px black"}
            border={"2px solid black"}
            justifyContent={"center"}
            gap={"1em"}
            p={"1em"}
            alignItems={"center"}
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
                {teacher.Unigroups.map((unigroup) => {
                  return (
                    <option key={unigroup.id} value={unigroup.id}>
                      {unigroup.name}
                    </option>
                  );
                }
                  )}
              </Select>
            </Box>
            <Box>
              <Select
                boxShadow={"4px 4px 1px black"}
                border={"2px solid black"}
                _hover={{ border: "2px solid black" }}
                focusBorderColor={"black"}
                cursor="pointer"
                placeholder="Subject"
                backgroundColor={"white"}
                onChange={handleSubjectChange}
                value={selectedSubject}
              >
                {unigroup && unigroup.Subjects.map(group => (
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
              >
                Search
              </Button>
            </Box>
          </Flex>
        </form>
      </Flex>
    </div>
  );
}

