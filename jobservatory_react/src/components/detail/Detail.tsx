import { Heading, Image, Select, theme, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {
  addTechData,
  fetchData,
  removeTech,
} from '../../features/detail/action-creators';
import { RootState } from '../../features/store';
import { SearchBar } from '../search-bar/SearchBar';
import logo from './../../images/vector-person-looking-in-binoculars-illustration.jpg';
import './../../styles/detail.scss';
import { DetailChart } from './DetailChart';
import { DetailChartTag } from './DetailChartTag';
import { DetailCountry } from './DetailCountry';
import { DetailStackOverFlowChart } from './DetailStackOverFlowChart';
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
  const { jobsOpenByDate, loading, jobsOpenByCountry } = useSelector(
    (state: RootState) => state.detail,
  );
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const fetchTechByName = async (searchValue: string) => {
    dispatch(addTechData(searchValue));
  };

  const removeElementOnChart = (chartID: string) => {
    dispatch(removeTech(chartID));
  };

  return loading ? (
    <div>LOADING</div>
  ) : (
    <div>
      <div
        style={{
          backgroundColor: theme.colors.linkedin[800],
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <Heading
            size='md'
            fontSize='35px'
            style={{
              display: 'flex',
              marginLeft: 100,
              alignItems: 'center',
            }}
            textColor={'white'}
          >
            <Image
              borderRadius='full'
              boxSize='70px'
              src={logo}
              alt='jobservatory logo'
              style={{ marginRight: 15 }}
            />
            Jobservatory
          </Heading>
          <ColorModeSwitcher />
        </div>
      </div>
      <div className='detail-container'>
        <div className='technologies-input-container'>
          <SearchBar fetchTechByName={fetchTechByName} />
          <Select
            size='lg'
            borderColor='grey'
            color={theme.colors.teal}
            defaultValue={'01/08/2021'}
            maxWidth={'200px'}
            placeholder={'August 2021 '}
          />
        </div>
        <div>
          <DetailChartTag
            removeElementOnChart={removeElementOnChart}
            jobsOpenByDate={jobsOpenByDate}
            loading={loading}
          />
        </div>

        <div className='detail-chart-container'>
          <Heading
            size='md'
            fontSize='35px'
            textAlign='center'
            color={colorMode === 'light' ? theme.colors.linkedin[800] : 'white'}
          >
            Jobs open by day
          </Heading>

          <DetailChart jobsOpenByDate={jobsOpenByDate} loading={loading} />
        </div>

        <div className='detail-chart-country'>
          <Heading
            size='md'
            fontSize='35px'
            marginTop='40px'
            textAlign='center'
            color={colorMode === 'light' ? theme.colors.linkedin[800] : 'white'}
          >
            Jobs open by country
          </Heading>
          <DetailCountry
            jobsOpenByCountry={jobsOpenByCountry}
            loading={loading}
          />
        </div>
        <div className='detail-chart-container'>
          <Heading
            size='md'
            fontSize='35px'
            marginTop='120px'
            textAlign='center'
            color={colorMode === 'light' ? theme.colors.linkedin[800] : 'white'}
          >
            StackOverFlow activity
          </Heading>
          <DetailStackOverFlowChart />
        </div>
      </div>
    </div>
  );
};
