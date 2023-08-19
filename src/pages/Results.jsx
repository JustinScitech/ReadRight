import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
import { Box, Text, VStack, Badge } from '@chakra-ui/react';

function Results() {
  const correctAnswers = 8;
  const totalQuestions = 10; 

  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [{
      data: [correctAnswers, totalQuestions - correctAnswers],
      backgroundColor: ['#4CAF50', '#FFC107'],
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <VStack spacing={8} align="center" mt={6}>
      <Text fontSize="2xl" fontWeight="bold">
        RESULTS
      </Text>
      <Box width="300px" height="300px">
        <Doughnut data={data} options={options} />
      </Box>
      <Text fontSize="lg">
        You got <Badge colorScheme="green" fontSize="lg">{correctAnswers}</Badge> out of <Badge colorScheme="gray" fontSize="lg">{totalQuestions}</Badge> questions right!
      </Text>
    </VStack>
  )
}

export default Results;
