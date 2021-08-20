import React from "react";
import { ChartLine } from "./Detail";
import { ResponsiveLineComponent } from "./ResponsiveLineComponent";

export interface StackOverFlowQuestion {
  id: string;
  tag: string;
  name:string;
  count: number;
  date: string;
}

interface DetailStackOverFlowChartProps {
  formattedChartData: StackOverFlowQuestion[];
}

export const DetailStackOverFlowChart = ({
  formattedChartData,
}: DetailStackOverFlowChartProps) => {  
  formattedChartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartLine: ChartLine = {
    id: "",
    data: [],
    color: "hsl(207, 70%, 50%)"
  };
  const finalChartData: ChartLine[] = [];
        const dataAsMap = new Map();
        for (let i = 0; i < formattedChartData.length; i++) {
          const element = formattedChartData[i];
          element.date = new Date(element.date).toLocaleDateString();
          if (!dataAsMap.has(element.tag)) {
            dataAsMap.set(element.tag, [
              { x: element.date, y: element.count },
            ]);
          } else {
            dataAsMap.set(element.tag, [
              ...dataAsMap.get(element.tag),
              { x: element.date, y: element.count },
            ]);
          }
        }
        dataAsMap.forEach((v, k) => {
          chartLine.id = k;
          chartLine.data = v;
          finalChartData.push({ ...chartLine });
        });
  return (
    <ResponsiveLineComponent formattedChartData={finalChartData} />
  );
};
