import { useColorMode } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import React, { FC } from "react";
import { Card } from "../stats/Card";
import { ChartLine } from "./Detail";
import { ResponsiveLineComponent } from "./ResponsiveLineComponent";

interface DetailChartProps {
  formattedChartData: ChartLine[];
}

export const DetailChart: FC<DetailChartProps> = ({ formattedChartData }) => {
  return <ResponsiveLineComponent formattedChartData={formattedChartData} />;
};
