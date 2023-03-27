import React, { useState } from "react";
import { Flex, Box, Button, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isValid = localStorage.getItem("token") ? true : false;

  const [isLoggedIn, setIsLoggedIn] = useState(isValid);

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    localStorage.removeItem("token");
    navigate("/");  
  };

  const navigateAuth = () => {
    navigate("/auth");
  };

  return (
    <Flex
      justifyContent={"space-around"}
      w={"80%"}
      m={"0.5em auto 0 auto"}
      boxShadow={"4px 4px 1px black"}
      border={"2px solid black"}
      backgroundColor={"white"}
      p={"0.5em"}
    >
      {isLoggedIn ? (
        <>
        <Link style={{textDecoration:"none"}} href={"/"}>
            <Box>
              <Button
                _hover={{ backgroundColor: "black", color: "white" }}
                border={"none"}
                variant={"outline"}
            
              >
                Main
              </Button>
            </Box>
          </Link>
          <Link style={{textDecoration:"none"}} href={"/dashboard"}>
          <Box>
            <Button
              _hover={{ backgroundColor: "black", color: "white" }}
              border={"none"}
              variant={"outline"}
            >
              Dashboard
            </Button>
          </Box>
          </Link>
          <Box>
            <Button
              _hover={{ backgroundColor: "black", color: "white" }}
              border={"none"}
              variant={"outline"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </>
      ) : (
        <>
         <Link style={{textDecoration:"none"}} href={"/"}>
            <Box>
              <Button
                _hover={{ backgroundColor: "black", color: "white" }}
                border={"none"}
                variant={"outline"}
            
              >
                Main
              </Button>
            </Box>
          </Link>
          <Box>
            <Button
              _hover={{ backgroundColor: "black", color: "white" }}
              border={"none"}
              variant={"outline"}
              onClick={navigateAuth}
            >
              Teacher Login
            </Button>
          </Box>
        </>
      )}
      
    </Flex>
  );
}
