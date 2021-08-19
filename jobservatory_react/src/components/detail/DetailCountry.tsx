import { ResponsiveBar } from "@nivo/bar";

interface Country {
  name: string;
  jobs: number;
}
interface DataByCountry {
  countries: Country[];
  createdAt: string;
  date: string;
  jobs_total: number;
  name: string;
  _id: string;
}
interface DetailCountryProps {
  chartData: DataByCountry[];
}

export const DetailCountry = ({ chartData }: DetailCountryProps) => {
  const arrayFormattedToShow = [];
  const setOfCountry = new Set();
  for (let i = 0; i < chartData.length; i++) {
    const dataElement = chartData[i];
    let objectFormatted: any = {};
    objectFormatted.name = dataElement.name;
    for (let j = 0; j < dataElement.countries.length; j++) {
      const countryData = dataElement.countries[j];
      setOfCountry.add(countryData.name);
      objectFormatted[`${countryData.name}`] = countryData.jobs;
    }
    console.log("objectFormatted :>> ", objectFormatted);
    arrayFormattedToShow.push(objectFormatted);
  }

  return (
    <ResponsiveBar
      data={arrayFormattedToShow}
      keys={Array.from(setOfCountry)}
      indexBy="name"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      valueFormat={{ format: "", enabled: false }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
