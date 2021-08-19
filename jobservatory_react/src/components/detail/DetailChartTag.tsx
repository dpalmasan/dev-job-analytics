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
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {formattedChartData.map((charData: any, index) => {
        return (
          <div style={{ margin: 3 }}>
            <Tag
              size={"lg"}
              key={index}
              borderRadius="full"
              variant="solid"
              colorScheme={"telegram"}
            >
              <TagLabel>{charData.id}</TagLabel>
              <TagCloseButton
                onClick={() => removeElementOnChart(charData.id)}
              />
            </Tag>
          </div>
        );
      })}
    </div>
  );
};
