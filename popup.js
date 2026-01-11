let qrCode = null;

// Get the current tab URL and generate QR code
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;
  
  // Display the URL
  document.getElementById('urlDisplay').textContent = currentUrl;
  
  // Generate QR code using davidshimjs/qrcodejs
  const qrContainer = document.getElementById('qrcode');
  qrCode = new QRCode(qrContainer, {
    text: currentUrl,
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
});

// Download QR code as image
document.getElementById('downloadBtn').addEventListener('click', () => {
  if (!qrCode) return;
  
  // Get the canvas from the QR code container
  const canvas = document.querySelector('#qrcode canvas');
  if (!canvas) return;
  
  const url = canvas.toDataURL('image/png');
  
  // Get the page title for filename
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const pageTitle = tabs[0].title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `qr_${pageTitle}_${Date.now()}.png`;
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();
  });
});
