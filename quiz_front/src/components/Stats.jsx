import React, { useEffect } from "react";
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
export default function Stats(props) {

  useEffect(()=>{
   document.title= "Quiz App | Results" 
  })

  return (
    <div className="quiz-body">
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
          flexWrap={"wrap"}
          width={"11em"}
          justifyContent={"space-between"}
          margin={"5em auto 8em auto"}
        >
          <Box>
            <Text fontWeight={"bold"}>Answered:</Text>
          </Box>
          <Box>
            <Text>{props.all}</Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Right answers:</Text>
          </Box>
          <Box>
            <Text>{props.correct}</Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Wrong answers:</Text>
          </Box>
          <Box>
            <Text>{props.incorrect}</Text>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
