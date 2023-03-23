import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ListItem, UnorderedList, useDisclosure } from "@chakra-ui/react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function QuestionManagement() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Quiz App | Manage";
  });
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [fileList, setFileList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const FakeData = [
    {
      Group: "L0",
      Speciality: "Math",
      ListOfFiles: ["Math1", "Math2", "Math3", "Math4"],
    },
    {
      Group: "L1",
      Speciality: "Math",
      ListOfFiles: ["L1Math1", "L1Math2", "L1Math3", "L1Math4"],
    },
    {
      Group: "L0",
      Speciality: "Chem",
      ListOfFiles: ["Chem1", "Chem2", "Chem3", "Chem4"],
    },
    {
      Group: "L1",
      Speciality: "Chem",
      ListOfFiles: ["L1Chem1", "L1Chem2", "L1Chem3", "L1Chem4"],
    },
  ];
  const handleSubmit = () => {
    console.log(file);
    file && setFileList([file.name, ...fileList]);
    
  };

  return (
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
                  <Box
                    cursor={"pointer"}
                    onClick={onOpen}
                    key={key}
                    boxShadow={"4px 4px 1px black"}
                    border={"2px solid black"}
                    borderRadius={"0.3em"}
                    backgroundColor={"white"}
                    position={"relative"}
                    bottom={0}
                    transition={"bottom 0.1s ease-out"}
                    _hover={{ bottom: "2px" }}
                    p={"0.2em"}
                  >
                    {e}
                  </Box>
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
              >
                <Box onClick={() => document.getElementById("upload").click()}>
                  <Image src={file_upload} w={"4em"} cursor="pointer" />
                </Box>
                <Box>
                  <FormLabel htmlFor={"upload"}>
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
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box>
            <Menu>
              <MenuButton
                boxShadow={"4px 4px 1px black"}
                border={"2px solid black"}
                _hover={{ border: "2px solid black" }}
                focusBorderColor={"black"}
                cursor="pointer"
                placeholder="Group and Speciality"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                backgroundColor={"white"}
              >
                Group and Speciality
              </MenuButton>
              <MenuList>
                {FakeData && FakeData.map((item,key)=>
                {
                  return(
                    <>
                    <MenuItem onClick={()=>setFileList([...item.ListOfFiles])}>{item.Group} {item.Speciality}</MenuItem>
                  </>
                  )
                  
                })}
                
                
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
