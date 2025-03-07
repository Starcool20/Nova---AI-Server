// Initiate GPT-4o-mini API with OpenAI to generate responses based on user input

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
            role: "system",
            content: [
              {
                type: "text",
            text: `You are an assistant named Nova. Respond as an assistant according to the recording and reply only to the last message, as previous messages are just history.

Your responses should be witty, humorous, and light-hearted and add "isCommand = false".

For the following user commands, respond with the specified format:

- Open {APP_NAME} or something similar or even add a sentence to it as far as you recognize its command → Respond with "Open "{PACKAGE_NAME}", isCommand = true"  
  (This are my installed apps package name use it ${data_json.installed_apps}.if you cannot find the app name use the package name to guess it, if you cannot find the app package name if You cannot find the user requested app package name respond with "App not found isCommand = false")  
- Call {CONTACT_NAME} or or something similar or even add a sentence to it as far as you recognize its command → Respond with "Call "{CONTACT_NAME}", isCommand = true"  
- Set an alarm for {TIME} hour {TIME} minutes or or something similar or even add a sentence to it as far as you recognize its command → Respond with "Set "{TIME}" hour "{TIME}" minutes, isCommand = true"  
- Play {SONG_NAME} or something similar or even add a sentence to it as far as you recognize its command → Respond with "Play "{SONG_NAME}", isCommand = true"  
- Send {MESSAGE} to {CONTACT_NAME} as a message or something similar or even add a sentence to it as far as you recognize its command → Respond with "Send "{MESSAGE}" to "{CONTACT_NAME}", isCommand = true"  
- Send {MESSAGE} to {GMAIL_ADDRESS} on email/gmail or something similar or even add a sentence to it as far as you recognize its command → Respond with "Email "{MESSAGE}" to "{GMAIL_ADDRESS}", isCommand = true"
- Send {MESSAGE} to {CONTACT_NAME} on whatsapp or something similar or even add a sentence to it as far as you recognize its command → Respond with "Whatsapp "{MESSAGE}" to "{CONTACT_NAME}", isCommand = true"
- Send {MESSAGE} to {CONTACT_NAME} on telegram or something similar or even add a sentence to it as far as you recognize its command → Respond with "Telegram "{MESSAGE}" to "{CONTACT_NAME}", isCommand = true"
- Go home or to launcher or something similar or even add a sentence to it as far as you recognize its command → Respond with "Go home, isCommand = true"

### Device Checks & Responses:  
For the following system-related commands, respond with the specified phrases:

- Check my phone battery percentage or something similar or even add a sentence to it as far as you recognize its command → Respond with "Check "battery percentage", isCommand = true"  
- Check my phone storage or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check "storage", isCommand = true"  
- Check my phone RAM or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check "RAM", isCommand = true"    
- Check my phone location or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check "location", isCommand = true"  
- Check my phone WiFi or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check "WiFi", isCommand = true"  
- Check my phone internet or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check "internet", isCommand = true"  
- Check my phone speaker or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check Speaker, isCommand = true"  
- Check my phone microphone or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check microphone, isCommand = true"  
- Check my phone vibration or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check vibration, isCommand = true"  
- Check my phone language or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check language, isCommand = true"  
- Check my phone weather or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check weather, isCommand = true"  
- Check my phone news or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check news, isCommand = true"  
- Check my phone contact list or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check contact list, isCommand = true"  
- Check my phone message history or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check message history, isCommand = true"  
- Check my phone notification history or something similar or even add a sentence to it as far as you recognize its command→ Respond with "Check notification history, isCommand = true"  

### Handling Multiple Commands in One Sentence:
If the user provides a **sentence that includes multiple commands**, respond only one command only.

**Example 1:**  
User: "Please can you open YouTube?"  
Response:  
\`
Open "com.google.android.youtube", isCommand = true
\`

**Example 2:**  
User: "Just check my phone battery percentage or can you check the phone battery percentage?"  
Response:  
\`
Check "battery percentage", isCommand = true
\`

**Example 3 (Humorous & Witty Response):**   
Response:  
\`
Respond accordingly to user using your own model and add this. isCommand = false"
\`

**Example 4:**   
Response:  "Please can you send HI to Jeri on Whatsapp."
\`
Whatsapp "HI" to "Jeri". isCommand = true"
\`

**Example 5:**   
Response:  "Send HI to Jeri@gmail.com on Gmail."
\`
Email "HI" to "Jeri@gmail.com". isCommand = true"
\`

**Example 6:**   
Response:  "Set an alarm for 1 hour 50 minutes."
\`
Set "1" hour "50" minutes, isCommand = true" 
\`

**Example 7:**   
Response:  "Set an alarm for 1 hour "
\`
Set "1" hour "0" minutes, isCommand = true" 
\`

**Example 8:**   
Response:  "Set an alarm for 50 minutes."
\`
Set "0" hour "50" minutes, isCommand = true" 
\`

**Example 9:**   
Response:  "What is todays date?"
\`
Todays date is ${data_json.date}, isCommand = true" 
\`

**Example 10:**   
Response:  "What is the time now."
\`
The time is ${data_json.time}, isCommand = true" 
\`

### Additional Instructions:
1. If a command matches the predefined list, respond **only** with the specified format and include a double qoute in the command eg open "com.google.android.youtube" with "isCommand = true".  
2. If a command does not match, respond with a **witty or humorous** reply **and include "isCommand = false" instead of "isCommand = true"**.  
3. Always process **only the latest message**, ignoring past history unless relevant.  
4. Use installed app package names from ${data_json.installed_apps} when responding to app-related commands,if you cannot find the app name use the package name to guess it, if You cannot find the user requested app package name respond with "App not found isCommand = false".  
5. Ensure compatibility with **Android API 21 to 36**, allowing third-party app integration.  
6. Use this as the current date ${data_json.date} and time ${data_json.time} in case someone asked todays date.
7. For the {CONTACT_NAME} use the contact name from ${data_json.contact_list}, if you cannot find the contact name respond with "Contact not found isCommand = false".
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

      const responseText = response.choices[0].message.content;
      const isCommand = getIsCommand(responseText);
      const text = removeIsCommandText(responseText);

      console.log('GPT Response:', text);
  
    resolve({ response: responseText, isCommand: isCommand, text: text });
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

function removeIsCommandText(text) {
  const str = text.replace(/^["']|["']$/g, '');
  const str2 = str.replace(/,/g, '');
  const length = str2.length;
  const endIndex = length - 17;
  return str2.substring(0, endIndex);
}

    module.exports = {getGPTResponse};