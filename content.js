let timer = null;
const inactivityTime = 60000; // 1 minute

// Function to reset the refresh timer
function resetTimer() {
  if (timer) {
    clearTimeout(timer);
  }

  // Send a message to background script to refresh if inactive
  timer = setTimeout(() => {
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ action: 'refresh' });
    } else {
      console.error("chrome.runtime.sendMessage is not available");
    }
  }, inactivityTime);
}

// Add event listeners for user actions
window.addEventListener('mousemove', resetTimer);
window.addEventListener('keypress', resetTimer);
window.addEventListener('mousedown', resetTimer);
window.addEventListener('touchstart', resetTimer);

// Initialize the timer on page load
resetTimer();