import React, { useState, useEffect } from "react";
import { Text, Box, VStack, Button } from "@chakra-ui/react";
import { FaMicrophone, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      prompt:
        "Generate a random cohesive sentence everytime, don't put a prefacing sentence.",
      temperature: 1,
      max_tokens: 30,
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
  const [showSpeechRecognition, setShowSpeechRecognition] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

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

  const handleMicrophoneClick = () => {
    if (recording) {
      mediaRecorder.stop();
      setRecording(false);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Browser API navigator.mediaDevices.getUserMedia not available');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.onstop = async (event) => {
          const audioFile = new Blob(event.target.chunks, { type: 'audio/mpeg' });
          console.log("MediaRecorder will produce format:", recorder.mimeType);
          setAudioBlob(audioFile);
          const formData = new FormData();
          formData.append("audio", audioFile);
          formData.append("textPrompt", generatedText);
          try {
            const response = await fetch("http://localhost:3001/upload", {
              method: "POST",
              body: formData,
            });
            if (!response.ok) {
              throw new Error("Failed to upload audio.");
            }
            const data = await response.json();
            console.log(data.message);
          } catch (error) {
            console.error("Upload error:", error);
          }
        };


        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recorder.chunks.push(event.data);
          }
        };

        recorder.chunks = [];
        recorder.start();
        setRecording(true);
      })
      .catch(err => {
        console.error('Error accessing microphone', err);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="100%"
    >
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



        <Button
          w="200px"
          h="100px"
          _hover={{
            background: "red.100",
            color: "black.100",
          }}
          bg={recording ? "red.100" : "green.100"}
          className="hover-rise"
          onClick={handleMicrophoneClick}
        >
          <FaMicrophone />
        </Button>

        <Link to="/results">
          <Button
            className="hover-rise"
            colorScheme="blue"
            size="lg"
            shadow="md"
          >
            Submit
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Lesson;
