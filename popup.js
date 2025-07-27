/*
popup.js: This file controls the popup window’s behavior.
It handles user actions like clicking "Summarize" or "Copy Summary",
fetches the article text from the current page,
calls the AI API to get the summary,
and shows the results or messages to the user.
*/

// When the "Summarize This Page" button is clicked...
document.getElementById("summarize").addEventListener("click", async () => {
  // Get the result display area in the popup
  const resultDiv = document.getElementById("result");

  // Show a loading spinner while the summary is being created
  resultDiv.innerHTML = '<div class="loading"><div class="loader"></div></div>';

  // Get the summary type selected by the user (brief, detailed, bullets)
  const summaryType = document.getElementById("summary-type").value;

  // Retrieve the saved API key from Chrome storage
  chrome.storage.sync.get(["geminiApiKey"], async (result) => {
    // If no API key is found, show an error message and stop
    if (!result.geminiApiKey) {
      resultDiv.innerHTML =
        "API key not found. Please set your API key in the extension options.";
      return;
    }

    // Find the current active tab (the webpage user is on)
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // Send a message to content.js asking for the article text
      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_ARTICLE_TEXT" },
        async (res) => {
          // If no text received, show an error message
          if (!res || !res.text) {
            resultDiv.innerText =
              "Could not extract article text from this page.";
            return;
          }

          try {
            // Call the Gemini AI API to generate a summary based on the text
            const summary = await getGeminiSummary(
              res.text,
              summaryType,
              result.geminiApiKey
            );
            // Show the generated summary in the popup
            resultDiv.innerText = summary;
          } catch (error) {
            // Show an error message if summary generation fails
            resultDiv.innerText = `Error: ${
              error.message || "Failed to generate summary."
            }`;
          }
        }
      );
    });
  });
});

// When the "Copy Summary" button is clicked...
document.getElementById("copy-btn").addEventListener("click", () => {
  // Get the text currently shown in the result box
  const summaryText = document.getElementById("result").innerText;

  // If there is some text, try to copy it to the clipboard
  if (summaryText && summaryText.trim() !== "") {
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        // Change the button text to "Copied!" temporarily to confirm success
        const copyBtn = document.getElementById("copy-btn");
        const originalText = copyBtn.innerText;

        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      })
      .catch((err) => {
        // Log error if copy fails
        console.error("Failed to copy text: ", err);
      });
  }
});

// Function to call the Gemini AI API and get a summary of the text
async function getGeminiSummary(text, summaryType, apiKey) {
  // Limit the text length to avoid API limits (~20,000 characters here)
  const maxLength = 20000;
  const truncatedText =
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  // Prepare the AI prompt based on the selected summary type
  let prompt;
  switch (summaryType) {
    case "brief":
      prompt = `Provide a brief summary of the following article in 2-3 sentences:\n\n${truncatedText}`;
      break;
    case "detailed":
      prompt = `Provide a detailed summary of the following article, covering all main points and key details:\n\n${truncatedText}`;
      break;
    case "bullets":
      prompt = `Summarize the following article in 5-7 key points. Format each point as a line starting with "- " (dash followed by a space). Do not use asterisks or other bullet symbols, only use the dash. Keep each point concise and focused on a single key insight from the article:\n\n${truncatedText}`;
      break;
    default:
      prompt = `Summarize the following article:\n\n${truncatedText}`;
  }

  try {
    // Make a POST request to the Gemini API with the prompt and API key
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2, // Controls randomness of the AI output
          },
        }),
      }
    );

    // If the API response is not OK, extract the error message and throw an error
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "API request failed");
    }

    // Extract the generated summary text from the API response
    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary available."
    );
  } catch (error) {
    // Log any errors in the console and throw a user-friendly error
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary. Please try again later.");
  }
}
