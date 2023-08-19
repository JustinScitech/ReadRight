import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

function SignupPage() {
    return (
        <VStack spacing={6} p={8} align="center" className="bg-gray-100 min-h-screen">
            <Heading as="h1" size="2xl" color="blue.500">Join ReadRight</Heading>
            <Text>Enhance your reading skills today!</Text>

            <Box p={6} w="sm" shadow="md" borderWidth="1px" borderRadius="md" className="bg-white">
                <form>
                    <VStack spacing={4}>
                    
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" placeholder="email@example.com" required />
                        </FormControl>
                        
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="********" required />
                        </FormControl>
                        <Button as={RouterLink} to="/lesson" className = "hover-rise" colorScheme="green" type="submit" w="full">SIGN UP</Button>
                        

                        
                    </VStack>
                </form>
            </Box>
            <Text>
                Already have an account?{" "}
                <Link as={RouterLink} to="/login" color="blue.500">Log in</Link>
            </Text>
        </VStack>
    );
}

export default SignupPage;
