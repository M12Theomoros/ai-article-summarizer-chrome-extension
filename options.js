/*
options.js: This file manages the extension's settings page where users can enter and save their AI API key.
It loads the saved API key when the page opens and saves a new key when the user clicks the save button.
*/

document.addEventListener("DOMContentLoaded", () => {
  // When the settings page loads, get the saved API key from Chrome storage
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    // If there is a saved API key, show it inside the input box
    if (result.geminiApiKey) {
      document.getElementById("api-key").value = result.geminiApiKey;
    }
  });

  // When the user clicks the "Save" button...
  document.getElementById("save-button").addEventListener("click", () => {
    // Get the value typed in the API key input box and remove extra spaces
    const apiKey = document.getElementById("api-key").value.trim();

    // If the input is not empty...
    if (apiKey) {
      // Save the API key to Chrome's sync storage (syncs across devices if signed in)
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        // Show a success message to the user
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";

        // After 1 second delay, close the settings tab/window automatically
        setTimeout(() => {
          window.close();

          // If window.close() doesn't work (sometimes happens), try closing the tab manually
          chrome.tabs.getCurrent((tab) => {
            if (tab) {
              chrome.tabs.remove(tab.id);
            }
          });
        }, 1000);
      });
    }
  });
});
