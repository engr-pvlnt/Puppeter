let isRefreshing = false;

// Function to check if the extension has expired
function checkExpiration() {
    chrome.runtime.sendMessage({ action: 'checkExpiration' }, (response) => {
        if (response && response.expired) {
            alert("This extension has expired. Please uninstall it.");
			// Disable start button
            document.getElementById('start').disabled = true; 
			// Disable stop button
            document.getElementById('stop').disabled = true;  
        }
    });
}

// Check expiration when the popup opens
document.addEventListener('DOMContentLoaded', checkExpiration);

// Start refreshing when the start button is clicked
document.getElementById('start').addEventListener('click', () => {
    if (!isRefreshing) {
        chrome.runtime.sendMessage({ action: 'start' }, (response) => {
            if (response && response.expired) {
                alert("This extension has expired. Please uninstall it.");
            } else {
				// Set isRefreshing to true only after successful start
                isRefreshing = true; 
                console.log("Auto-refresh started.");
            }
        });
    }
});

// Stop refreshing when the stop button is clicked
document.getElementById('stop').addEventListener('click', () => {
    if (isRefreshing) {
        chrome.runtime.sendMessage({ action: 'stop' }, (response) => {
            if (response && response.expired) {
                alert("This extension has expired. Please uninstall it.");
            } else {
				// Set isRefreshing to false only after successful stop
                isRefreshing = false; 
                console.log("Auto-refresh stopped.");
            }
        });
    }
});