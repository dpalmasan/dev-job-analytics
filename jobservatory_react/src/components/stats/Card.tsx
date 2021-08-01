import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface CardProps {
  title: string;
  percentage: number;
  value: number;
}

export const Card: FC<CardProps> = ({ title, value, percentage }) => {
  return (
    <Stat>
      <StatLabel>{title}</StatLabel>
      <StatNumber>{value ? value.toLocaleString() : 0}</StatNumber>
      <StatHelpText>
        <StatArrow type={percentage > 0 ? "increase" : "decrease"} />
        {percentage}
        {"%"}
      </StatHelpText>
    </Stat>
  );
};
