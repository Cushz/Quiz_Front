import React from "react";
import { useEffect } from "react";
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
import "../assets/style.css";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Quiz App | Home";
  });
  return (
    <div className="quiz-body">
      <Flex gap={10} flexDirection={"column"} w={"50%"} margin={"0 auto"}>
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
              _focus={{backgroundColor:"inherit"}}
            >
              Start
            </Button>
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
                      _hover={{ border: "2px solid black" }}
                      focusBorderColor={"black"}
                      placeholder={"Group"}
                    >
                      <option value={"a"}>a</option>
                      <option value={"b"}>b</option>
                      <option value={"c"}>c</option>
                    </Select>
                    <Select
                      boxShadow={"4px 4px 1px black"}
                      border={"2px solid black"}
                      backgroundColor={"white"}
                      _hover={{ border: "2px solid black" }}
                      focusBorderColor={"black"}
                      placeholder={"Subject"}
                    >
                      <option value={"a"}>a</option>
                      <option value={"b"}>b</option>
                      <option value={"c"}>c</option>
                    </Select>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    _hover={{backgroundColor:"black",color:"white"}}
                    borderColor={"black"}
                    backgroundColor={"black"}
                    mr={3}
                    color={"white"}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button borderColor={"black"} color={"black"}
                    _hover={{ backgroundColor: "black", color: "white" }} onClick={() => navigate("/quiz")} variant="ghost">
                    Start
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
