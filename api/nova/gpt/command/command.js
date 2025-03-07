// Used by: api/nova/gpt/command/index.js

const e = require("express");

function getCommand(text) {
  return new Promise((resolve, reject) => {
    try {
      const response = removeBackticks(text);
      console.log('response', response);
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
      let isNumericValue = false;

      if (command.includes('open')) {
      console.log('open command');
        packageName = extractQuotedText(response);
      } else if (command.includes('call')) {
        contactName = extractQuotedText(response);
        console.log('call command', contactName);
        if (isNumeric(contactName)) {
          isNumericValue = true;
        }
      } else if (command.includes('set')) {
        hour = extractQuotedText(response);
        console.log('set command', hour);
        minutes = extractSecondQuotedText(response);
      } else if (command.includes('play')) {
        console.log('play command');
        songName = extractQuotedText(response);
      } else if (command.includes('send')) {
        console.log('send command');
        message = extractQuotedText(response);
        contactName = extractSecondQuotedText(response);
        if (isNumeric(contactName)) {
          isNumericValue = true;
        }
      }else if (command.includes('email')) {
        message = extractQuotedText(response);
        gmailAddress = extractSecondQuotedText(response);
      }else if (command.includes('whatsapp')) {
        message = extractQuotedText(response);
        contactName = extractSecondQuotedText(response);
        if (isNumeric(contactName)) {
          isNumericValue = true;
        }
      }else if (command.includes('telegram')) {
        message = extractQuotedText(response);
        contactName = extractSecondQuotedText(response);
        if (isNumeric(contactName)) {
          isNumericValue = true;
        }
      }else if (command.includes('check')) {
        checkCommand = extractQuotedText(response);
      }

      resolve({ response: response, packageName: packageName, command: command, contactName: contactName, hour: hour, minutes: minutes, songName: songName, message: message, gmail: gmailAddress, checkCommand: checkCommand, isNumericValue: isNumericValue });
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
  const matches = [...input.matchAll(/"([^"]*)"/g)]; // Get all matches
  return matches.length > 1 ? matches[1][1] : null; // Return the second match or null
}


function extractQuotedText(input) {
  let match = input.match(/"([^"]*)"/); // Find the first occurrence inside quotes
  return match ? match[1] : null; // Return the matched text or null if not found
}

function getIsCommand(text) {
    const match = text.match(/isCommand\s*=\s*(true|false)/i);
    return match ? match[1] === "true" : null;
}

function isNumeric(value) {
  return !isNaN(Number(value)) && typeof value !== 'boolean';
}

module.exports = {
  getCommand
};