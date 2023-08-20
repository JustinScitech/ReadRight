import React, {useEffect} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Text, VStack, Badge, Button, HStack, Divider} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from 'axios';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);
function Results() {
  const [accuracy, setAccuracy] = React.useState(0);
  const [timeData, setTimeData] = React.useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/data').then(response => {
      setAccuracy(response.data.similarityPercent);
      const randomDuration = Math.floor(Math.random() * (10 - 6 + 1) + 6);
      setTimeData(randomDuration);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [{
      data: [accuracy, 100 - accuracy],
      backgroundColor: ['#00FF00', '#FF0000'],
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
        You got <Badge colorScheme="green" fontSize="lg">{accuracy}% </Badge> out of the words right!
      </Text>
      <Text fontSize="lg">
        You got <Badge colorScheme="green" fontSize="lg">{accuracy}</Badge> coins!
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
