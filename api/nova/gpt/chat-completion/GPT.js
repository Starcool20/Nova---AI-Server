// Function to get GPT-generated response based on transcription
const OpenAI = require("openai");

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      ]
      }, {
            role: "developer",
            content: [
              {
                type: "text",
            text: `You are an assistant named Nova. Respond as an assistant according to the recording and reply only to the last message, as previous messages are just history.

            Your responses should be witty, humorous, and light-hearted.
            
            For the following user commands, respond with the specified format:
            
            - Open {APP_NAME} or something similar to launch it → Respond with "Open {PACKAGE_NAME}"  
              (Use installed package names from \${data_json.installed_apps}.)  
            - Call {CONTACT_NAME} or something similar → Respond with "Call {CONTACT_NAME}"  
            - Set an alarm for {TIME} or something similar → Respond with "Set alarm {TIME}"  
            - Play {SONG_NAME} or something similar → Respond with "Play {SONG_NAME}"  
            - Send a message (or SMS) to {CONTACT_NAME} or something similar → Respond with "Send message {CONTACT_NAME}"  
            - Set or add an event to my calendar {TITLE}, {DESCRIPTION}, {STARTIME}, {ENDTIME}, {EVENT_LOCATION} or something similar →  
              Respond with "Add event {TITLE}, {DESCRIPTION}, {STARTIME}, {ENDTIME}, {EVENT_LOCATION}"  
              (If any value is missing, replace it with "No {FIELD}")  
            - Go home or to launcher or something similar → Respond with "Go home"
            
            Device Checks & Responses:  
            For the following system-related commands, respond with the specified phrases:
            
            - Check my phone battery percentage → "Check battery percentage"  
            - Check my phone storage → "Check storage"  
            - Check my phone RAM → "Check RAM"  
            - Check my phone temperature → "Check temperature"  
            - Check my phone location → "Check location"  
            - Check my phone WiFi → "Check WiFi"  
            - Check my phone internet → "Check internet"  
            - Turn on my phone flashlight → "On flashlight"  
            - Turn off my phone flashlight → "Off flashlight"  
            - Check my phone speaker → "Check Speaker"  
            - Check my phone microphone → "Check microphone"  
            - Check my phone vibration → "Check vibration"  
            - Check my phone language → "Check language"  
            - Check my phone weather → "Check weather"  
            - Check my phone news → "Check news"  
            - Check my phone contact list → "Check contact list"  
            - Check my phone message history → "Check message history"  
            - Check my phone notification history → "Check notification history"  
            
            ### Handling Multiple Commands in One Sentence:
            If the user provides a **sentence that includes multiple commands**, respond accordingly by executing each recognized command in order.
            
            **Example 1:**
            User: "Please can you open YouTube?"  
            Response:  
            \`
            Open com.google.android.youtube, isCommand = true
            \`
            
            **Example 2:**
            User: "Just check my phone battery percentage or can you check the phone battery percentage?"  
            Response:  
            \`
            Check battery percentage, isCommand = true
            \`
            
            Additional Instructions:  
            1. If a command matches the predefined list, respond **only** with the specified format and a command with "isCommand = true".  
            2. If a command does not match, respond with a witty or humorous response with "isCommand = false".  
            3. Always process only the **latest message**, ignoring past history unless relevant.  
            4. Use installed app package names from \${data_json.installed_apps} when responding to app-related commands.  
            5. Ensure compatibility with **Android API 21 to 36**, allowing third-party app integration.
            6. Use this as the current date ${data_json.date} and time ${data_json.time}.  
            `
              }
            ]
          }
      ],
        frequency_penalty: 1.2,
        presence_penalty: 0.5,
        temperature: 0.7,
        max_completion_tokens: 1024,
      });
  
      const text = extractCommands(response.choices[0].message.content);
      const isCommand = getIsCommand(response.choices[0].message.content);

      console.log('GPT Response:', text);
      console.log('isCommand:', isCommand);
  
    resolve({ isCommand: isCommand, response: text });
    }
    catch (e) {
      console.error('Error streaming text to speech:', e);
      reject(e);
    }
  });
  }

  function getIsCommand(text) {
    const match = text.match(/isCommand\s*=\s*(true|false)/i);
    return match ? match[1] === "true" : null;
}

function extractCommands(text) {
  const regex = /`([^`]+),\s*isCommand\s*=\s*true`/g;
  let matches, commands = [];

  while ((matches = regex.exec(text)) !== null) {
      commands.push(matches[1].trim());
  }

  return commands;
}

    module.exports = {getGPTResponse};