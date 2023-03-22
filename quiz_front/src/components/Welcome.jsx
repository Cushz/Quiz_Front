import React from "react";
import { useEffect } from "react";
import { Flex, Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import logo from "../assets/vectorpaint.svg";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function Welcome() {

const navigate = useNavigate();
useEffect(()=>{
  document.title= "Quiz App | Home" 
 })
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
              onClick={()=>navigate("/quiz")}
              border={"2px solid black"}
              variant="outline"
              position={"relative"}
              bottom={0}
              transition={"bottom 0.2s ease-out"}
              _hover={{bottom:"4px"   }}
            >
              Start
            </Button>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
