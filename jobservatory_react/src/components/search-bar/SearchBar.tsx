import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";

export const SearchBar = () => {
  return (
    <InputGroup size="lg">
      <InputLeftElement
        pointerEvents="none"
        color="gray.300"
        fontSize="1.2em"
        children={<SearchIcon color="green.500" />}
      />
      <Input placeholder="Example: React, Ruby ..." />
    </InputGroup>
  );
};
