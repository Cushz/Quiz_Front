import React from "react";
import {
  Flex,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {ChevronDownIcon} from "@chakra-ui/icons"
export default function GroupSelection() {
  useEffect(() => {
    document.title = "Quiz App | Groups";
  });
  return (
    <div>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Box>
          <Menu>
            <MenuButton
              boxShadow={"4px 4px 1px black"}
              border={"2px solid black"}
              _hover={{ border: "2px solid black" }}
              focusBorderColor={"black"}
              cursor="pointer"
              placeholder="Group and Speciality"
              as={Button}
              rightIcon={<ChevronDownIcon />}
              backgroundColor={"white"}
            >
              Group and Speciality
            </MenuButton>
            <MenuList>
              <MenuItem>L0 Math</MenuItem>
              <MenuItem>L1 Math</MenuItem>
              <MenuItem>L2 Math</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </div>
  );
}
