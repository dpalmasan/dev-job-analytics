import React, { FC } from "react";
import { ChartLine } from "./Detail";
import { ResponsiveLineComponent } from "./ResponsiveLineComponent";

interface DetailChartProps {
  formattedChartData: ChartLine[];
}

export const DetailChart: FC<DetailChartProps> = ({ formattedChartData }) => {
  return <ResponsiveLineComponent formattedChartData={formattedChartData} />;
};
