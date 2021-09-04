import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, theme } from '@chakra-ui/react';
import React, { FC, useState } from 'react';

interface SearchBarProps {
  fetchTechByName: (searchValue: string) => Promise<void>;
}
export const SearchBar: FC<SearchBarProps> = ({ fetchTechByName }) => {
  const [searchValue, setSearchValue] = useState('');
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      fetchTechByName(searchValue);
    }
  };

  return (
    <InputGroup
      size='lg'
      borderColor='grey'
      color={theme.colors.teal}
      style={{ paddingRight: 10 }}
      onKeyPress={(e) => handleKeyDown(e)}
    >
      <InputLeftElement
        color={theme.colors.teal}
        pointerEvents='none'
        fontSize='1.2em'
        children={<SearchIcon color='green.500' />}
      />
      <Input
        color={theme.colors.teal}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Add technologies: React, Ruby ...'
      />
    </InputGroup>
  );
};
