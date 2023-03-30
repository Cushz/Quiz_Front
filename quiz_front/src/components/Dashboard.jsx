import React from "react";
import axios from "axios";
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

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Quiz App | Manage";
  });
  const [file, setFile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [fileList, setFileList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const toast = useToast();

  const handleGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedGroup(selectedGroup);
    const filteredSpecialities = FakeData.filter(
      (item) => item.Group === selectedGroup
    ).map((item) => item.Speciality);
    setSpecialities(filteredSpecialities);
    setSelectedSpeciality(filteredSpecialities[0]);
  };

  const handleSpecialityChange = (event) => {
    const selectedSpeciality = event.target.value;
    setSelectedSpeciality(selectedSpeciality);
  };
  const FakeData = [
    {
      Group: "L0",
      Speciality: "Math",
      ListOfFiles: ["Math1", "Math2", "Math3", "Math4"],
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
    {
      Group: "L2",
      Speciality: "Chem",
      ListOfFiles: ["Chem1", "hem2", "em3", "m4"],
    },
  ];
  const handleSubmit = () => {
    console.log(file);
    file && setFileList([file.name, ...fileList]);
  };

  const handleItems = (event) => {
    event.preventDefault();
    const group = selectedGroup;
    const spec = selectedSpeciality;
    const listOfFiles = FakeData.find(
      (item) => item.Group === group && item.Speciality === spec
    );
    console.log(group, spec);
    if (group && spec) {
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
  return (
    <div className="quiz-body">
      <Navbar />
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
              justifyContent={"center"}
              p={"5vw"}
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
                  {[...new Set(FakeData.map((item, key) => item.Group))].map(
                    (group, key) => (
                      <option key={key} value={group}>
                        {group}
                      </option>
                    )
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
                  placeholder="Speciality"
                  backgroundColor={"white"}
                  onChange={handleSpecialityChange}
                  value={specialities.length > 0 ? undefined : ""}
                >
                  {specialities.map((Speciality, key) => (
                    <option key={key} value={Speciality}>
                      {Speciality}
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
      </Flex>
    </div>
  );
}
