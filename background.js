/*
background.js – Purpose:
This file runs in the background of the extension.
Its job is to check if the user has saved their AI API key.
If not, it automatically opens the settings page (options.html) to ask the user to enter the key when the extension is first installed.
*/

// When the extension is installed or updated...
chrome.runtime.onInstalled.addListener(() => {
  // Check Chrome storage to see if the API key is already saved
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    // If no API key is found...
    if (!result.geminiApiKey) {
      // Open a new tab with the settings page where the user can enter their API key
      chrome.tabs.create({
        url: "options.html",
      });
    }
  });
});
