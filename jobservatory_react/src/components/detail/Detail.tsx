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
import { SearchBar } from "../search-bar/SearchBar";
import { Card } from "../stats/Card";
import "./../../styles/detail.scss";
import { DetailChart } from "./DetailChart";
import { DetailChartTag } from "./DetailChartTag";
import { DetailCountry } from "./DetailCountry";

interface Point {
  x: string; //date
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
        const techsPromise = await fetch(
          "http://localhost:5000/api/v1/technologies"
        );
        const techs = await techsPromise.json();
        const dataArray = techs.data;

        const chartLine: ChartLine = {
          id: "",
          color: "hsl(207, 70%, 50%)",
          data: [],
        };
        const finalChartData: ChartLine[] = [];

        const dataAsMap = new Map();
        const countryDataMap = new Map();

        for (let i = 0; i < dataArray.length; i++) {
          const element = dataArray[i];
          element.date = new Date(element.date).toLocaleDateString();
          if (!dataAsMap.has(element.name)) {
            dataAsMap.set(element.name, [
              { x: element.date, y: element.jobs_total },
            ]);
          } else {
            dataAsMap.set(element.name, [
              ...dataAsMap.get(element.name),
              { x: element.date, y: element.jobs_total },
            ]);
          }
        }

        const getCountryDistributionOfCurrentDay = () => {
          const element = dataArray;
          if (!countryDataMap.has(element.name)) {
            countryDataMap.set(element.name, element.countries);
          } else {
            countryDataMap.set(element.name, [
              ...countryDataMap.get(element.name),
              ...element.countries,
            ]);
          }
        };
        getCountryDistributionOfCurrentDay();
        dataAsMap.forEach((v, k) => {
          chartLine.id = k;
          chartLine.data = v;
          finalChartData.push({ ...chartLine });
        });
        console.log("countryDataMap :>> ", countryDataMap);
        // for (let i = 0; i < dataArray.length; i++) {
        //   chartLine.id = dataArray[i].name;
        //   const date = dataArray[i].date;
        //   for (let j = 0; j < dataArray[i].countries.length; j++) {
        //     let point: Point = { x: "", y: 0 };
        //     point.x = date;
        //     point.y = dataArray[i].countries[j].jobs_total;
        //     chartLine.data.push(point);
        //   }
        //   finalChartData.push({ ...chartLine });
        // }

        setFormattedChartData(finalChartData);
        //
        // setTechnologies(chartData);
      } catch (error) {}
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
        {/* <div className="stats-container">
          <Card percentage={7.8} value={101127} title={"React"}></Card>
          <Card percentage={-12.3} value={23018} title={"Angular"}></Card>
        </div> */}
      </div>

      <div className="detail-chart-country">
        <DetailCountry chartData={technologies} />
      </div>
    </div>
  );
};
