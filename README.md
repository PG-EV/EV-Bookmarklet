# Bookmarklet Script

This repository hosts the JavaScript file used by my browser bookmarklet, served via jsDelivr CDN.

## How to Install

1. Create a new bookmark in your browser.
2. Set the Name to: `My Bookmarklet`
3. Set the URL / Location to:

```javascript
javascript:(()=>{if(window.EVREADY)return dispatchEvent(new Event("EVRUN"));let s=document.createElement("script");s.src="https://cdn.jsdelivr.net/gh/PG-EV/EV-Bookmarklet@main/script.js";s.onload=()=>dispatchEvent(new Event("EVRUN"));document.documentElement.appendChild(s)})()
