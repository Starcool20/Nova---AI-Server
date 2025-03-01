const OpenAI = require("openai");
const fs = require("fs");

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


function getTranscription(file) {
  return new Promise(async (resolve, reject) => {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(file),
      model: "whisper-1",
    });
    resolve(transcription.text);
  });
}

module.exports = {getTranscription};