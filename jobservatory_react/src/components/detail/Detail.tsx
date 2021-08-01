import { StatGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { getTechonolgies } from "../../fakeFinalData";
import { SearchBar } from "../search-bar/SearchBar";
import { Card } from "../stats/Card";
import "./../../styles/detail.scss";
import { DetailChart } from "./DetailChart";
import { DetailTable } from "./DetailTable";

export const Detail = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [technologies, setTechnologies] = useState([]);

  const getTechnologiesData = () => {
    const getData = async () => {
      try {
        const chartElements = [];
        const techs = await getTechonolgies();
        const dataArray = techs.data;
        const techWithJobsOpen = dataArray.map((value: any) => {
          return { name: value.name, jobsOpenArray: value.jobs_open };
        });
        console.log("techWithJobsOpen :>> ", techWithJobsOpen);
        // console.log("dataArray :>> ", dataArray[0]);
        // const jobsOpenArray = dataArray[0]["jobs_open"];
        // console.log("jobsOpenArray :>> ", jobsOpenArray[0]);
        // const jobsOpenByCountry = jobsOpenArray.map((val: any) => val.country);
        // const technologiesFormatted = jobsOpenByCountry[0].map(
        //   (value: any) => ({
        //     name: value.name,
        //     jobs: value.jobs,
        //   })
        // );

        // console.log("technologiesFormatted :>> ", technologiesFormatted);
        setChartData(techWithJobsOpen);
        // setTechnologies(technologiesFormatted);
      } catch (error) {
        console.log("Error in fetch data");
      }
    };
    getData();
  };

  useEffect(() => {
    //fetch data
    getTechnologiesData();

    //setChartData(fakeChartData);
  }, []);

  return (
    <div className="detail-container">
      <div className="color-switcher">
        <ColorModeSwitcher />
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <StatGroup borderWidth="1px" borderRadius="lg">
        <div className="stats">
          <Card title={"Last 24 Hours"} value={13239} percentage={23.36} />
          <Card title={"Last Week Hours"} value={52129} percentage={53.96} />
          <Card title={"Last Month Hours"} value={123283} percentage={-2.9} />
          <Card title={"1 Year"} value={348327} percentage={45.13} />
        </div>
      </StatGroup>
      <div style={{ minHeight: "40%", marginTop: 100 }}>
        <DetailChart chartData={chartData} />
      </div>
      <div className="detail-table">
        {/* <DetailTable technologies={technologies} /> */}
      </div>
    </div>
  );
};
