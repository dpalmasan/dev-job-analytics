import { useColorMode } from "@chakra-ui/react";
import { ResponsiveLine, Serie } from "@nivo/line";
import React from "react";
import { ChartLine } from "./Detail";
import { ResponsiveLineComponent } from "./ResponsiveLineComponent";

// export interface StackOverFlowQuestion {
//   id: string;
//   tag: string;
//   name: string;
//   count: number;
//   date: string;
// }

interface DetailStackOverFlowChartProps {
  formattedChartData: ChartLine[];
}

export const DetailStackOverFlowChart = ({
  formattedChartData,
}: DetailStackOverFlowChartProps) => {
  const { colorMode } = useColorMode();

  for (let i = 0; i < formattedChartData.length; i++) {
    const chartData = formattedChartData[i];
    for (let j = 0; j < chartData.data.length; j++) {
      const value = chartData.data[j];
      value.x = new Date(value.x).toLocaleDateString();
    }
  }
  return (
    <ResponsiveLine
      lineWidth={3}
      colors={{ scheme: "nivo" }}
      data={formattedChartData}
      margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
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
        tickRotation: -45,
        legend: "Day",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      tooltip={({ point }) => (
        <div
          style={{
            padding: 12,
            color: colorMode === "light" ? "black" : "white",
            background: colorMode === "light" ? "white" : "#222222",
          }}
        >
          <strong>
            {point.serieId}: {Number(point.data.y).toLocaleString()}
          </strong>
        </div>
      )}
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
