// Used by: api/nova/gpt/command/index.js

const e = require("express");

function getCommand(text) {
  return new Promise((resolve, reject) => {
    try {
      const response = removeBackticks(text);
      const command = response.split(' ')[0].toLowerCase();
      //const isCommand = getIsCommand(text);
      let packageName = null;
      let contactName = null;
      let hour = null;
      let minutes = null;
      let songName = null;
      let message = null;
      let gmailAddress = null;
      let checkCommand = null;

      if (command.startsWith('open')) {
      console.log('open command');
        packageName = extractQuotedText(response);
      } else if (command.startsWith('call')) {
        contactName = extractQuotedText(response);
      } else if (command.startsWith('set')) {
        hour = extractQuotedText(response);
        minutes = extractSecondQuotedText(response);
      } else if (command.startsWith('play')) {
        songName = extractQuotedText(response);
      } else if (command.startsWith('send')) {
        contactName = response.trim().split(/\s+/)[1]; 
      }else if (command.startsWith('email')) {
        message = extractQuotedText(response);
        gmailAddress = extractSecondQuotedText(response);
      }else if (command.startsWith('whatsapp')) {
        message = extractQuotedText(response);
        contactName = extractSecondQuotedText(response);
      }else if (command.startsWith('telegram')) {
        message = extractQuotedText(response);
        contactName = extractSecondQuotedText(response);
      }else if (command.startsWith('check')) {
        checkCommand = extractQuotedText(response);
      }

      resolve({ response: response, packageName: packageName, command: command, contactName: contactName, hour: hour, minutes: minutes, songName: songName, message: message, gmail: gmailAddress, checkCommand: checkCommand });
    } catch (error) {
      console.error(error);
      reject('Error processing the audio file.');
    }
  });
}

function removeBackticks(input) {
  return input.replace(/`/g, ''); // Replace all backticks with an empty string
}

function extractSecondQuotedText(input) {
  let match = input.match(/"([^"]+)"[^"]+"([^"]+)"/); // Match two quoted texts
  return match ? match[2] : null; // Return the second matched text or null if not found
}


function extractQuotedText(input) {
  let match = input.match(/"([^"]+)"/); // Find the first occurrence inside quotes
  return match ? match[1] : null; // Return the matched text or null if not found
}

function getIsCommand(text) {
    const match = text.match(/isCommand\s*=\s*(true|false)/i);
    return match ? match[1] === "true" : null;
}

module.exports = {
  getCommand
};