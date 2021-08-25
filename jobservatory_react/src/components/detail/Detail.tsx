import {
  CircularProgress,
  Select,
  Stack,
  theme,
  Text,
  Image,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  fetchCountriesData,
  fetchQuestionsData,
  fetchTechnologiesData,
} from "../../api";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { SearchBar } from "../search-bar/SearchBar";
import "./../../styles/detail.scss";
import { DetailChart } from "./DetailChart";
import { DetailChartTag } from "./DetailChartTag";
import { DetailCountry } from "./DetailCountry";
import { DetailStackOverFlowChart } from "./DetailStackOverFlowChart";
import logo from "./../../images/vector-person-looking-in-binoculars-illustration.jpg";
interface Point {
  x: any; //date
  y: number;
}

export interface ChartLine {
  id: string;
  color: string;
  data: Point[];
}

export const Detail = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [technologies, setTechnologies] = useState([]);
  const [formattedChartData, setFormattedChartData] = useState<ChartLine[]>([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTechnologiesData = () => {
    const getData = async () => {
      const technologiesResult = await fetchTechnologiesData();
      technologiesResult.splice(10);
      setFormattedChartData(technologiesResult);
    };
    getData();
  };

  const getTechnologiesByCountriesData = () => {
    const getData = async () => {
      const countriesResult = await fetchCountriesData();
      countriesResult.splice(10);
      setTechnologies(countriesResult);
    };
    getData();
  };

  const getStackOverFlowData = () => {
    const getData = async () => {
      const questionsResult = await fetchQuestionsData();
      questionsResult.splice(10);
      setQuestions(questionsResult);
    };
    getData();
  };

  useEffect(() => {
    getTechnologiesData();
    getTechnologiesByCountriesData();
    getStackOverFlowData();
    setIsLoading(false);
  }, []);

  const removeElementOnChart = (chartID: string) => {
    let currentFormattedData = [...formattedChartData];
    const indexOfElementToRemove = currentFormattedData.findIndex(
      (value: any) => value.id === chartID
    );
    currentFormattedData.splice(indexOfElementToRemove, 1);
    setFormattedChartData([...currentFormattedData]);
  };

  return isLoading ? (
    <CircularProgress isIndeterminate color="green.300" />
  ) : (
    <div>
      <div
        style={{
          backgroundColor: theme.colors.linkedin[800],
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <Heading
            size="md"
            fontSize="35px"
            style={{
              display: "flex",
              marginLeft: 100,
              alignItems: "center",
            }}
            textColor={"white"}
          >
            <Image
              borderRadius="full"
              boxSize="70px"
              src={logo}
              alt="jobservatory logo"
              style={{ marginRight: 15 }}
            />
            Jobservatory
          </Heading>
          <ColorModeSwitcher />
        </div>
      </div>
      <div className="detail-container">
        <div className="technologies-input-container">
          <SearchBar />
          <Select
            size="lg"
            borderColor="grey"
            color={theme.colors.teal}
            value={"01/08/2021"}
            maxWidth={"200px"}
            placeholder={"August 2021 "}
          />
        </div>
        <div>
          <DetailChartTag
            removeElementOnChart={removeElementOnChart}
            formattedChartData={formattedChartData}
          />
        </div>

        <div className="detail-chart-container">
          <Heading
            size="md"
            fontSize="35px"
            textAlign="center"
            color={colorMode === "light" ? theme.colors.linkedin[800] : "white"}
          >
            Jobs open by day
          </Heading>

          <DetailChart formattedChartData={formattedChartData} />
          {/* <div className="stats-container">
          <Card percentage={7.8} value={101127} title={"React"}></Card>
          <Card percentage={-12.3} value={23018} title={"Angular"}></Card>
        </div> */}
        </div>

        <div className="detail-chart-country">
          <Heading
            size="md"
            fontSize="35px"
            marginTop="40px"
            textAlign="center"
            color={colorMode === "light" ? theme.colors.linkedin[800] : "white"}
          >
            Jobs open by country
          </Heading>
          <DetailCountry chartData={technologies} />
        </div>
        <div className="detail-chart-container">
          <Heading
            size="md"
            fontSize="35px"
            marginTop="120px"
            textAlign="center"
            color={colorMode === "light" ? theme.colors.linkedin[800] : "white"}
          >
            StackOverFlow activity
          </Heading>
          <DetailStackOverFlowChart formattedChartData={questions} />
        </div>
      </div>
    </div>
  );
};
