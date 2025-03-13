let mediaStream = null;

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "START_LISTENING") {
//     chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
//       if (chrome.runtime.lastError || !stream) {
//         console.error("Error capturing audio:", chrome.runtime.lastError);
//         return;
//       }
//       mediaStream = stream;
//       processAudioStream(stream);
//     });
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "START_LISTENING") {
        chrome.storage.local.set({ key: message.data }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error saving data:", chrome.runtime.lastError);
                return;
            }
            console.log("Data saved successfully.");
        });
    }
});



function processAudioStream(stream) {
  const audioContext = new AudioContext();
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);

  mediaStreamSource.connect(processor);
  processor.connect(audioContext.destination);

  processor.onaudioprocess = (event) => {
    let audioData = event.inputBuffer.getChannelData(0);
    sendAudioToAPI(audioData);
  };
}

function sendAudioToAPI(audioData) {
  console.log("Sending audio to API...");

  fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      "Authorization": "proj_qo0Um8SxRNjZKx6O8isenETK",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "whisper-1",
      audio: audioData
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Transcribed Text:", data.text);
    extractQuestion(data.text);
  })
  .catch(error => console.error("Speech-to-Text Error:", error));
}
 
function extractQuestion(text) {
    const questionRegex = /(who|what|when|where|why|how|is|can|does|should|could|would|will|are|do|shall)\b[^.?!]*[?]/gi;
    const questions = text.match(questionRegex);
    
    if (questions) {
      console.log("Detected Questions:", questions);
      sendToAI(questions[0]); // Send first question for response
    }
  }


  function sendToAI(question) {
    console.log("Sending Question to AI:", question);
  
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "proj_qo0Um8SxRNjZKx6O8isenETK",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: question }],
        max_tokens: 50
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("AI Response:", data.choices[0].message.content);
      showAnswerPopup(data.choices[0].message.content);
    })
    .catch(error => console.error("AI API Error:", error));
  }
  
  function showAnswerPopup(answer) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "SHOW_ANSWER", answer: answer });
    });
  }