import { Heading, Image, Select, theme, useColorMode } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {
  addTechData,
  fetchData,
  removeTech,
} from '../../features/detail/action-creators';
import { RootState } from '../../features/store';
import { Item, SearchBar } from '../search-bar/SearchBar';
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
  const {
    jobsOpenByDate,
    loading,
    jobsOpenByCountry,
    error,
    questionsOpen,
    listOfTechs,
  } = useSelector((state: RootState) => state.detail);
  const dispatch = useDispatch();
  const [currentColor, setCurrentColor] = useState('white');
  const { colorMode } = useColorMode();
  const [searchValue, setSearchValue] = useState<Item>({
    value: '',
    title: '',
  });

  useEffect(() => {
    if (colorMode === 'light') {
      setCurrentColor(theme.colors.linkedin[800]);
    } else {
      setCurrentColor('white');
    }
  }, [colorMode]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const fetchTechByName = async (searchValue: string) => {
    console.log('searchValue initial', searchValue);
    const alreadyExists = jobsOpenByDate.some(
      (jobOpen) => jobOpen.id === searchValue,
    );
    console.log('searchValue', searchValue);
    if (alreadyExists) return;
    console.log('NO EXISTE');
    dispatch(addTechData(searchValue));
  };

  const removeElementOnChart = (chartID: string) => {
    dispatch(removeTech(chartID));
  };

  const onSelectTag = (event: ChangeEvent<{}>, value: Item | null) => {
    if (value) {
      setSearchValue(value);
    }
  };

  return error ? (
    <div>{error}</div>
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
              data-testid='logo-id'
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
          <SearchBar
            listOfTechs={listOfTechs}
            jobsOpenByDate={jobsOpenByDate}
            searchValue={searchValue}
            fetchTechByName={fetchTechByName}
            onSelectTag={onSelectTag}
          />
          <Select
            data-testid='date-select-id'
            size='lg'
            borderColor='grey'
            color={theme.colors.teal}
            defaultValue={'01/08/2021'}
            maxWidth={'200px'}
            placeholder={'August 2021 '}
          />
        </div>
        <div data-testid='detail-chart-tag-container-id'>
          <DetailChartTag
            removeElementOnChart={removeElementOnChart}
            jobsOpenByDate={jobsOpenByDate}
            loading={loading}
          />
        </div>
        <div
          className='common-chart-container'
          data-testid='detail-chart-container-id'
        >
          <Heading
            size='md'
            fontSize='35px'
            textAlign='center'
            color={currentColor}
          >
            Jobs open by day
          </Heading>

          <DetailChart jobsOpenByDate={jobsOpenByDate} loading={loading} />
        </div>

        <div
          className='detail-chart-country'
          data-testid='detail-chart-country-container-id'
        >
          <Heading
            size='md'
            fontSize='35px'
            marginTop='40px'
            textAlign='center'
            color={currentColor}
          >
            Jobs open by country
          </Heading>
          <DetailCountry
            jobsOpenByCountry={jobsOpenByCountry}
            loading={loading}
          />
        </div>
        <div
          className='common-chart-container'
          data-testid='questions-chart-container-id'
        >
          <Heading
            size='md'
            fontSize='35px'
            marginTop='120px'
            textAlign='center'
            color={currentColor}
          >
            StackOverFlow activity
          </Heading>
          <DetailStackOverFlowChart
            questionsOpen={questionsOpen}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
