import React, { useEffect } from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import Navbar from "./Navbar";
export default function Stats(props) {
  useEffect(() => {
    document.title = "Quiz App | Results";
  });

  return (
    <div className="quiz-body">
      <Navbar />
      <Flex
        bg={"rgb(255 249 228)"}
        boxShadow={"9px 9px 1px #000000"}
        borderRadius={"14px"}
        border={"5px solid black"}
        flexDirection={"column"}
        margin={"1em auto 0 auto"}
        w={"50%"}
      >
        <Flex
          bg={"white"}
          p={"1em"}
          borderRadius={"14px 14px 0 0"}
          justifyContent={"center"}
          borderBottom={"3px solid black"}
        >
          <Box>
            <Heading>Results</Heading>
          </Box>
        </Flex>
        <Flex
          boxShadow={"4px 4px 0px black"}
          border={"2px solid black"}
          borderRadius={"0.3em"}
          backgroundColor={"white"}
          flexWrap={"wrap"}
          margin={"4em auto 0 auto"}
          width={"50%"}
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
          width={"50%"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          margin={"5em auto 8em auto"}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bold"}>Answered:</Text>
            </Box>
            <Box>
              <Text>{props.all}</Text>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bold"}>Correct:</Text>
            </Box>
            <Box>
              <Text>{props.correct}</Text>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Text fontWeight={"bold"}>Incorrect:</Text>
            </Box>
            <Box>
              <Text>{props.incorrect}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
