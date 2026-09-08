function loadScriptOnce(src, globalCheck) {
  return new Promise((resolve, reject) => {
    if (globalCheck()) return resolve();
    const existing = document.querySelector(`script[data-runtime-lib="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => globalCheck() ? resolve() : reject(new Error(`Library loaded but global object is unavailable: ${src}`)), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Unable to load library: ${src}`)), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.runtimeLib = src;
    script.onload = () => globalCheck() ? resolve() : reject(new Error(`Library loaded but global object is unavailable: ${src}`));
    script.onerror = () => reject(new Error(`Unable to load library: ${src}`));
    document.head.appendChild(script);
  });
}

async function ensureQrLibrary() {
  if (typeof window.QRCode !== "undefined") return;
  // The original package had an empty placeholder file. Use a reliable browser CDN fallback.
  await loadScriptOnce(
    "https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@master/qrcode.min.js",
    () => typeof window.QRCode !== "undefined"
  );
}

function buildQrPayload(data) {
  return JSON.stringify({
    type: QR_SCHEMA.type,
    version: QR_SCHEMA.version,
    universityId: data.universityId,
    facultyId: data.facultyId,
    studentId: data.studentId,
    studentName: data.studentName
  });
}

async function generateStudentQr(payload, container) {
  container.innerHTML = "";
  await ensureQrLibrary();

  new window.QRCode(container, {
    text: payload,
    width: 220,
    height: 220,
    correctLevel: window.QRCode.CorrectLevel.M
  });

  await new Promise(resolve => setTimeout(resolve, 150));
  const canvas = container.querySelector("canvas");
  const img = container.querySelector("img");
  if (!canvas && !img) throw new Error("QR code could not be generated.");
  return { canvas, img };
}
