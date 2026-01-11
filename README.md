# QR Code Generator Browser Extension

A simple and elegant browser extension that generates QR codes for the current page URL. Perfect for quickly sharing URLs with mobile devices!

## Features

✅ **Instant QR Code Generation** - Click the extension icon to instantly generate a QR code for the current page
✅ **URL Display** - Shows the current page URL for verification
✅ **Save to Device** - Download the QR code as a PNG image with one click
✅ **Beautiful UI** - Modern gradient design with smooth animations
✅ **Works Offline** - All processing happens locally in your browser

## Installation

### Chrome/Edge/Brave

1. Open your browser and navigate to the extensions page:

   - **Chrome**: `chrome://extensions`
   - **Edge**: `edge://extensions`
   - **Brave**: `brave://extensions`

2. Enable **Developer mode** (toggle in the top right corner)

3. Click **Load unpacked**

4. Select the `browser-extension` folder

5. The extension icon will appear in your browser toolbar!

### Firefox

1. Navigate to `about:debugging#/runtime/this-firefox`

2. Click **Load Temporary Add-on**

3. Select the `manifest.json` file from the `browser-extension` folder

## Usage

1. **Generate QR Code**: Click the extension icon while on any webpage
2. **Scan with Mobile**: Use your mobile device's camera to scan the QR code
3. **Save QR Code**: Click the "Save QR Code" button to download as PNG

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - QR code generation logic
- `popup.css` - Styling
- `qrcode.min.js` - QR code library
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons

## Technical Details

- Uses the [QRCode.js](https://github.com/soldair/node-qrcode) library for QR generation
- Manifest V3 compliant
- Requires `activeTab` permission only
- No data collection or external requests

## Privacy

This extension:

- ✅ Works completely offline
- ✅ Doesn't collect any data
- ✅ Doesn't send URLs to external servers
- ✅ Only accesses the current tab when you click the extension icon

## License

Free to use and modify!

## Tips

- The QR code is sized at 256x256 pixels for optimal scanning
- Downloaded files are named with the page title and timestamp
- Works on any webpage including local files

---

**Enjoy quick URL sharing!** 📱
