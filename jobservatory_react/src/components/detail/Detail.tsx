import { AddIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  theme,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { getTechonolgies } from "../../fakeFinalData";
import { SearchBar } from "../search-bar/SearchBar";
import { Card } from "../stats/Card";
import "./../../styles/detail.scss";
import { DetailChart } from "./DetailChart";
import { DetailChartTag } from "./DetailChartTag";
import { DetailCountry } from "./DetailCountry";

interface Point {
  x: string;
  y: number;
}

export interface ChartLine {
  id: string;
  color: string;
  data: Point[];
}

export const Detail = () => {
  const [technologies, setTechnologies] = useState([]);
  const [formattedChartData, setFormattedChartData] = useState<ChartLine[]>([]);

  const getTechnologiesData = () => {
    const getData = async () => {
      try {
        const techs = await getTechonolgies();
        const dataArray = techs.data;
        const chartData = dataArray.map((value: any) => {
          return { name: value.name, jobsOpenArray: value.jobs_open };
        });
        const jobsOpenArray = dataArray[0]["jobs_open"];
        const jobsOpenByCountry = jobsOpenArray.map((val: any) => val.country);
        const technologiesFormatted = jobsOpenByCountry[0].map(
          (value: any) => ({
            name: value.name,
            jobs: value.jobs,
          })
        );
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
        }

        setFormattedChartData(finalChartData);
        setTechnologies(technologiesFormatted);
      } catch (error) {
        console.log("Error in fetch data");
      }
    };
    getData();
  };

  useEffect(() => {
    getTechnologiesData();
  }, []);

  const removeElementOnChart = (chartID: string) => {
    let currentFormattedData = [...formattedChartData];
    const indexOfElementToRemove = currentFormattedData.findIndex(
      (value: any) => value.id === chartID
    );
    currentFormattedData.splice(indexOfElementToRemove, 1);
    setFormattedChartData([...currentFormattedData]);
  };

  return (
    <div className="detail-container">
      <div className="color-switcher">
        <ColorModeSwitcher />
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="technologies-input-container">
        <InputGroup style={{ width: 400 }}>
          <Input placeholder="Add technology or occupation" />
          <InputRightElement children={<AddIcon color={"facebook"} />} />
        </InputGroup>
        <Select
          borderColor="grey"
          color={theme.colors.teal}
          value={"01/08/2021"}
          width={"160px"}
          placeholder={"August 2021"}
        />
      </div>
      <DetailChartTag
        removeElementOnChart={removeElementOnChart}
        formattedChartData={formattedChartData}
      />
      <div className="detail-chart-container">
        <DetailChart formattedChartData={formattedChartData} />
        <div className="stats-container">
          <Card percentage={7.8} value={101127} title={"React"}></Card>
          <Card percentage={-12.3} value={23018} title={"Angular"}></Card>
        </div>
      </div>

      <div className="detail-chart-country">
        <DetailCountry chartData={technologies} />
      </div>
    </div>
  );
};
