import { color, ColorMode, useColorMode } from '@chakra-ui/react';
import { TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ChartLine } from '../detail/Detail';

interface SearchBarProps {
  jobsOpenByDate: ChartLine[];
  listOfTechs: string[];
  fetchTechByName: (searchValue: string) => Promise<void>;
}
interface Item {
  value: string;
  title: string;
}
export const SearchBar: FC<SearchBarProps> = ({
  jobsOpenByDate,
  listOfTechs,
  fetchTechByName,
}) => {
  const [technologiesOptions, setTechnologiesOptions] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState('');
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
    if (event.key !== 'Enter' || jobSet.has(searchValue)) return;
    fetchTechByName(searchValue);
  };

  const onSelectTag = (event: ChangeEvent<{}>, value: Item | null) => {
    if (value) {
      setSearchValue(value.value);
    }
  };

  return (
    <Autocomplete
      autoHighlight={true}
      id='combo-box-demo'
      options={technologiesOptions}
      getOptionLabel={(option: Item) => option.title}
      style={{ flex: '1', marginRight: 10 }}
      onKeyPress={handleKeyDown}
      onChange={onSelectTag}
      renderInput={(params: any) => (
        <TextField
          {...params}
          data-testid='input-searchbar-group'
          label='Add technologies: React, Ruby ...'
          variant='outlined'
          InputLabelProps={{
            style: {
              color: colorMode === 'dark' ? 'white' : 'black',
            },
          }}
        />
      )}
    />
  );
};
