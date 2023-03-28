import React from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import signIn from "../api/loginTeacher";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import Navbar from "./Navbar";


export default function SignIn() {
  const toast = useToast()
  const navigate = useNavigate();

  const[signInEmail, setsignInEmail] = useState("");
  const[signInPassword, setsignInPassword] = useState("");
  const [show, setShow] = React.useState(false)

  const handleShowClick = () => setShow(!show)


const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    signInClick(e);
  }
}



const signInClick = async (e) => {
  e.preventDefault();
  
 
   toast.closeAll();
    toast({
      title: "Wrong email or password",
      status: "error",
      isClosable: true,
      duration:1000,
    })
  }



  useEffect(()=>{
    document.title= "Quiz App | Auth" 
   })



  return (
    <div className="quiz-body">
      <Navbar/>
      <Flex
        p={"3em"}
        boxShadow={"4px 4px 1px black"}
        border={"2px solid black"}
        borderRadius={"1em"}
        flexDirection={"column"}
        width={{md:"50%",base:"80%"}}
        margin={{md:"18vh auto 0 auto",base:"20vh auto 0 auto"}}
        gap={"2em"}
      >
        <Flex>
          <Heading textAlign={{md:"",base:"center"}} color={"black"}>Welcome back!</Heading>
        </Flex>

        <Flex gap={"1em"} flexDirection={"column"} justifyContent={"space-evenly"}>
          <Box>
            <Input
              type="email"
              name="email"
              maxLength={'1000'}
              boxShadow={"4px 4px 1px black"}
              border={"2px solid black"}
              backgroundColor={"white"}
              _hover={{border:"2px solid black"}}
              focusBorderColor={"black"}
              placeholder={"email"}
              color={"black"}
              p={{base:"1em",md:""}}
              fontSize={{base:"1.3em",md:"default"}}
              onChange={(e)=>setsignInEmail(e.target.value)}
              autoComplete="on"
            />
          </Box>
          <Box>
            <InputGroup>
            <Input
               boxShadow={"4px 4px 1px black"}
               border={"2px solid black"}
               backgroundColor={"white"}
               p={{base:"1em",md:""}}
              fontSize={{base:"1.3em",md:"default"}}
               color={"black"}
               placeholder={"password"}
               _hover={{border:"2px solid black"}}
               focusBorderColor={"black"}
              type= {show ? "text" : "password"}
              name="password"
              onChange={(e)=>setsignInPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="on"
            />
            <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleShowClick}  _hover={{ backgroundColor: "black", color: "white" }}
              border={"none"}
              variant={"outline"}>
               {show ? 'Hide' : 'Show'}
          </Button>
           </InputRightElement>
            </InputGroup>
          </Box>
          
        </Flex>
        

        <Flex justifyContent={{md:"flex-start",base:"center"}}>
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
            onClick={(e) => signInClick(e)}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </div>
  );

  }
