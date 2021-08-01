import { Button } from "@chakra-ui/react";
import React from "react";

interface GoButtonProps {
  onSearch: () => void;
}

export const GoButton = ({ onSearch }: GoButtonProps) => {
  return (
    <Button
      isLoading={false}
      loadingText="Submitting"
      colorScheme="teal"
      variant="outline"
      width={"50%"}
      onClick={() => onSearch()}
    >
      Go
    </Button>
  );
};
