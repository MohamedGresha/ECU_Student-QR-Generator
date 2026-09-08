function clearErrors() {
  ["university","faculty","studentName","studentId"].forEach(id => {
    const el = document.getElementById(id + "Error");
    if (el) el.textContent = "";
  });
}

function validateForm() {
  clearErrors();
  let valid = true;

  const university = document.getElementById("university").value;
  const faculty = document.getElementById("faculty").value;
  const name = document.getElementById("studentName").value.trim();
  const id = document.getElementById("studentId").value.trim();

  if (!university) {
    document.getElementById("universityError").textContent = t("required");
    valid = false;
  }
  if (!faculty) {
    document.getElementById("facultyError").textContent = t("required");
    valid = false;
  }
  if (!name) {
    document.getElementById("studentNameError").textContent = t("required");
    valid = false;
  }
  if (!id || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(id)) {
    document.getElementById("studentIdError").textContent = t("invalidId");
    valid = false;
  }

  return { valid, values: { university, faculty, name, id } };
}
