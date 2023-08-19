import React, {useState} from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate} from "react-router-dom";
import {auth} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    navigate('/lesson');
  } catch (error) {
    console.error('Signup error:', error);
    // Handle signup error
  }
};
    return (
        <VStack spacing={6} p={8} align="center" className="bg-gray-100 min-h-screen">
            <Heading as="h1" size="2xl" color="blue.500">Join ReadRight</Heading>
            <Text>Enhance your reading skills today!</Text>

            <Box p={6} w="sm" shadow="md" borderWidth="1px" borderRadius="md" className="bg-white">
                <form>
                    <VStack spacing={4}>
                    
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input value = {email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required />
                        </FormControl>
                        
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input value = {password} type="password" onChange={(e) => setPassword(e.target.value)}  placeholder="********" required />
                        </FormControl>
                        <Button onClick = {handleSignup} className = "hover-rise" colorScheme="green" type="submit" w="full">SIGN UP</Button>
                        

                        
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