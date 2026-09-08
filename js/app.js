let generatedData = null;

document.addEventListener("DOMContentLoaded", () => {
  initializeSelectors();
  applyLanguage();

  document.getElementById("studentForm").addEventListener("submit", handleGenerate);
  document.getElementById("clearBtn").addEventListener("click", clearForm);
  document.getElementById("generateAgainBtn").addEventListener("click", () => {
    document.getElementById("resultPanel").classList.add("hidden");
    document.getElementById("formPanel").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.getElementById("languageToggle").addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    applyLanguage();
    if (generatedData) renderCard(generatedData);
  });
  document.getElementById("downloadPngBtn").addEventListener("click", downloadPng);
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPdf);
  document.getElementById("printBtn").addEventListener("click", () => window.print());
});

function initializeSelectors() {
  const university = document.getElementById("university");
  university.innerHTML = `<option value="">${t("choose")}</option>`;
  UNIVERSITY_CONFIG.universities.forEach(u => {
    const option = document.createElement("option");
    option.value = u.id;
    option.textContent = localName(u);
    university.appendChild(option);
  });

  university.addEventListener("change", populateFaculties);
}

function populateFaculties() {
  const u = UNIVERSITY_CONFIG.universities.find(x => x.id === document.getElementById("university").value);
  const faculty = document.getElementById("faculty");

  faculty.innerHTML = `<option value="">${t("choose")}</option>`;

  if (!u) {
    faculty.disabled = true;
    return;
  }

  u.faculties.forEach(f => {
    const option = document.createElement("option");
    option.value = f.id;
    option.textContent = localName(f);
    faculty.appendChild(option);
  });
  faculty.disabled = false;
}

async function handleGenerate(event) {
  event.preventDefault();
  const result = validateForm();
  if (!result.valid) return;

  const u = UNIVERSITY_CONFIG.universities.find(x => x.id === result.values.university);
  const f = u.faculties.find(x => x.id === result.values.faculty);

  generatedData = {
    universityId: u.id,
    facultyId: f.id,
    university: localName(u),
    faculty: localName(f),
    studentName: result.values.name,
    studentId: result.values.id
  };

  generatedData.payload = buildQrPayload(generatedData);
  renderCard(generatedData);

  document.getElementById("formPanel").classList.add("hidden");
  document.getElementById("resultPanel").classList.remove("hidden");
  showToast(t("generated"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function renderCard(data) {
  document.getElementById("cardUniversity").textContent = data.university;
  document.getElementById("cardFaculty").textContent = data.faculty;
  document.getElementById("cardStudentName").textContent = data.studentName;
  document.getElementById("cardStudentId").textContent = data.studentId;

  try {
    const result = await generateStudentQr(data.payload, document.getElementById("qrContainer"));
    data.qrCanvas = result.canvas;
    data.qrImage = result.img;
    data.qrDataUrl = result.canvas ? result.canvas.toDataURL("image/png") : result.img?.src;
  } catch (error) {
    console.error(error);
    showToast(error.message || "Unable to generate QR code.");
  }
}

window.refreshResultLanguage = () => {
  if (!generatedData) return;
  const u = UNIVERSITY_CONFIG.universities.find(x => x.id === generatedData.universityId);
  const f = u?.faculties.find(x => x.id === generatedData.facultyId);
  if (u && f) {
    generatedData.university = localName(u);
    generatedData.faculty = localName(f);
  }
};

function clearForm() {
  document.getElementById("studentForm").reset();
  clearErrors();
  document.getElementById("faculty").innerHTML = `<option value="">${t("choose")}</option>`;
  document.getElementById("faculty").disabled = true;
  generatedData = null;
  document.getElementById("resultPanel").classList.add("hidden");
  showToast(t("cleared"));
}

function downloadPng() {
  if (!generatedData?.qrDataUrl) {
    showToast("QR image is not ready.");
    return;
  }

  const a = document.createElement("a");
  a.href = generatedData.qrDataUrl;
  a.download = safeFileName(generatedData.studentId + "_" + generatedData.studentName + "_QR") + ".png";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function downloadPdf() {
  if (!generatedData?.qrDataUrl) {
    showToast("QR image is not ready.");
    return;
  }
  try {
    await downloadStudentPdf(generatedData);
  } catch (error) {
    console.error(error);
    showToast(error.message);
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
