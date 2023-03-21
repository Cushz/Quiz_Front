import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
export default function SignIn() {
  return (
    <div className="quiz-body">
      <Flex
        p={"3em"}
        boxShadow={"4px 4px 1px black"}
        border={"2px solid black"}
        borderRadius={"1em"}
        flexDirection={"column"}
        width={"50%"}
        margin={"1em auto 0 auto"}
        gap={"2em"}
      >
        <Flex>
          <Heading color={"black"}>Welcome back!</Heading>
        </Flex>

        <Flex gap={"1em"} flexDirection={"column"} justifyContent={"space-evenly"}>
          <Box>
            <Input
              type="email"
              name="email"
              boxShadow={"4px 4px 1px black"}
              border={"2px solid black"}
              backgroundColor={"white"}
              _hover={{border:"2px solid black"}}
              focusBorderColor={"black"}
              placeholder={"email"}
              color={"black"}
              cursor={"pointer"}
            />
          </Box>
          <Box>
            <Input
               boxShadow={"4px 4px 1px black"}
               border={"2px solid black"}
               backgroundColor={"white"}
               color={"black"}
               placeholder={"password"}
               _hover={{border:"2px solid black"}}
               focusBorderColor={"black"}
              type="password"
              name="password"
              cursor={"pointer"}
            />
          </Box>
        </Flex>

        <Flex>
          <Button
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
            _active={{backgroundColor:"none"}}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
