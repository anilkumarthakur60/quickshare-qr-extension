let qrCode = null;
let currentUrl = '';
let selectedSize = 256;
let isGenerating = false;

// Get the current tab URL and generate QR code
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentUrl = tabs[0].url;
  
  // Display the URL
  document.getElementById('urlDisplay').textContent = currentUrl;
  
  // Generate QR code using davidshimjs/qrcodejs
  const qrContainer = document.getElementById('qrcode');
  
  try {
    qrCode = new QRCode(qrContainer, {
      text: currentUrl,
      width: 256,
      height: 256,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    document.getElementById('urlDisplay').textContent = 'Error generating QR code. Please refresh.';
  }
});

// Quality option buttons
document.querySelectorAll('.quality-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = parseInt(btn.dataset.size);
  });
});

// Set initial selection
document.querySelector('[data-size="256"]').click();

// Download QR code with selected quality
document.getElementById('downloadBtn').addEventListener('click', async () => {
  if (!qrCode || isGenerating) return;
  
  isGenerating = true;
  const downloadBtn = document.getElementById('downloadBtn');
  const originalText = document.getElementById('downloadText').textContent;
  downloadBtn.disabled = true;
  document.getElementById('downloadText').textContent = 'Processing...';
  
  try {
    // Get the canvas from the QR code container
    const sourceCanvas = document.querySelector('#qrcode canvas');
    if (!sourceCanvas) {
      throw new Error('QR code canvas not found');
    }
    
    // Create a new canvas with the selected size
    const newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d');
    
    // Set canvas dimensions to selected size
    newCanvas.width = selectedSize;
    newCanvas.height = selectedSize;
    
    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, selectedSize, selectedSize);
    
    // Draw the QR code scaled to the new size
    ctx.drawImage(sourceCanvas, 0, 0, selectedSize, selectedSize);
    
    // Convert to image and download with high quality
    const url = newCanvas.toDataURL('image/png', 1.0);
    
    // Get the page title for filename
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const pageTitle = tabs[0].title
        .replace(/[^a-z0-9]/gi, '_')
        .substring(0, 30)
        .toLowerCase();
      
      const timestamp = Date.now();
      const filename = `qr_${pageTitle}_${selectedSize}px_${timestamp}.png`;
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
      
      // Update UI
      document.getElementById('downloadText').textContent = '✓ Saved!';
      setTimeout(() => {
        document.getElementById('downloadText').textContent = originalText;
        downloadBtn.disabled = false;
        isGenerating = false;
      }, 1500);
    });
  } catch (error) {
    console.error('Error downloading QR code:', error);
    alert('Error saving QR code. Please try again.');
    document.getElementById('downloadText').textContent = originalText;
    downloadBtn.disabled = false;
    isGenerating = false;
  }
});
