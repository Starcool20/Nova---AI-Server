const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { getGPTResponse } = require('./nova/gpt/chat-completion/GPT.js');
const { getTranscription } = require('./nova/gpt/transcription/Whisper.js');
const { getTTSStream } = require('./nova/gpt/tts/TTS.js');
const { overwriteFile, deleteFile } = require('./nova/gpt/file-handler/File-Handler.js');

const app = express();
const upload = multer({ dest: '/tmp' });

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

app.get('/', (req, res) => {
  const filePath = path.join(process.cwd(), '/api/icon', 'icon.png');
  res.sendFile(filePath);
});

// Main endpoint to handle audio upload, transcription, GPT response, and TTS streaming
app.post('/prompt-nova', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file received in the request');
      return res.status(400).json({ error: 'Audio file is required' });
    }
    // Get the JSON metadata
    const metadata = req.body.metadata;

    const metadataJson = JSON.parse(metadata);

    console.log(metadataJson);

    const originalFilePath = path.join('/tmp', req.file.filename);

    const outputPath = path.join('/tmp', 'nova.mp3');

    // Overwrite the file to a new path
    await overwriteFile(originalFilePath, outputPath);

    // Get transcription of the audio file
    const transcription = await getTranscription(outputPath);

    // Generate response using GPT based on the transcription
    const gptResponse = await getGPTResponse(metadataJson, transcription);

    const isCommand = gptResponse.isCommand;

    if (!isCommand) {
    // Stream the GPT response as TTS audio
    const ttsBuffer = await getTTSStream(gptResponse.response);

    // Create Metadata JSON
    const metadata2 = JSON.stringify({ transcript: transcription, response: "Success", command: "" }) + "\n";
    const metadataBuffer = Buffer.from(metadata2, "utf-8");

    // Combine Metadata and MP3 Audio in One Response
    const finalBuffer = Buffer.concat([metadataBuffer, ttsBuffer]);

    // Send Response as a Single Buffer
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", 'attachment; filename="speech.mp3"');
    res.send(finalBuffer);
    } else {
      const json = JSON.stringify({ command: gptResponse, response: "Success", transript: "" }) + "\n";

      res.setHeader("Content-Type", "application/json");
      res.send(json);
    }
    
    // Cleanup: Delete the audio file after processing
    await deleteFile(outputPath);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the audio file.');
  }
});

// Start server (for local testing only; Vercel will handle deployment)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = allowCors(handler);