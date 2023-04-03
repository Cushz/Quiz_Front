import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  Text,
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
export default function Navbar(props) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
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

  const isValid = localStorage.getItem("token") ? true : false;

  const [isLoggedIn, setIsLoggedIn] = useState(isValid);

  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    localStorage.removeItem("token");
    localStorage.removeItem("teacherId");
    navigate("/");
  };

  const navigateAuth = () => {
    navigate("/auth");
  };

  return (
    <>
      {mobile || props?.isMobile ? (
        <Flex w={"80%"} p={"1em"}>
          <Box p={"0.2em"} backgroundColor={"inherit"}>
            <HamburgerIcon
              fontSize={"1.2em"}
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
                    <Link style={{ textDecoration: "none" }}>
                        <Box>
                          <Button
                            _hover={{
                              backgroundColor: "transparent",
                              color: "black",
                            }}
                            border={"none"}
                            variant={"outline"}
                            color={"black"}
                            cursor={"default"}
                          >
                            Welcome {props?.name} {props?.surname}
                          </Button>
                        </Box>
                      </Link>
                     
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
                            color={"black"}
                          >
                            Dashboard
                          </Button>
                        </Box>
                      </Link>
                      <Link style={{ textDecoration: "none" }}>
                        <Box>
                          <Button
                            _hover={{
                              backgroundColor: "transparent",
                              color: "black",
                            }}
                            border={"none"}
                            variant={"outline"}
                            color={"black"}
                            cursor={"default"}
                          >
                            Welcome {props?.name} {props?.surname}
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
                            color={"black"}
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
                          color={"black"}
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
          alignItems={"center"}
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
                <Text border={"none"} cursor={"default"} fontWeight={"bold"}>
                  Welcome {props?.name} {props?.surname}
                </Text>
              </Box>

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
                  onClick={navigateAuth}
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
