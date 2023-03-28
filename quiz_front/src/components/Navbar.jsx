import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  Link,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate("/auth");
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate("/dashboard");
  };
  return (
    <>
      {mobile ? (
        <Flex w={"80%"} p={"1em"}>
          <Box
            p={"0.2em"}
            boxShadow={"4px 4px 1px black"}
            border={"2px solid black"}
            borderRadius={"0.2em"}
            backgroundColor={"white"}
          >
            <HamburgerIcon
              fontSize={"6vw"}
              ref={btnRef}
              onClick={onOpen}
              cursor={"pointer"}
            />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
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
                      <Link
                        style={{ textDecoration: "none" }}
                        href={"/dashboard"}
                      >
                        <Box>
                          <Button
                            _hover={{
                              backgroundColor: "black",
                              color: "white",
                            }}
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
                      <Link style={{ textDecoration: "none" }} href={"/"}>
                        <Box>
                          <Button
                            _hover={{
                              backgroundColor: "black",
                              color: "white",
                            }}
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
                          onClick={handleLogin}
                        >
                          Teacher Login
                        </Button>
                      </Box>
                    </>
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Flex>
      ) : (
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
              <Link style={{ textDecoration: "none" }} href={"/dashboard"}>
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
              <Link style={{ textDecoration: "none" }} href={"/"}>
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
                  onClick={handleLogin}
                >
                  Teacher Login
                </Button>
              </Box>
            </>
          )}
        </Flex>
      )}
    </>
  );
}
