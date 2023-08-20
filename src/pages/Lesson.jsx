import React, { useState, useEffect } from 'react'
import { Text, Box, VStack, Button } from '@chakra-ui/react';
import { FaMicrophone, FaCheck } from "react-icons/fa";
import {Link} from "react-router-dom";

const generate = async () => {
  const key = "uMOsOiLKyUjoJL1fIoqVUhUiveizJt2Qdslj64Bw";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },

    body: JSON.stringify({
      model: "command",
      prompt: "Generate a random cohesive sentence everytime, don't put a prefacing sentence",
      temperature: 0,
      max_tokens: 3000,
    }),
  };

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", options);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 
function Lesson() {
    const [bgColour, setBgColour] = useState("green.100");
    const [generatedText, setGeneratedText] = useState("");

    useEffect(() => {
      generate().then((response) => {
        const text = response.generations[0].text.trim();
        setGeneratedText(text);
      });
    }, []);

const handleGenerate = () => {
    generate().then((response) => {
      const text = response.generations[0].text.trim();
      setGeneratedText(text);
    });
  };
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
