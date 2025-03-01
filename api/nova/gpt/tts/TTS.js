const OpenAI = require("openai");

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

module.exports = { getTTSStream };