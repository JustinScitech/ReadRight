import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, VStack, Badge, Button, HStack, Divider} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import {Link} from 'react-router-dom';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
function Results() {
  const correctAnswers = 8;
  const totalQuestions = 10; 
  const accuracy = (correctAnswers/totalQuestions) * 100;
  const timeData = 398;
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
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
  

  

  return (
    <VStack spacing={4} align="center" mt={6}>
      <HStack spacing={8} align="top" mt={6}>
      <VStack>
      <Text fontSize="2xl" fontWeight="bold">
        Accuracy: {accuracy}%
      </Text>
      <Box width="300px" height="300px">
        <Doughnut data={data} options={options} />
      </Box>
      </VStack>
      <VStack>
      <Text fontSize="2xl" fontWeight="bold">
        Total time: {timeData}s
      </Text>
      <Box width="300px" height="270px" display="flex" alignItems="center" justifyContent="center">
            <FaClock size="280px" />
          </Box>
      </VStack>
      </HStack>
      <Divider/>
      <Text fontSize="lg">
        You got <Badge colorScheme="green" fontSize="lg">{correctAnswers}</Badge> out of <Badge colorScheme="gray" fontSize="lg">{totalQuestions}</Badge> words right!
      </Text>
      <Text fontSize="lg">
        You got <Badge colorScheme="green" fontSize="lg">{correctAnswers}</Badge> coins!
      </Text>
      <Divider/>
      <br/>
      <Button className="hover-rise"
              colorScheme="blue"
              size="lg"
              shadow="md">
        Submit Results
      </Button>
      <Link to='/lesson'>
      <Button
              className="hover-rise"
              variant="outline"
              colorScheme="blue"
              size="lg"
            >
        Go back
      </Button>
      </Link>
    </VStack>
  )
}

export default Results;
