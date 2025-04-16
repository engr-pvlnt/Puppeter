let isRefreshing = false;

// Function to start refreshing
function startRefreshing() {
  if (!isRefreshing) {
    isRefreshing = true;
    console.log("Auto-refresh started.");
  }
}

// Function to stop refreshing
function stopRefreshing() {
  if (isRefreshing) {
    isRefreshing = false;
    console.log("Auto-refresh stopped.");
  }
}

// Check the expiration date
function checkExpiration() {
  const currentYear = new Date().getFullYear();
  const expirationYear = 2027;

  if (currentYear >= expirationYear) {
    // Stop any refreshing if expired
    stopRefreshing(); 
    console.log("This extension has expired. Please uninstall.");
    // Indicate that it has expired
    return true; 
  }
  // Extension is still valid
  return false; 
}

// Listen for messages from the content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (checkExpiration()) {
    // Notify the sender that the extension has expired
    sendResponse({ expired: true }); 
    // Stop further processing
    return; 
  }

  if (request.action === 'refresh') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) {
        chrome.tabs.reload(tabs[0].id);
        console.log("Tab refreshed due to inactivity.");
        console.log("Puppeteer v1 Coded by p.velante@gmail.com"); 
      }
    });
  } else if (request.action === 'start') {
    startRefreshing();
  } else if (request.action === 'stop') {
    stopRefreshing();
  }
});