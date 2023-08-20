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

const getAudioDurationInSeconds = (audioFilePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(audioFilePath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata.format.duration);
    });
  });
};

const upload = multer({ storage: storage });
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serviceAccountInfo = {
  type: "service_account",
  project_id: "speech-to-text-ht6",
  private_key_id: "1f755755768dfd3213622513e617720568c5f0d8",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2V83KOirj0EE/\nhXWYGXlGgr98e3lvzlNAapnyxZ7BdGOwtrMxKTeABMZjzfQDvXlOUEU0Ug5yqYyp\nu11k0zwLm8z7yavpDa3j6uP787ZarjyKIBFXeJfJnlqeTGYAXAtxL5OAfRXB+Deu\nGQfd71e67YOc5B3+dK0W4co38WutkFAYg/wxlFQzwXGubaJWNKsT6qe+sRhJDef/\nlHmY+0RKwOcR/Qfng0Cyec2/3+xtuayw+rTUA0vAgv1fi5eFf2tn0sWHz08tlpxB\n9dSleXajGKnzNYgU/XdPZ0pdHp5ylbdZ4/Jiw0HdRNEhNJzPrkFygA64Bqnvgl8Y\ntLXv/p/tAgMBAAECggEAAWpdk9oPPqz9cK2Ly+Y4uYomy+PWfb5ziX66WrbbhGNv\nqa3FZtaL0n/W/WvaHtRP9oJrgxw29f9ocuHcN/3my61GMlcusTS0up32bpyF+B69\npBHbKJtsTDmhOPTdXtfYE+UbZ0YxTsvrPLv/gmLLAs24tZVUwUatGE4g6H3EiPig\nLzkuiieVOFqhTXZxJ39oOh1BPtU+KeCaHItqezJPxP99ecgenA+aAO2mdDWGyPrY\nmfjRtNCifriKQjTb6wDEPrOX4E9mRCEMKZbuFJj0lDYl0L0QBOJgwR5+y9HYMm6N\nicZkM2Ksa62j4b/Q1vjXc6fscQl0q1MOXydE8QpcOQKBgQD42qzxBRrwfKjqcyck\nO56MPdrjWZdEEyGpjJ8oVSzrpyG+IdWnR1uWdfHoYKGBoK8PlsPzSDDEJhdQODaE\nSlxQYB2gys/FwfJgGKLWjzr6K9QH6mi+WhREga+SLyEWfqg0jCAKeYIT1xWBGWW5\n8TKmJ0gSux9oeWrGY6Eu4oorpQKBgQC7lDSBYX/eRlR0kRKa0Pae42fFW2uZhy5L\nNO0AchQOQyEffgGxTCQcMeLoVhIDZC9uhc/DXZvG89iAn2kj5+Q1FiFKhsQfGzlp\nQQ23wG5z094X9v97If3iq+DFu7HKvRRl1Lg4CANCOfu0eS3Rvc9NDGHTgCmzCsxl\nZuJrGF+QqQKBgFaWJ8R45UW16kQhKwZVZDYhs46VdqduDLFkx2AOOuIHthrkxOU+\nU+THRxN2w9tJoH/JEocMoEMvib8UwAtJoFMrDkQLLT3+3KmJCOek0H2JUG4spqNM\nzm6DvSYdFeMw0K/v7ZoXayYiGU5hGt8WyGu9kTtLNoNwc7FxqvyYQEEtAoGAJgbn\nlgsUBxWu7WqzoNsYBCIJ2YKtD5TOF8UE/wAhfLqzLlU3NqA++dBLNdqtEC7xRrCt\n6+dAO1cX3wtyHytVokV4PkmP3NaCDwp3I3dJbQXYkncqV+YOODOr/6oLYxRt3C8B\noapOLtDebDncxhZ6vh3yfxQOYBOiWDRBVoC8bvECgYEA9IQVevpr8uiox3Ge+eTh\nm6HWJSawgKe08C48TrGAqutl3KndxbMTVtTf8KP0hvaKCxOZY8oRBVJxa3DvWACH\nPOOESTBBgzJ4U85tgRWDqcR6zVtq3Xuf/qkF2UXdX4WZtNmCrsLQFoHWKUbW4HR4\nFNJNsJwMltgCbbN48GziB00=\n-----END PRIVATE KEY-----\n",
  client_email: "ht6-559@speech-to-text-ht6.iam.gserviceaccount.com",
  client_id: "106320819849097220439",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/ht6-559%40speech-to-text-ht6.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
function cleanString(str) {
    return str.replace(/[.,!?;()\-]/g, ''); 
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
    const intersectionSize = [...set1].filter(token => set2.has(token)).length;
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

    let audioDuration;
    try {
      audioDuration = await getAudioDurationInSeconds(audioFilePath);
    } catch (err) {
        console.error("Error getting audio duration:", err.message);
        console.error("Stack trace:", err.stack);
        return res
          .status(500)
          .json({ message: "Error processing audio duration" });
      }

    const audioData = await fs.promises.readFile(audioFilePath);
    const audio = { content: audioData };

    const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: "en",
    };

    try {
      const [response] = await client.recognize({ config, audio });
      const transcript = response.results?.[0]?.alternatives?.[0]?.transcript ?? "";
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
