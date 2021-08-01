import { Box } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { FC, useEffect, useState } from "react";

interface Point {
  x: string;
  y: number;
}

interface ChartLine {
  id: string;
  color: string;
  data: Point[];
}

interface DetailChartProps {
  chartData: [
    { name: string; jobsOpenArray: [{ date: string; jobs_total: number }] }
  ];
}

export const DetailChart: FC<DetailChartProps> = ({ chartData }) => {
  const [formattedChartData, setFormattedChartData] = useState<any>([]);

  useEffect(() => {
    console.log("chartData :>> ", chartData);
    const chartLine: ChartLine = {
      id: "",
      color: "hsl(207, 70%, 50%)",
      data: [],
    };
    const finalChartData = [];
    for (let i = 0; i < chartData.length; i++) {
      chartLine.id = chartData[i].name;
      for (let j = 0; j < chartData[i].jobsOpenArray.length; j++) {
        let point: Point = { x: "", y: 0 };
        point.x = chartData[i].jobsOpenArray[j].date;
        point.y = chartData[i].jobsOpenArray[j].jobs_total;
        chartLine.data.push(point);
      }
      finalChartData.push({ ...chartLine });
      console.log("finalChartData :>> ", finalChartData);
    }

    setFormattedChartData(finalChartData);
  }, [chartData]);

  return (
    <div className="chart-container">
      <div style={{ flex: 1 }}>
        <Box
          fontSize={"large"}
          fontWeight={"bold"}
          textStyle="h1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          2020 - Jobs open
        </Box>
        <ResponsiveLine
          lineWidth={3}
          data={formattedChartData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Day",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
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
      </div>
      <div
        style={{
          flex: 1,
          marginLeft: 150,
        }}
      >
        <Box
          fontSize={"large"}
          fontWeight={"bold"}
          textStyle="h1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          2021 - Jobs open
        </Box>
        <ResponsiveLine
          lineWidth={3}
          data={formattedChartData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Day",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
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
      </div>
    </div>
  );
};
