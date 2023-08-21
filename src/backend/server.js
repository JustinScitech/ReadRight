import express from "express";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { SpeechClient } from "@google-cloud/speech";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import pkg from "natural";

const { JaroWinklerDistance } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../audio"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// const getAudioDurationInSeconds = (audioFilePath) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(audioFilePath, (err, metadata) => {
//       if (err) reject(err);
//       else resolve(metadata.format.duration);
//     });
//   });
// };
const getAudioDurationInSeconds = 3;
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serviceAccountInfo = {
  //Add your details here. https://console.cloud.google.com/apis/credentials will give you free API acsess to use the service.
};
function cleanString(str) {
  return str.replace(/[.,!?;()\-]/g, "");
}

function longestCommonSubsequence(tokens1, tokens2) {
  const m = tokens1.length;
  const n = tokens2.length;
  const L = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (tokens1[i - 1] === tokens2[j - 1]) {
        L[i][j] = L[i - 1][j - 1] + 1;
      } else {
        L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
      }
    }
  }
  return L[m][n];
}

function getTokenSimilarity(s1, s2) {
  s1 = cleanString(s1.toLowerCase());
  s2 = cleanString(s2.toLowerCase());

  const tokens1 = s1.split(/\s+/);
  const tokens2 = s2.split(/\s+/);

  const lcsLength = longestCommonSubsequence(tokens1, tokens2);
  const lcsSimilarity = lcsLength / tokens1.length;

  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);
  const intersectionSize = [...set1].filter((token) => set2.has(token)).length;
  const wordMatchSimilarity = intersectionSize / tokens1.length;

  return (lcsSimilarity + wordMatchSimilarity) / 2;
}

const client = new SpeechClient({ credentials: serviceAccountInfo });
let lastData = null;

app.post("/upload", (req, res, next) => {
  upload.single("audio")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error("A Multer error occurred:", err);
      return res.status(500).json({ message: err.message });
    } else if (err) {
      console.error("An unknown error occurred:", err);
      return res.status(500).json({ message: err.message });
    }

    console.log("File uploaded:", req.file.filename);

    const audioFilePath = path.join(__dirname, "../audio", req.file.filename);

    let audioDuration = 3;
    // try {
    //   audioDuration = await getAudioDurationInSeconds(audioFilePath);
    // } catch (err) {
    //   console.error("Error getting audio duration:", err.message);
    //   console.error("Stack trace:", err.stack);
    //   return res
    //     .status(500)
    //     .json({ message: "Error processing audio duration" });
    // }

    const audioData = await fs.promises.readFile(audioFilePath);
    const audio = { content: audioData };

    const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: "en",
    };

    try {
      const [response] = await client.recognize({ config, audio });
      const transcript =
        response.results?.[0]?.alternatives?.[0]?.transcript ?? "";
      const textPrompt = req.body.textPrompt ?? "";
      console.log(`time: ${audioDuration}`);
      console.log("textPrompt:", textPrompt);
      console.log("transcript:", transcript);
      const similarity = getTokenSimilarity(textPrompt, transcript);
      const similarityPercent = Math.round(similarity * 1000) / 10;
      console.log(`close to ${similarityPercent}`);
      lastData = {
        audioDuration,
        similarityPercent,
      };
      res.json({
        message: "Read text!",
        ...lastData,
      });
    } catch (err) {
      console.error("Error processing audio with Google Speech-to-Text:", err);
      return res.status(500).json({ message: "Error processing audio" });
    }
  });
});

app.get("/data", (req, res) => {
  if (!lastData) {
    return res.status(404).json({ message: "No audio data available." });
  }
  return res.json(lastData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
