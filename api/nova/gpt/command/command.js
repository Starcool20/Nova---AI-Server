// Used by: api/nova/gpt/command/index.js

function getCommand(text) {
  return new Promise((resolve, reject) => {
    try {
      const command = text.split(' ')[0].toLowerCase();
      //const isCommand = getIsCommand(text);
      let packageName = null;
      let contactName = null;
      let time = null;
      let songName = null;
      let title = null;
      let description = null;
      let startTime = null;
      let endTime = null;
      let eventLocation = null;
      let checkCommand = null;

      if (command.startsWith('open')) {
      console.log('open command');
        packageName = extractQuotedText(response);
      } else if (command.startsWith('call')) {
        contactName = response.trim().split(/\s+/)[1]; 
      } else if (command.startsWith('set')) {
        time = response.trim().split(/\s+/)[2]; 
      } else if (command.startsWith('play')) {
        songName = response.trim().split(/\s+/)[1]; 
      } else if (command.startsWith('send')) {
        contactName = response.trim().split(/\s+/)[1]; 
      }else if (command.startsWith('add')) {
        title = response.trim().split(/\s+/)[2]; 
        description = response.trim().split(/\s+/)[3]; 
        startTime = response.trim().split(/\s+/)[4]; 
        endTime = response.trim().split(/\s+/)[5]; 
        eventLocation = response.trim().split(/\s+/)[6]; 
      }else if (command.startsWith('check')) {
        checkCommand = response.trim().split(/\s+/)[1]; 
      }

      resolve({ response: text, packageName: packageName, command: command, contactName: contactName, time: time, songName: songName, title: title, description: description, startTime: startTime, endTime: endTime, eventLocation: eventLocation, checkCommand: checkCommand });
    } catch (error) {
      console.error(error);
      reject('Error processing the audio file.');
    }
  });
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