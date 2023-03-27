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
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import getUniGroup from "../api/getUniGroup";
import getSubject from "../api/getSubject";


export default function Welcome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const toast = useToast()


  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && surname && groups && subjects) {
      navigate("/quiz");
    } else {
      toast.closeAll()
      toast({
        title: "Fill all inputs correctly",
        status: "error",
        isClosable: true,
        duration:1000,
      })
    }
  };


  useEffect(() => {
    document.title = "Quiz App | Home";
    async function fetchGroupData() {
      const response = await getUniGroup();
      setGroups(response)
    }
    async function fetchSubjectData() {
      const response = await getSubject();
      setSubjects(response)
    }
    fetchGroupData();
    fetchSubjectData();
  }, []);

  
  return (
    <div className="quiz-body">
      <Navbar />
      <Flex   gap={10} flexDirection={"column"} w={{md:"50%",base:"90%"}} margin={"0 auto"}>
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
              _hover={{ bottom: "4px" }}
              _focus={{ backgroundColor: "inherit" }}
            >
              Start
            </Button>
            <form >
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
                        _placeholder={{ color: "black" }}
                        
                      />
                      <Input
                        boxShadow={"4px 4px 1px black"}
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        _placeholder={{ color: "black" }}
                        placeholder={"Surname"}
                      />
                      <Select
                        boxShadow={"4px 4px 1px black"}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        onChange={(event) => setGroup(event.target.value)}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        placeholder={"Group"}
                      >
                        {
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            )
                          }
                          )
                        }
                      </Select>
                      <Select
                        boxShadow={"4px 4px 1px black"}
                        border={"2px solid black"}
                        backgroundColor={"white"}
                        _hover={{ border: "2px solid black" }}
                        focusBorderColor={"black"}
                        onChange={(event) => setSubject(event.target.value)}
                        placeholder={"Subject"}
                      >
                         {
                          subjects.map((subject) => {
                            return (
                              <option key={subject.id} value={subject.id}>{subject.name}</option>
                            )
                          }
                          )
                        }
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
