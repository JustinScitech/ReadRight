import React from 'react';
import {Flex, Button } from '@chakra-ui/react';
import {Link} from "react-router-dom";
function StickyNavbar() {
    return (
        <Flex
            w="100%"
            justifyContent="start"
            alignItems="center"
            bg="white"
            p={4}
            zIndex={1}
            position="sticky"
            top="0"
            boxShadow="sm"
        >
            <Link to="/">
            <Button 
                as="h1" 
                size="lg" 
                variant="link" 
                colorScheme="blue"
                fontWeight="bold"
                fontSize="2xl"
                className="shine-text"
            >
                ReadRight
            </Button>
            </Link>
        </Flex>
    );
}

export default StickyNavbar;
