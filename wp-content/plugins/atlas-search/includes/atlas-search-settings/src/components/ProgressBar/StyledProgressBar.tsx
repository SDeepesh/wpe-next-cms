import React from 'react';
import styled from '@emotion/styled';

import { Box, Text } from 'rebass';

const Container = styled(Box)`
  height: 50px;
  width: 100%;
  border-radius: 40;
`;

type ProgressProps = {
  value: number;
};

const Progress = styled.div<ProgressProps>`
  height: 100%;
  width: ${(props) => props.value}%;
  background-color: rgb(126, 92, 239);
  transition: width 1s ease-in-out;
`;

type ProgressBarProps = {
  value: number;
};

const ProgressBar = ({ value = 0, ...rest }: ProgressBarProps) => {
  return (
    <Container backgroundColor="whitesmoke" {...rest}>
      <Progress value={value}>
        <Text
          fontWeight={600}
          fontSize={20}
          textAlign="center"
          p={15}
          color="#fff"
        >
          {Math.round((value / 100) * 100)}%
        </Text>
      </Progress>
    </Container>
  );
};

export default ProgressBar;
