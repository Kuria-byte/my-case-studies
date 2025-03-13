document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startListening");

    if (startButton) {
        startButton.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "START_LISTENING" });
        });
    } else {
        console.error("Button with ID 'startListening' not found!");
    }
});
