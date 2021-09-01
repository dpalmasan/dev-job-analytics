import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { ChartLine } from "./Detail";
interface DetailChartTagProps {
  removeElementOnChart: (chartID: string) => void;
}

export const DetailChartTag = ({
  removeElementOnChart,
}: DetailChartTagProps) => {
  const { jobsOpenByDate } = useSelector((state: RootState) => state.detail);
  return jobsOpenByDate.length > 0 ? (
    <div className="tag-container">
      {jobsOpenByDate.map((charData: ChartLine, index) => {
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
  ) : null;
};
