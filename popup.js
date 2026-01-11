let qrCode = null;
let currentUrl = "";
let selectedSize = 256;
let isGenerating = false;

// Get the current tab URL and generate QR code
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentUrl = tabs[0].url;

  // Display the URL
  document.getElementById("urlDisplay").textContent = currentUrl;

  // Generate QR code using davidshimjs/qrcodejs
  const qrContainer = document.getElementById("qrcode");

  try {
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
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".quality-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = parseInt(btn.dataset.size);
  });
});

// Set initial selection
document.querySelector('[data-size="256"]').click();

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  // Ctrl+S / Cmd+S to save QR code
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    if (!isGenerating) {
      document.getElementById('downloadBtn').click();
    }
  }
  
  // Number keys (1, 2, 3) to select quality
  if (event.key === '1' || event.key === '2' || event.key === '3') {
    const sizeMap = { '1': 256, '2': 512, '3': 1024 };
    const size = sizeMap[event.key];
    const btn = document.querySelector(`[data-size="${size}"]`);
    if (btn) {
      btn.click();
    }
  }
  
  // Arrow keys to navigate between quality options
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    const buttons = Array.from(document.querySelectorAll('.quality-btn'));
    const activeBtn = document.querySelector('.quality-btn.active');
    const currentIndex = buttons.indexOf(activeBtn);
    
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    }
    
    buttons[nextIndex].click();
  }
  
  // Enter key to save
  if (event.key === 'Enter' && !isGenerating) {
    document.getElementById('downloadBtn').click();
  }
  
  // Escape to close (handled by browser)
  if (event.key === 'Escape') {
    window.close();
  }
});

// Download QR code with selected quality
document.getElementById("downloadBtn").addEventListener("click", async () => {
  if (!qrCode || isGenerating) return;

  isGenerating = true;
  const downloadBtn = document.getElementById("downloadBtn");
  const originalText = document.getElementById("downloadText").textContent;
  downloadBtn.disabled = true;
  document.getElementById("downloadText").textContent = "Processing...";

  try {
    // Get the canvas from the QR code container
    const sourceCanvas = document.querySelector("#qrcode canvas");
    if (!sourceCanvas) {
      throw new Error("QR code canvas not found");
    }

    // --- Calculate layout (QR + padding + footer) ---
    const padding = 10;                                     // 10px padding on all sides
    const footerHeight = Math.round(selectedSize * 0.22);     // space below QR for URL text
    const border = 2;                                        // border width

    // Canvas size
    const canvasWidth = selectedSize + padding * 2;
    const canvasHeight = selectedSize + padding * 2 + footerHeight;

    // Create a new canvas with padding and footer area
    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");

    newCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;

    // --- Background ---
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, "#f8f9fa");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, "#f0f1f3");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // --- QR "card" area (top part) ---
    const qrX = padding;
    const qrY = padding;
    const qrSize = selectedSize;

    // white QR backing
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(qrX, qrY, qrSize, qrSize);

    // draw QR
    ctx.drawImage(sourceCanvas, qrX, qrY, qrSize, qrSize);

    // subtle border around QR area
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = border;
    ctx.strokeRect(qrX - border / 2, qrY - border / 2, qrSize + border, qrSize + border);

    // --- Footer area separator line (optional, looks nice) ---
    ctx.beginPath();
    ctx.moveTo(padding, padding + qrSize + Math.round(footerHeight * 0.10));
    ctx.lineTo(canvasWidth - padding, padding + qrSize + Math.round(footerHeight * 0.10));
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.stroke();

    // --- URL text (draw in footer area BELOW the QR) ---
    let displayUrl = currentUrl;

    // Better truncation based on size
    const maxUrlLength = selectedSize >= 1024 ? 70 : selectedSize >= 512 ? 55 : 40;
    if (displayUrl.length > maxUrlLength) {
      displayUrl = displayUrl.slice(0, maxUrlLength - 3) + "...";
    }

    const fontSize = Math.max(12, Math.round(selectedSize * 0.045));
    ctx.font = `600 ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = "#2d3748";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // footer center Y
    const footerTop = padding + qrSize;
    const urlY = footerTop + footerHeight * 0.55;  // ✅ guaranteed below QR
    ctx.fillText(displayUrl, canvasWidth / 2, urlY);
    
    // Convert to image and download with high quality
    const url = newCanvas.toDataURL("image/png", 1.0);

    // Get the page title for filename
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const pageTitle = tabs[0].title
        .replace(/[^a-z0-9]/gi, "_")
        .substring(0, 30)
        .toLowerCase();

      const timestamp = Date.now();
      const filename = `qr_${pageTitle}_${selectedSize}px_${timestamp}.png`;

      // Create download link
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();

      // Update UI
      document.getElementById("downloadText").textContent = "✓ Saved!";
      setTimeout(() => {
        document.getElementById("downloadText").textContent = originalText;
        downloadBtn.disabled = false;
        isGenerating = false;
      }, 1500);
    });
  } catch (error) {
    console.error("Error downloading QR code:", error);
    alert("Error saving QR code. Please try again.");
    document.getElementById("downloadText").textContent = originalText;
    downloadBtn.disabled = false;
    isGenerating = false;
  }
});
