const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const OpenAI = require("openai");
const { Readable } = require('stream');
const bodyParser = require('body-parser');
const FormData = require('form-data');

const app = express();
const ffmpegPath = path.join(__dirname, 'bin', 'ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
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

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function convertAudio(inputPath, outputPath, format = 'mp3') { 
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat(format) // 'mp3' or 'wav'
      .on('error', (err) => {
        console.error('Error during conversion:', err.message);
        reject(err);
      })
      .on('end', () => {
        console.log('Conversion finished:', outputPath);
        resolve(outputPath);
      })
      .save(outputPath);
  });
}

// Function to get GPT-generated response based on transcription
async function getGPTResponse(data_json, transcription) {
  return new Promise(async (resolve, reject) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user0
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user0_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user1
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user1_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user2
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user2_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user3
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user3_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user4
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user4_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user5
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user5_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user6
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user6_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user7
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user7_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user8
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user8_response
        }
      ],
          role: "user",
          content: [
            {
              type: "text",
              text: data_json.user9
        }
      ]
},
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: data_json.user9_response
        }
      ]
    },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: transcription
      }
    ],
          role: "developer",
          content: [
            {
              type: "text",
              text: "You are an assistant named Nova, respond as an assistant according to the recording and respond to the last messages others are just histories. Also Respond with a witty and humorous tone or Make this reply light-hearted and funny."
            },
          ]
        }
    ],
      frequency_penalty: 0.8,
      presence_penalty: 0.7,
      temperature: 0.9,
      max_completion_tokens: 1024,
    });

    const text = response.choices[0].message.content;
    console.log('success');

    resolve(text);
  }
  catch (e) {
    console.error('Error streaming text to speech:', e);
    reject(e);
  }
});
}

function audioFileToBase64(filePath) {
  try {
    // Read the file as a binary buffer
    const fileBuffer = fs.readFileSync(filePath);
    // Convert the buffer to a Base64 string
    const base64String = fileBuffer.toString('base64');
    return base64String;
  } catch (error) {
    console.error('Error reading the file:', error);
    throw error;
  }
}

function getTranscription(file) {
  return new Promise(async (resolve, reject) => {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file),
      model: "whisper-1",
    });
    resolve(transcription.text);
  });
}

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


app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
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

    const outputPath = path.join('/tmp', 'nova.mp4');

    fs.rename(originalFilePath, outputPath, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('File written successfully!');
      }
    });

    const transcription = await getTranscription(outputPath);


    // Step 2: Generate response using GPT based on the transcription
    const gptResponse = await getGPTResponse(metadataJson, transcription);

    console.log('GPT Response:', gptResponse);

    // Step 3: Stream the GPT response as TTS audio
    const ttsBuffer = await getTTSStream(gptResponse);

    // Define file path
    const filePath = path.join(__dirname, "output.mp3");

    // Write buffer to file
    fs.writeFileSync(filePath, ttsBuffer);

    // Step 3: Send Metadata + Stream Audio
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Transfer-Encoding": "chunked",
    });

    // Write metadata as the first line
    const metadata2 = JSON.stringify({ transcript: text, response: "Success" }) + "\n";
    res.write(metadata2);

    // Stream the audio file after metadata
    const audioStream = fs.createReadStream(filePath);
    audioStream.pipe(res);

    // Cleanup: Delete the temp file after sending
    audioStream.on("end", () => fs.unlinkSync(audioFilePath));

    
    // Cleanup: Delete the audio file after processing
    fs.unlink(outputPath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the audio file.');
  }
});

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64); // Decode base64 to binary string
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Start server (for local testing only; Vercel will handle deployment)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = allowCors(handler);