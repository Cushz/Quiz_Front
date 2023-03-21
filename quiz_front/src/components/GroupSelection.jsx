import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Select,
  Link,
} from "@chakra-ui/react";

export default function GroupSelection() {
  return (
    <div className="quiz-body">
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        margin={"10em auto 0 auto"}
      >
        <Box>
          <Select
            boxShadow={"4px 4px 1px black"}
            border={"2px solid black"}
            _hover={{border:"2px solid black"}}
            focusBorderColor={"black"}
            cursor="pointer"
            placeholder="Select your group and speciality"
          >
            <option value="option1">L0 Math</option>
            <option value="option2">L3 geophysics</option>
            <option value="option3">L1 geophysics</option>
          </Select>
        </Box>
      </Flex>
    </div>
  );
}
