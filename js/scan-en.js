const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';

let html5QrCode;
let currentCameraId = null;

// Redirect to the corresponding page upon successful scan
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

// Called when scanning fails
function onScanFailure(error) {
  console.warn(`Scan failed: ${error}`);
}

// Start the QR scanner
function startScanner(cameraId) {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: 250 },
        onScanSuccess,
        onScanFailure
      );
    }).catch(err => {
      console.error('Error stopping scanner:', err);
    });
  } else {
    html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: 250 },
      onScanSuccess,
      onScanFailure
    );
  }
  currentCameraId = cameraId;
}

// Initialize camera selector
function initCameraSelector() {
  Html5Qrcode.getCameras().then(devices => {
    if (!devices || devices.length === 0) {
      alert('No camera devices found');
      return;
    }

    const select = document.getElementById('camera-select');
    devices.forEach(device => {
      const option = document.createElement('option');
      option.value = device.id;
      option.text = device.label || `Camera ${select.length + 1}`;
      select.appendChild(option);
    });

    // Default to first camera
    startScanner(devices[0].id);

    // Listen for camera selection change
    select.onchange = (e) => {
      const newCameraId = e.target.value;
      if (newCameraId !== currentCameraId) {
        startScanner(newCameraId);
      }
    };
  }).catch(err => {
    console.error('Failed to get camera list:', err);
    alert('Unable to access camera list. Please check permissions.');
  });
}

window.onload = () => {
  initCameraSelector();

  // Show floor map
  document.getElementById('floor-map-btn').onclick = () => {
    document.getElementById('floor-map-popup').classList.remove('hidden');
  };

  // Hide floor map
  document.getElementById('close-map').onclick = () => {
    document.getElementById('floor-map-popup').classList.add('hidden');
  };

  // End tour button
  document.getElementById('end-tour-btn').onclick = () => {
    window.location.href = 'language.html';
  };
};
