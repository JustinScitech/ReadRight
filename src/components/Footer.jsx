import React from "react";
import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Box
      w="95%"
      shadow="lg"
      as="footer"
      role="contentinfo"
      py={{ base: "10", md: "16" }}
      mx="auto"
    >
      <Stack spacing={3} alignItems="center">
      <Stack
          direction="row"
          spacing={6}
          justify="center"
          align="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="blue.500">
            ReadRight
          </Text>
          <ButtonGroup variant="tertiary">
            <IconButton
              as="a"
              href="https://LinkedIn.com/"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              className = "hover-rise"
            />
            <IconButton
              as="a"
              href="https://github.com/JustinScitech/ReadRight"
              aria-label="GitHub"
              icon={<FaGithub />}
              className = "hover-rise"
            />
            <IconButton
              as="a"
              href="https://twitter.com/home"
              aria-label="Twitter"
              icon={<FaTwitter />}
              className = "hover-rise"
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} ReadRight. Improve your reading
          today!
        </Text>
      </Stack>
    </Box>
  );
}

export default Footer;
