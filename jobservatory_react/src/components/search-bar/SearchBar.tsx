import { color, ColorMode, useColorMode } from '@chakra-ui/react';
import { TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ChartLine } from '../detail/Detail';

interface SearchBarProps {
  jobsOpenByDate: ChartLine[];
  listOfTechs: string[];
  searchValue: Item;
  fetchTechByName: (searchValue: string) => Promise<void>;
  onSelectTag: (event: ChangeEvent<{}>, value: Item | null) => void;
}
export interface Item {
  value: string;
  title: string;
}
export const SearchBar: FC<SearchBarProps> = ({
  jobsOpenByDate,
  listOfTechs,
  searchValue,
  fetchTechByName,
  onSelectTag,
}) => {
  const [technologiesOptions, setTechnologiesOptions] = useState<Item[]>([]);
  const [jobSet, setJobSet] = useState<Set<string>>(new Set());
  const { colorMode } = useColorMode();

  useEffect(() => {
    const techsToShow = [];
    const tempSet = new Set<string>();
    if (jobsOpenByDate && jobsOpenByDate.length > 0) {
      for (let i = 0; i < jobsOpenByDate.length; i++) {
        const job = jobsOpenByDate[i];
        tempSet.add(job.id);
      }
      for (let i = 0; i < listOfTechs.length; i++) {
        const tech = listOfTechs[i];
        if (!tempSet.has(tech)) {
          techsToShow.push({ value: tech, title: tech });
        }
      }
      setJobSet(tempSet);
      setTechnologiesOptions(techsToShow);
    }
  }, [jobsOpenByDate, listOfTechs]);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      '--color-mode',
      colorMode === 'light' ? 'black !important' : 'white !important',
    );
  }, [colorMode]);

  const handleKeyDown = (event: any) => {
    console.log('event', event);
    let tech = searchValue?.title;
    if (event.key !== 'Enter') return;
    console.log('tech', tech);
    if (tech != null && jobSet.has(tech)) return;
    console.log('tech 2', tech);
    if (tech != null) {
      console.log('tech 3', searchValue);
      fetchTechByName(tech);
    }
  };
  console.log(`searchValue`, searchValue);
  return (
    <Autocomplete
      autoHighlight={true}
      data-testid='combo-box-search-bar'
      options={technologiesOptions}
      getOptionLabel={(option: Item) => option.title}
      getOptionSelected={(option: Item) => option.title === searchValue.title}
      style={{ flex: '1', marginRight: 10 }}
      onKeyPress={handleKeyDown}
      onChange={onSelectTag}
      renderInput={(params: any) => {
        console.log('params ==>', params);
        return (
          <TextField
            {...params}
            // inputProps={{ id: 'plopID' }}
            data-testid='input-searchbar-group'
            label='Add technologies: React, Ruby ...'
            variant='outlined'
            InputLabelProps={{
              style: {
                color: colorMode === 'dark' ? 'white' : 'black',
              },
            }}
          />
        );
      }}
    />
  );
};
