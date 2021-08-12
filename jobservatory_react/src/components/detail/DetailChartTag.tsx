import { HStack, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import React from "react";
import { ChartLine } from "./Detail";

interface DetailChartTagProps {
  formattedChartData: ChartLine[];
  removeElementOnChart: (chartID: string) => void;
}

export const DetailChartTag = ({
  formattedChartData,
  removeElementOnChart,
}: DetailChartTagProps) => {
  return (
    <HStack spacing={4}>
      {formattedChartData.map((charData: any) => {
        return (
          <Tag
            size={"lg"}
            key={"lg"}
            borderRadius="full"
            variant="solid"
            colorScheme={"telegram"}
          >
            <TagLabel>{charData.id}</TagLabel>
            <TagCloseButton onClick={() => removeElementOnChart(charData.id)} />
          </Tag>
        );
      })}
    </HStack>
  );
};
