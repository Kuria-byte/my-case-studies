console.log("AI Assistant Content Script Loaded");

function createFloatingUI() {
  let aiBox = document.createElement("div");
  aiBox.id = "ai-answer-box";
  aiBox.style.position = "fixed";
  aiBox.style.bottom = "20px";
  aiBox.style.right = "20px";
  aiBox.style.width = "300px";
  aiBox.style.background = "white";
  aiBox.style.border = "1px solid black";
  aiBox.style.padding = "10px";
  aiBox.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.3)";
  aiBox.style.zIndex = "10000";
  aiBox.style.fontSize = "14px";
  aiBox.innerHTML = "<strong>AI Assistant</strong><br><span id='ai-answer-text'>Waiting for a question...</span>";
  
  document.body.appendChild(aiBox);
}

function showAnswerPopup(answer) {
  let aiText = document.getElementById("ai-answer-text");
  if (!aiText) {
    createFloatingUI();
    aiText = document.getElementById("ai-answer-text");
  }
  aiText.innerText = answer;
}

// Listen for messages from background.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "SHOW_ANSWER") {
    showAnswerPopup(message.answer);
  }
});

// Inject floating UI when the script runs
createFloatingUI();
