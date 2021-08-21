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
    <div className="tag-container">
      {formattedChartData.map((charData: ChartLine, index) => {
        return (
          <div style={{ margin: 3 }} key={index}>
            <Tag
              size="lg"
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
