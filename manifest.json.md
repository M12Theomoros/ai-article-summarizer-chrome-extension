`manifest.json`: This file is required for every Chrome extension. It tells Chrome what your extension does and how it should work.

`{`
  This specifies the version of the manifest being used. Version 3 is the latest for Chrome extensions.  
  `"manifest_version": 3,`

  The name of the Chrome extension that appears in the Chrome Extensions list.  
  `"name": "AI Summary for Articles",`

  The version of the extension. Helps to manage updates or changes.  
  `"version": "1.0",`

  These are special permissions the extension needs to function properly.  
  - `"scripting"` allows the extension to inject and run JavaScript in web pages.  
  - `"activeTab"` allows it to temporarily access the page the user is viewing when they click the extension.  
  - `"storage"` lets the extension save and retrieve data (like settings or user preferences).  
  `"permissions": ["scripting", "activeTab", "storage"],`

  This section defines what happens when the user clicks the extension icon in the toolbar.  
  `"action": {`
    This HTML file will open as a small window (popup) when the user clicks the extension icon.  
    `"default_popup": "popup.html",`
    
    This is the icon that will be shown for the extension in the browser toolbar.  
    `"default_icon": "icon.png"`
  `},`

  This section lets to automatically run a JavaScript file (`content.js`) on every page the user visits.  
  It's useful for scanning or modifying webpage content.  
  `"content_scripts": [`
    `{`
      This means the script should run on all URLs/websites.  
      `"matches": ["<all_urls>"],`

      This is the script that will be injected into those pages.  
      `"js": ["content.js"]`
    `}`
  `],`

  This sets up a background script called a "service worker" that keeps running in the background.  
  It listens for events or messages and performs background tasks like fetching data.  
  `"background": {`  
    `"service_worker": "background.js"`  
  `},`

  This defines an optional settings page (`options.html`) where users can customize the extension.  
  `"options_page": "options.html",`

  This allows the extension to interact with all websites (needed for content scripts or background actions).  
  `"host_permissions": ["<all_urls>"]`
`}`
