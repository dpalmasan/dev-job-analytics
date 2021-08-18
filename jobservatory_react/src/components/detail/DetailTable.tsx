import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface DetailTableProps {
  technologies: any[];
}

export const DetailTable: FC<DetailTableProps> = ({ technologies }) => {
  console.log("technologies :>> ", technologies);
  return (
    <Table variant="striped" colorScheme="linkedin">
      <TableCaption>Number of open jobs by country</TableCaption>
      <Thead>
        <Tr>
          {/* {technologies.map(({ name, index, jobs }) => {
            return <Th key={index}>{name}</Th>;
          })} */}
          <Th></Th>
          <Th style={{ fontSize: 24, fontWeight: "bold" }}> React</Th>
          <Th style={{ fontSize: 24, fontWeight: "bold" }}> Angular</Th>
        </Tr>
      </Thead>
      <Tbody>
        {technologies.map(({ name, jobs }) => {
          return (
            <Tr>
              <Td>{name}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
