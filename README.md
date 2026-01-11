# QuickShare - QR Code Generator 📱✨

> **Share any webpage with your phone in seconds!** Generate a QR code for the current URL and scan it instantly with your mobile device—no need to copy-paste links or send messages.

---

## 🚀 Features

- ⚡ **Instant QR Generation** - One click to generate a QR code for the current page
- 📲 **Mobile-Ready** - Scan with your phone's camera to open the link instantly
- 💾 **Smart Save with Quality Options** - Download in multiple sizes (Standard, High, Print)
- 🎨 **Beautiful UI** - Modern, smooth interface with gradient design
- 🔒 **100% Private** - Everything happens offline, no data collection
- 🌐 **Cross-Browser** - Works on Chrome, Edge, Brave, Firefox
- ♿ **Accessible** - Clean, intuitive interface

## 📥 Installation Guide

### Chrome, Edge, Brave

1. **Open Extensions Page**

   - Chrome: Visit `chrome://extensions`
   - Edge: Visit `edge://extensions`
   - Brave: Visit `brave://extensions`

2. **Enable Developer Mode**

   - Look for the toggle in the **top right corner** and turn it ON

3. **Load Extension**

   - Click **"Load unpacked"** button
   - Navigate to and select the `browser-extension` folder

4. **Done!** 🎉
   - The QuickShare icon will appear in your toolbar

### Firefox

1. **Open Debug Page**

   - Visit `about:debugging#/runtime/this-firefox`

2. **Load Extension**

   - Click **"Load Temporary Add-on"**
   - Select the `manifest.json` file

3. **Ready to use!** ✅

---

## 📖 How to Use

### Generate & Scan QR Code

1. **Click the QuickShare icon** in your browser toolbar
2. **A QR code appears** showing the current page URL
3. **Scan with your phone** using the camera app
4. **Browser opens automatically** with the shared link

### Save QR Code to Device

1. Click **"Save QR Code"** button
2. Choose your preferred **quality level**:

   - **Standard** - 256×256px (quick share, small file)
   - **High** - 512×512px (better scan reliability)
   - **Print** - 1024×1024px (high-quality printable)

3. File saves as `qr_[pagetitle]_[timestamp].png`

---

## ⌨️ Keyboard Shortcuts

QuickShare supports convenient keyboard shortcuts for fast workflow:

| Shortcut         | Action                            | Platform      |
| ---------------- | --------------------------------- | ------------- |
| **Ctrl+Shift+Y** | Open QuickShare                   | Windows/Linux |
| **Cmd+Shift+Y**  | Open QuickShare                   | macOS         |
| **Ctrl+S**       | Save QR Code                      | Windows/Linux |
| **Cmd+S**        | Save QR Code                      | macOS         |
| **1**            | Select Standard Quality (256×256) | All           |
| **2**            | Select High Quality (512×512)     | All           |
| **3**            | Select Print Quality (1024×1024)  | All           |
| **→**            | Next Quality Option               | All           |
| **←**            | Previous Quality Option           | All           |
| **Enter**        | Save QR Code                      | All           |
| **Escape**       | Close Popup                       | All           |

### Quick Workflow

1. Press **Ctrl+Shift+Q** (or **Cmd+Shift+Q** on Mac) to open QuickShare
2. Press **2** to select High quality
3. Press **Enter** to save instantly

---

## ❓ Frequently Asked Questions

**Q: Does this send my URL anywhere?**

> A: No! Everything runs locally. We don't collect or send any data.

**Q: Will the scanned link automatically open in my browser?**

> A: Yes! When you scan a QR code with your phone's camera:
>
> - iOS: A notification appears - tap it to open
> - Android: A notification appears - tap it to open
> - The URL opens in your default browser automatically

**Q: Can I use this offline?**

> A: Yes! The extension works completely offline.

**Q: What quality should I use?**

> - **Standard**: Quick sharing via chat/email
> - **High**: Better reliability for screen scanning
> - **Print**: For printing on paper/posters

## 📁 Files & Technical Details

- `manifest.json` - Extension configuration (Manifest V3)
- `popup.html` - User interface with QR display
- `popup.js` - QR generation & save logic
- `popup.css` - Beautiful styling
- `qrcode.min.js` - QRCode.js library (davidshimjs v1.0.0)
- `icon16.png`, `icon48.png`, `icon128.png` - Extension icons

**Libraries Used:** QRCode.js (davidshimjs)
**Browser Compatibility:** Chrome 88+, Edge 88+, Firefox 90+, Brave

## Technical Details

- Uses the [QRCode.js (davidshimjs)](https://github.com/davidshimjs/qrcodejs) library for QR generation
- Manifest V3 compliant (latest Chrome extension standard)
- Requires `activeTab` permission only
- Canvas-based rendering for high-quality images
- No external API calls

## 🔒 Privacy & Security

✅ **Zero Data Collection** - We don't track anything
✅ **Offline Processing** - No external servers involved
✅ **Open Source Friendly** - You can inspect all code
✅ **Minimal Permissions** - Only accesses current tab URL
✅ **No Ads or Tracking** - Clean, focused experience

## 📊 Performance

- ⚡ Generates QR codes in < 100ms
- 📦 Lightweight - Only ~25KB library
- 🎯 No background processes
- 💰 Zero CPU/Memory drain when idle

## License

Free to use and modify!

---

## 👨‍💻 Creator

**Anil Kumar Thakur**

- 🔗 [https://github.com/anilkumarthakur60](https://github.com/anilkumarthakur60)

---

**Made with ❤️ for faster web sharing**
