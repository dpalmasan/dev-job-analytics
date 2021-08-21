import { useColorMode } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { ChartLine } from "./Detail";
import { ResponsiveLineComponent } from "./ResponsiveLineComponent";

export interface StackOverFlowQuestion {
  id: string;
  tag: string;
  name: string;
  count: number;
  date: string;
}

interface DetailStackOverFlowChartProps {
  formattedChartData: StackOverFlowQuestion[];
}

export const DetailStackOverFlowChart = ({
  formattedChartData,
}: DetailStackOverFlowChartProps) => {
  formattedChartData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const { colorMode, toggleColorMode } = useColorMode();
  const chartLine: ChartLine = {
    id: "",
    data: [],
    color: "hsl(207, 70%, 50%)",
  };
  const finalChartData: ChartLine[] = [];
  const dataAsMap = new Map();
  for (let i = 0; i < formattedChartData.length; i++) {
    const element = formattedChartData[i];
    element.date = new Date(element.date).toLocaleDateString();
    if (!dataAsMap.has(element.tag)) {
      dataAsMap.set(element.tag, [{ x: element.date, y: element.count }]);
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
  for (let i = 0; i < finalChartData.length; i++) {
    const dataDatesArray = finalChartData[i];
    dataDatesArray.data.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
    );
  }

  return (
    <ResponsiveLine
      lineWidth={3}
      colors={{ scheme: "nivo" }}
      data={finalChartData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      theme={{ textColor: colorMode === "light" ? "black" : "white" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Day",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 0,
        legend: "Questions Asked",
        legendOffset: -55,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
