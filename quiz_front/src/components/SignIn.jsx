import React from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import signIn from "../api/loginTeacher";
import getUserInfo from "../api/getUserInfo"
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const navigate = useNavigate();

  const[signInEmail, setsignInEmail] = useState("");
  const[signInPassword, setsignInPassword] = useState("");

//  useEffect(()=>{
//   async function getUser() {
//     const teacher = await getUserInfo();
//     teacher && navigate('/dashboard')
//   }
//   getUser();
//   },[navigate])

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    signInClick(e);
  }
}


const signInClick = async (e) => {
  e.preventDefault();
  const resultToken = await signIn(signInEmail, signInPassword);
  if(!resultToken){
    alert("Invalid Credentials");
    return ;
  }
  localStorage.setItem("token", resultToken);
  navigate("/dashboard");
}


  useEffect(()=>{
    document.title= "Quiz App | Auth" 
   })
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
              maxLength={'1000'}
              boxShadow={"4px 4px 1px black"}
              border={"2px solid black"}
              backgroundColor={"white"}
              _hover={{border:"2px solid black"}}
              focusBorderColor={"black"}
              placeholder={"email"}
              color={"black"}
              onChange={(e)=>setsignInEmail(e.target.value)}
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
              onChange={(e)=>setsignInPassword(e.target.value)}
              onKeyDown={handleKeyDown}
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
            onClick={(e) => signInClick(e)}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

