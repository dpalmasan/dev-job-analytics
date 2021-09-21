import { CircularProgress, useColorMode } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import React, { FC } from 'react';
import { ChartLine } from './Detail';

interface DetailChartProps {
  jobsOpenByDate: ChartLine[];
  loading: boolean;
}

export const DetailChart: FC<DetailChartProps> = ({
  jobsOpenByDate,
  loading,
}) => {
  const { colorMode } = useColorMode();
  for (let i = 0; i < jobsOpenByDate.length; i++) {
    const chartData = jobsOpenByDate[i];
    for (let j = 0; j < chartData.data.length; j++) {
      const value = chartData.data[j];
      value.x = new Date(value.x).toLocaleDateString();
    }
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
    <div data-testid='chart-id-detail-chart' style={{ height: '100%' }}>
      <ResponsiveLine
        lineWidth={3}
        colors={{ scheme: 'nivo' }}
        data={jobsOpenByDate}
        margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
        xScale={{ type: 'point' }}
        theme={{ textColor: colorMode === 'light' ? 'black' : 'white' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        tooltip={({ point }) => (
          <div
            data-testid='point'
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 12,
              color: colorMode === 'light' ? 'black' : 'white',
              background: colorMode === 'light' ? 'white' : '#222222',
            }}
          >
            <strong>{point.serieId}</strong>
            <strong>
              Date: {new Date(point.data.x).toLocaleDateString()} Jobs:{' '}
              {Number(point.data.y).toLocaleString()}
            </strong>
          </div>
        )}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Day',
          legendOffset: 26,
          legendPosition: 'middle',
          tickValues: 5,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: 'Jobs Open',
          legendOffset: -55,
          legendPosition: 'middle',
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
