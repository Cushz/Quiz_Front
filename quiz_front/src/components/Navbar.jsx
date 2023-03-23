import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Link } from "@chakra-ui/react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
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
        </>
      ) : (
        <>
          <Box>
            <Button
              _hover={{ backgroundColor: "black", color: "white" }}
              border={"none"}
              variant={"outline"}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </>
      )}
      <Link style={{textDecoration:"none"}} href={"/"}>
            <Box>
              <Button
                _hover={{ backgroundColor: "black", color: "white" }}
                border={"none"}
                variant={"outline"}
              >
                Quiz
              </Button>
            </Box>
          </Link>
    </Flex>
  );
}
