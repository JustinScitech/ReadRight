import React, { useState, useEffect } from 'react'
import { Text, Box, VStack, Button } from '@chakra-ui/react';
import { FaMicrophone, FaCheck } from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from 'axios';
function Lesson() {
const [generatedText, setGeneratedText] = useState('');

useEffect(() => {
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/generate',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer uMOsOiLKyUjoJL1fIoqVUhUiveizJt2Qdslj64Bw'
      },
      data: {
        max_tokens: 20,
        truncate: 'END',
        return_likelihoods: 'NONE',
        prompt: 'Please explain to me how LLMs work'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setGeneratedText(response.data.choices[0].text);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

    const [bgColour, setBgColour] = useState("green.100");

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh" width="100%">
            <VStack spacing={6}>
                <Box
                    p={4}
                    borderWidth="2px"
                    borderRadius="lg"
                    boxShadow="lg"
                    borderColor="gray.300"
                    width="80%"
                >
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                        {generatedText}
                    </Text>
                </Box>
                <Button w="200px" h="100px" bg={bgColour} className="hover-rise" onClick={() => bgColour == "green.100" ? setBgColour("red.100") : setBgColour("green.100")}>
                    <FaMicrophone />
                </Button>
                <Link to="/results">
                <Button w="200px" h="50px" bg="green.500">
                    <FaCheck />
                </Button>
                </Link>
            </VStack>
        </Box>
    );
}

export default Lesson;
