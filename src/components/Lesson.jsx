import React, { useState } from 'react'
import { Text, Box, VStack, Button } from '@chakra-ui/react';
import { FaMicrophone, FaCheck } from "react-icons/fa";
import {Link} from "react-router-dom";
function Lesson() {
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
                        LESSON TEXT
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
