let qrCode = null;
let currentUrl = "";
let selectedSize = 256;
let isGenerating = false;

// Helpers
function sanitizeFilename(name) {
  return (name || "page")
    .replace(/[^a-z0-9]/gi, "_")
    .replace(/_+/g, "_")
    .substring(0, 30)
    .toLowerCase();
}

function makeDisplayUrl(url, maxLen) {
  if (!url) return "";
  if (url.length <= maxLen) return url;
  return url.slice(0, maxLen - 3) + "...";
}

// Get the current tab URL and generate QR code
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs || !tabs[0]) return;

  currentUrl = tabs[0].url || "";

  // Display the URL
  document.getElementById("urlDisplay").textContent =
    currentUrl || "No URL found";

  // Generate QR code using davidshimjs/qrcodejs
  const qrContainer = document.getElementById("qrcode");

  try {
    // Clear old QR (important if popup re-renders)
    qrContainer.innerHTML = "";

    qrCode = new QRCode(qrContainer, {
      text: currentUrl,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    document.getElementById("urlDisplay").textContent =
      "Error generating QR code. Please refresh.";
  }
});

// Quality option buttons
document.querySelectorAll(".quality-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".quality-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = parseInt(btn.dataset.size, 10);
  });
});

// Set initial selection
const defaultBtn = document.querySelector('[data-size="256"]');
if (defaultBtn) defaultBtn.click();

// Download QR code with selected quality
document.getElementById("downloadBtn").addEventListener("click", async () => {
  if (!qrCode || isGenerating) return;

  isGenerating = true;
  const downloadBtn = document.getElementById("downloadBtn");
  const downloadText = document.getElementById("downloadText");
  const originalText = downloadText.textContent;

  downloadBtn.disabled = true;
  downloadText.textContent = "Processing...";

  try {
    // Get the canvas from the QR code container
    const sourceCanvas = document.querySelector("#qrcode canvas");
    if (!sourceCanvas) throw new Error("QR code canvas not found");

    // --- Layout settings ---
    const padding = Math.round(selectedSize * 0.15); // 15% padding
    const borderWidth = 2;

    // We’ll calculate footer based on font + gap so it always fits
    const fontSize = Math.max(10, Math.round(selectedSize * 0.05));
    const gap = Math.max(6, Math.round(selectedSize * 0.06));
    const footerHeight = gap + fontSize + Math.round(fontSize * 0.8); // extra breathing space

    // Canvas size
    const canvasWidth = selectedSize + padding * 2;
    const canvasHeight = selectedSize + padding * 2 + footerHeight;

    // Create a new canvas with padding + footer
    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    newCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, "#f8f9fa");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, "#f0f1f3");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Border rectangle (same as your style)
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(
      padding * 0.5,
      padding * 0.5,
      selectedSize + padding,
      selectedSize + padding
    );

    // Draw QR white backing + QR
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(padding, padding, selectedSize, selectedSize);
    ctx.drawImage(sourceCanvas, padding, padding, selectedSize, selectedSize);

    // --- URL text: just below border line ---
    const urlX = canvasWidth / 2;

    // bottom of the border rect
    const borderBottomY = padding * 0.5 + (selectedSize + padding);

    // display url (truncate smartly based on size)
    const maxUrlLength =
      selectedSize >= 1024 ? 70 : selectedSize >= 512 ? 55 : 40;
    const displayUrl = makeDisplayUrl(currentUrl, maxUrlLength);

    ctx.font = `600 ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = "#4a5568";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const urlY = borderBottomY + gap;
    ctx.fillText(displayUrl, urlX, urlY);

    // Convert to image and download
    const dataUrl = newCanvas.toDataURL("image/png");

    // Filename from tab title
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const title = tabs?.[0]?.title || "page";
      const pageTitle = sanitizeFilename(title);
      const timestamp = Date.now();
      const filename = `qr_${pageTitle}_${selectedSize}px_${timestamp}.png`;

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      a.click();

      downloadText.textContent = "✓ Saved!";
      setTimeout(() => {
        downloadText.textContent = originalText;
        downloadBtn.disabled = false;
        isGenerating = false;
      }, 1500);
    });
  } catch (error) {
    console.error("Error downloading QR code:", error);
    alert("Error saving QR code. Please try again.");
    downloadText.textContent = originalText;
    downloadBtn.disabled = false;
    isGenerating = false;
  }
});
