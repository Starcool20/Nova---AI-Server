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
        packageName = response.split(' ')[1];
      } else if (command.startsWith('call')) {
        contactName = response.split(' ')[1];
      } else if (command.startsWith('set')) {
        time = response.split(' ')[2];
      } else if (command.startsWith('play')) {
        songName = response.split(' ')[1];
      } else if (command.startsWith('send')) {
        contactName = response.split(' ')[1];
      }else if (command.startsWith('add')) {
        title = response.split(' ')[2];
        description = response.split(' ')[3];
        startTime = response.split(' ')[4];
        endTime = response.split(' ')[5];
        eventLocation = response.split(' ')[6];
      }else if (command.startsWith('check')) {
        checkCommand = response.split(' ')[1];
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