import React, { useEffect } from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
export default function Stats(props) {
  useEffect(() => {
    document.title = "Quiz App | Results";
  });

  return (
    <div className="quiz-body">
      <Flex
        bg={"rgb(255 249 228)"}
        boxShadow={"9px 9px 1px #000000"}
        borderRadius={"14px"}
        border={"5px solid black"}
        flexDirection={"column"}
        margin={"1em auto 0 auto"}
        w={{ md: "50%", base: "90%" }}
      >
        <Flex
          bg={"white"}
          p={"1em"}
          borderRadius={"14px 14px 0 0"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          borderBottom={"3px solid black"}
        >
          <Box width={"10%"}>
            <Navbar isMobile={true} />
          </Box>
          <Box width={"80%"} textAlign={"center"}>
            <Heading color={"black"} width={"95%"}>
              Results
            </Heading>
          </Box>
        </Flex>
        <Flex
          boxShadow={"4px 4px 0px black"}
          border={"2px solid black"}
          borderRadius={"0.3em"}
          backgroundColor={"white"}
          flexWrap={"wrap"}
          margin={"4em auto 0 auto"}
          width={{ md: "50%", base: "80%" }}
          color={"black"}
          flexDirection={"column"}
          p={"1em"}
        >
          <Box>
            <Text fontWeight={"bold"}>Arif Abdullayev</Text>
          </Box>

          <Box>
            <Text fontWeight={"bold"}>Computer Science</Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Math</Text>
          </Box>
        </Flex>
        <Flex
          boxShadow={"4px 4px 0px black"}
          border={"2px solid black"}
          borderRadius={"0.3em"}
          backgroundColor={"white"}
          p={"1em"}
          flexWrap={"wrap"}
          width={{ md: "50%", base: "80%" }}
          color={"black"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          margin={"5em auto 3em auto"}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bold"}>Answered:</Text>
            </Box>
            <Flex w={"24px"}>
              <Text>{props.all} </Text>
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bold"}>Correct:</Text>
            </Box>
            <Flex alignItems={"center"}>
              <Text>{props.correct}</Text>
              <AiOutlineCheck color="green" />
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bold"}>Incorrect:</Text>
            </Box>
            <Flex alignItems={"center"}>
              <Text>{props.incorrect}</Text>
              <AiOutlineClose color="red" />
            </Flex>
          </Flex>
        </Flex>
        
      </Flex>
    </div>
  );
}
