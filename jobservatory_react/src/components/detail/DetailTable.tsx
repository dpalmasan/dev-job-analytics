import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { getTechonolgies } from "../../fakeFinalData";
import reactImage from "./../../images/reactImage.png";
import angularImage from "./../../images/angularImage.png";
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
