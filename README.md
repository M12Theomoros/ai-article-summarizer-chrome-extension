# 🧠 AI Article Summarizer Chrome Extension

A lightweight and privacy-friendly Chrome extension that uses **Gemini AI** to summarize long web articles into clear and concise summaries — directly in your browser with just **one click**.

---

## 📌 Features

- 🔍 Instantly summarizes long articles using Gemini AI  
- ⚡ One-click summarization via extension icon  
- 🧠 Clean and simple UI popup  
- 🔐 Secure Gemini API key management  
- 💡 Easy to install, no backend setup needed  

---

## 🛠️ How It Works

1. On installation, you're prompted to enter your Gemini API key.  
2. Click the extension icon on any article page.  
3. The content is extracted and sent to Gemini AI.  
4. A clean summary is displayed in a popup — right away!

---

## 📁 Project Structure
```
📦 ai-article-summarizer-extension
├── manifest.json       # Extension configuration (permissions, background, etc.)
├── background.js       # Triggers setup tab on install
├── popup.html          # Interface shown when icon is clicked
├── popup.js            # Handles fetching, summarizing, and display
├── options.html        # Setup page to enter and save API key
├── options.js          # Logic to save/load key in localStorage
├── content.js          # Extracts article text from the current webpage
├── icon.png            # Icon displayed in the Chrome toolbar
```
---

## 🚀 Getting Started

### 1. Clone the repository

`git clone https://github.com/your-username/ai-article-summarizer-extension.git`

`cd ai-article-summarizer-extension`

### 2. Load the Extension in Chrome

1. Open Chrome and go to: chrome://extensions/
2. Enable: Developer Mode (top right)
3. Click: Load Unpacked
4. Select the folder you just cloned

### 3. 🔐 Gemini API Key Setup

1. After loading, a new tab will open for setup.
2. Paste your Gemini API key from: https://aistudio.google.com/app/apikey
3. Click Save — the key is stored locally and securely.


