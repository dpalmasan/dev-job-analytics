import { useColorMode } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import React, { FC } from "react";
import { ChartLine } from "./Detail";

interface DetailChartProps {
  formattedChartData: ChartLine[];
}

export const DetailChart: FC<DetailChartProps> = ({ formattedChartData }) => {
  const { colorMode, toggleColorMode } = useColorMode();

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
        legendOffset: 26,
        legendPosition: "middle",
        tickValues: 5,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 0,
        tickRotation: 0,
        legend: "Jobs Open",
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
