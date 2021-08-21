import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input, theme } from "@chakra-ui/react";
import React from "react";

export const SearchBar = () => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log(" Enter pressed");
    }
  };

  return (
    <InputGroup
      size="lg"
      borderColor="grey"
      color={theme.colors.teal}
      style={{ paddingRight: 10 }}
      onKeyPress={(e) => handleKeyDown(e)}
    >
      <InputLeftElement
        color={theme.colors.teal}
        pointerEvents="none"
        fontSize="1.2em"
        children={<SearchIcon color="green.500" />}
      />
      <Input
        color={theme.colors.teal}
        placeholder="Add technologies: React, Ruby ..."
      />
    </InputGroup>
  );
};
