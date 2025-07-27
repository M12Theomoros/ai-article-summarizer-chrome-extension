/* 
content.js: This file runs directly inside the webpage the user is viewing. 
Its main job is to find the article text on that page and send it back to the extension 
when the user clicks the "Summarize This Page" button.
*/

function getArticleText() {
  // Try to find the main <article> tag on the page, which usually contains the article content.
  const article = document.querySelector("article");

  // If an <article> is found, return its inner text (the visible text).
  if (article) return article.innerText;

  // Fallback method: If there's no <article>, get all <p> (paragraph) tags instead.
  const paragraphs = Array.from(document.querySelectorAll("p"));

  // Combine all the paragraph texts into one string, with line breaks between them.
  return paragraphs.map((p) => p.innerText).join("\n");
}

// This listens for messages sent from other parts of the extension (like popup.js).
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  // If the message asks for article text...
  if (req.type === "GET_ARTICLE_TEXT") {
    // ...get the article text from the page.
    const text = getArticleText();

    // ...and send it back as a response.
    sendResponse({ text });
  }
});
