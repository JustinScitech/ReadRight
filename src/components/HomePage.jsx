import React, { useState, useEffect, useRef } from "react";
import {useSpring, animated} from 'react-spring';
import {
  Button,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Image,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import "../App.css";

function AnimatedBox({ children, initialVisible = false }) {
  const [scrollY, setScrollY] = useState(0);
  const boxRef = useRef(null);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let boxTop = boxRef.current ? boxRef.current.offsetTop : 0;
  let difference = window.innerHeight + scrollY - boxTop;

  const { opacity, scale } = useSpring({
    opacity:
      difference > 0 && difference < window.innerHeight
        ? 1 - 0.5 * (scrollY / boxTop)
        : initialVisible && scrollY < boxTop
        ? 1
        : 0,
    scale: difference > 0 && difference < window.innerHeight ? 1 : 0.8,
  });

  return (
    <animated.div ref={boxRef} style={{ opacity, scale }}>
      {children}
    </animated.div>
  );
}

function HomePage() {
//Just add these for compatibility with screens ig
    const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const imageWidth = useBreakpointValue({ base: "80%", md: "400px" });
  const imageHeight = useBreakpointValue({ base: "80%", md: "400px" });
  const boxWidth = useBreakpointValue({ base: "90%", md: "50%" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  return (
    <VStack spacing={8} p={8} textAlign="center">
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
        <Heading as="h1" size="2xl" color={"blue.500"} className="shine-text">
          ReadRight
        </Heading>
      </Flex>

      <Flex w="80%" flexDirection={flexDirection} justifyContent="space-between" alignItems="center">
        <Image
          src="https://cdn.dribbble.com/users/2367833/screenshots/7816190/media/b1aaf5c98510012b56422d1619dc62e8.gif"
          alt="Books Image"
          borderRadius="full"
          wdith={imageWidth}
          height={imageHeight}
        />
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" size="xl">
            A free and fun way to improve reading skills for people with
            dyslexia!
          </Heading>
          <VStack spacing={4}>
            <Button
              className="hover-rise"
              colorScheme="blue"
              size="lg"
              shadow="md"
            >
              Get Started
            </Button>
            <Button
              className="hover-rise"
              variant="outline"
              colorScheme="blue"
              size="lg"
            >
              I have an account!
            </Button>
          </VStack>
        </VStack>
      </Flex>
      <Text w= {boxWidth}>
        Training with ReadRight is engaging, and studies indicate its
        effectiveness! Through concise, focused lessons, you'll accumulate
        points, progress through stages, and most importantly, enhance your
        reading capabilities.
      </Text>
      
        
      <Box mt={6} align = "center">
        <AnimatedBox>
          <Box
            w={boxWidth}
            p={6}
            shadow="md"
            borderWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack spacing={7} align="start" maxWidth="50%">
              <Heading as="h2" size="lg" align="start">
                A free and productive way to enhance reading skills for
                dyslexics!
              </Heading>
              <Text textAlign="start" w="full">
                Training with ReadRight is engaging, and studies indicate its
                effectiveness! Through concise, focused lessons, you'll
                accumulate points, progress through stages, and most
                importantly, enhance your reading capabilities.
              </Text>
            </VStack>
            <Image
              src="https://i.pinimg.com/originals/4c/79/70/4c7970c030c4b8a8322171dd6a498cb0.gif"
              alt="Reading Image"
              wdith={imageWidth}
          height={imageHeight}
              borderRadius="full"
              mr={6}
            />
          </Box>
        </AnimatedBox>
        <AnimatedBox>
          <Box
            w={boxWidth}
            p={6}
            shadow="md"
            borderWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              src="https://i.pinimg.com/originals/9a/e0/aa/9ae0aa2ff25aa43147538ac2a9f3137f.gif"
              alt="Reading Image"
              wdith={imageWidth}
          height={imageHeight}
              borderRadius="full"
              mr={6}
            />
            <VStack spacing={2} align="end" maxWidth="50%">
              <Heading as="h2" size="lg" align="end">
                Rooted in Research
              </Heading>
              <Text textAlign="end" w="full">
                We harness a blend of evidence-based instructional techniques
                and captivating content to design modules that efficiently
                bolster reading comprehension and fluency.
              </Text>
            </VStack>
          </Box>
        </AnimatedBox>
        <AnimatedBox>
          <Box
            w={boxWidth}
            p={6}
            shadow="md"
            borderWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack spacing={2} align="start" maxWidth="50%">
              <Heading as="h2" size="lg">
                Keep the Momentum
              </Heading>
              <Text textAlign="start" w="full">
                We facilitate consistent practice with rewarding features,
                engaging tasks, and gentle reminders.
              </Text>
            </VStack>
            <Image
              src="https://i.pinimg.com/originals/9c/23/73/9c2373930fc4bc8f6d3eb9fae4f017dd.gif"
              alt="Reading Image"
              wdith={imageWidth}
          height={imageHeight}
              borderRadius="full"
              mr={6}
            />
          </Box>
        </AnimatedBox>
        <AnimatedBox>
          <Box
            w={boxWidth}
            p={6}
            shadow="md"
            borderWidth="1px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              src="https://cdn.dribbble.com/users/77598/screenshots/16399264/media/d86ceb1ad552398787fb76f343080aa6.gif"
              alt="Reading Image"
              wdith={imageWidth}
          height={imageHeight}
              borderRadius="full"
              mr={6}
            />
            <VStack spacing={2} align="end" maxWidth="50%">
              <Heading as="h2" size="lg" align="end">
                Tailored to You
              </Heading>
              <Text textAlign="end" w="full">
                Marrying the pinnacle of AI and pedagogical research, our
                sessions are adjusted to guide you through the ideal learning
                intensity and rhythm.
              </Text>
            </VStack>
          </Box>
        </AnimatedBox>
      </Box>

    </VStack>
  );
}

export default HomePage;
