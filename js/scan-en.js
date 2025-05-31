const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

// Redirect to corresponding page upon successful scan
function onScanSuccess(decodedText) {
  console.log(`Scan successful: ${decodedText}`);

  let target;
  if (decodedText.endsWith('.html')) {
    target = decodedText;
  } else {
    target = `free-station-${lang}/${decodedText}.html`;
  }

  window.location.href = target;
}

// Handle scan failure
function onScanFailure(error) {
  console.warn(`Scan failed: ${error}`);
}

// Initialize QR scanner
function initScanner() {
  const html5QrCode = new Html5Qrcode("qr-reader");
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      // Prefer rear/back camera if available
      const camera = devices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('rear')
      ) || devices[0]; // fallback to first camera

      // Start scanning with selected camera id
      html5QrCode.start(
        camera.id,
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        onScanFailure
      );
    }
  }).catch(err => {
    console.error("Unable to access camera: ", err);
    alert("Unable to open the camera. Please check your browser permissions.");
  });
}

window.onload = () => {
  initScanner();

  // Open floor map
  document.getElementById('floor-map-btn').onclick = () => {
    document.getElementById('floor-map-popup').classList.remove('hidden');
  };

  // Close floor map
  document.getElementById('close-map').onclick = () => {
    document.getElementById('floor-map-popup').classList.add('hidden');
  };

  // End tour button
  document.getElementById('end-tour-btn').onclick = () => {
    window.location.href = 'language.html';
  };
};
