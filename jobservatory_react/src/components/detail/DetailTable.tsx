import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { getTechonolgies } from "../../fakeFinalData";

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
          {technologies.map(({ name, jobs }) => {
            return <Th>{name}</Th>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {technologies.map(({ name, jobs }) => {
          return (
            <Tr>
              <Td>{name}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
              <Td> {jobs}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
