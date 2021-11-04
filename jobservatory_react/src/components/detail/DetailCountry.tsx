import { CircularProgress, useColorMode } from '@chakra-ui/react';
import { ResponsiveBar } from '@nivo/bar';
import React, { FC } from 'react';
import { DataByCountry } from '../../features/detail/reducer';

interface DetailCountryProps {
  jobsOpenByCountry: DataByCountry[];
  loading: boolean;
}

export const DetailCountry: FC<DetailCountryProps> = ({
  jobsOpenByCountry,
  loading,
}) => {
  const { colorMode } = useColorMode();
  const arrayFormattedToShow = [];
  const setOfCountry = new Set();
  for (let i = 0; i < jobsOpenByCountry.length; i++) {
    const dataElement = jobsOpenByCountry[i];
    let objectFormatted: any = {};
    objectFormatted.name = dataElement.name;
    for (let j = 0; j < dataElement.countries.length; j++) {
      const countryData = dataElement.countries[j];
      setOfCountry.add(countryData.name);
      objectFormatted[`${countryData.name}`] = countryData.jobs;
    }
    arrayFormattedToShow.push(objectFormatted);
  }
  return loading ? (
    <div className='loading-container'>
      <CircularProgress
        data-testid={'LOADING'}
        value={30}
        size='120px'
        isIndeterminate
      />
    </div>
  ) : (
    <ResponsiveBar
      data={arrayFormattedToShow}
      keys={Array.from(setOfCountry)}
      indexBy='name'
      margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
      padding={0.3}
      theme={{ textColor: colorMode === 'light' ? 'black' : 'white' }}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'paired' }}
      labelFormat={{ color: colorMode === 'light' ? 'black' : 'white' }}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 12,
            color: colorMode === 'light' ? 'black' : 'white',
            background: colorMode === 'light' ? 'white' : '#222222',
          }}
        >
          <strong>
            {id}: {Number(value).toLocaleString()}
          </strong>
        </div>
      )}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'Country',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 0,
        tickRotation: 0,
        legend: 'Jobs open',
        legendPosition: 'middle',
        legendOffset: -60,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 30,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
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
