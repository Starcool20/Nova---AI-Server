const OpenAI = require("openai");
const fs = require("fs");

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


function getTranscription(file) {
  return new Promise(async (resolve, reject) => {
    try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file),
      model: "whisper-1",
      language: "en",
      temperature: 0.3
    });
    resolve(transcription.text);
  } catch (error) {
    reject(error);
  }
  });
}

module.exports = {getTranscription};