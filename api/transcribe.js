const express = require('express');
const OpenAI = require("openai");
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Enable CORS
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  app(req, res);
};

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/get-speech", async (req, res) => {
    // Get the text from the request
    const text = req.body.text;

    // Generate a TTS transcribe audio
    const ttsBuffer = await getTTSStream(text.transcription);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", ttsBuffer.length);
    res.end(ttsBuffer);

    console.log("Transcription audio generated.");
});

async function getTTSStream(text) {
    try {
      // Request TTS audio from OpenAI
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
      });
  
      // Convert response to a buffer
      const arrayBuffer = await mp3.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      if (!buffer || buffer.length === 0) {
        throw new Error("Empty TTS response received.");
      }
  
      return buffer;
    } catch (error) {
      console.error("Error generating TTS audio:", error);
      throw error; // Properly propagate the error
    }
  }

module.exports = allowCors(handler);