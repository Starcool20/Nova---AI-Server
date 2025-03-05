// Used by: api/nova/gpt/command/index.js

function getCommand(text) {
  return new Promise((resolve, reject) => {
    try {
      const response = removeIsCommandText(text);
      const command = response.split(' ')[0].toLowerCase();
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
        packageName = response.substring(4, response.length).trim();
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

      resolve({ response: response, packageName: packageName, command: command, contactName: contactName, time: time, songName: songName, title: title, description: description, startTime: startTime, endTime: endTime, eventLocation: eventLocation, checkCommand: checkCommand });
    } catch (error) {
      console.error(error);
      reject('Error processing the audio file.');
    }
  });
}

function removeIsCommandText(text) {
  const str = text.replace(/^["']|["']$/g, '');
  const str2 = str.replace(/,/g, '');
  const length = str2.length;
  const endIndex = length - 17;
  return str2.substring(0, endIndex);
}

function getIsCommand(text) {
    const match = text.match(/isCommand\s*=\s*(true|false)/i);
    return match ? match[1] === "true" : null;
}

module.exports = {
  getCommand
};