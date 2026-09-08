async function ensurePdfLibrary() {
  if (window.jspdf && window.jspdf.jsPDF) return;
  await new Promise((resolve, reject) => {
    const src = "https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js";
    const existing = document.querySelector(`script[data-runtime-lib="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => window.jspdf?.jsPDF ? resolve() : reject(new Error("PDF library loaded but is unavailable.")), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load the PDF library.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.runtimeLib = src;
    script.onload = () => window.jspdf?.jsPDF ? resolve() : reject(new Error("PDF library loaded but is unavailable."));
    script.onerror = () => reject(new Error("Unable to load the PDF library."));
    document.head.appendChild(script);
  });
}

async function downloadStudentPdf(cardData) {
  await ensurePdfLibrary();
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [105, 148] });

  // Draw a clean card without requiring an external font.
  pdf.setDrawColor(23, 54, 93);
  pdf.setLineWidth(0.8);
  pdf.roundedRect(6, 6, 93, 136, 4, 4);

  pdf.setTextColor(23, 54, 93);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(cardData.university, 52.5, 17, { align: "center", maxWidth: 82 });

  pdf.setTextColor(35, 48, 68);
  pdf.setFontSize(8.5);
  pdf.text(cardData.faculty, 52.5, 25, { align: "center", maxWidth: 82 });

  pdf.setDrawColor(220, 228, 237);
  pdf.line(12, 30, 93, 30);

  pdf.setTextColor(100, 113, 130);
  pdf.setFontSize(7);
  pdf.text("Student Name", 12, 40);

  pdf.setTextColor(24, 35, 56);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(cardData.studentName, 12, 48, { maxWidth: 81 });

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(100, 113, 130);
  pdf.setFontSize(7);
  pdf.text("Student ID", 12, 59);

  pdf.setTextColor(24, 35, 56);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(cardData.studentId, 12, 67);

  if (cardData.qrDataUrl) {
    pdf.addImage(cardData.qrDataUrl, "PNG", 25, 74, 55, 55);
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(5.8);
  pdf.setTextColor(100, 113, 130);
  pdf.text("STUDENT ATTENDANCE CARD", 52.5, 138, { align: "center" });

  pdf.save(safeFileName(cardData.studentId + "_" + cardData.studentName + "_QR") + ".pdf");
}

function safeFileName(value) {
  return value.replace(/[<>:"/\\|?*\x00-\x1F]/g, "_").replace(/\s+/g, "_").slice(0, 100);
}
