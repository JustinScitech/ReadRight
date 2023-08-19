import React, {useState} from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

  function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User successfully logged in
      // Redirect to lesson page
      navigate('/lesson');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };
    return (
        <VStack spacing={6} p={8} align="center" className="bg-gray-100 min-h-screen">
            <Heading as="h1" size="2xl" color="blue.500">Login to ReadRight</Heading>
            <Box p={6} w="sm" shadow="md" borderWidth="1px" borderRadius="md" className="bg-white">
                <form>
                    <VStack spacing={4}>
                    
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}  required />
                        </FormControl>
                        
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </FormControl>
                        <Button onClick = {handleLogin} className = "hover-rise" colorScheme="green" type="submit" w="full">LOG IN</Button>
                        

                        
                    </VStack>
                </form>
            </Box>
            <Text>
                Don't have an account?{" "}
                <Link as={RouterLink} to="/register" color="blue.500">Sign up</Link>
            </Text>
        </VStack>
    );
}

export default LoginPage;
