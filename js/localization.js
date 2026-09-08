const I18N = {
  en: {
    brandTitle:"Student QR Generator",
    brandSubtitle:"Personal QR card for attendance",
    title:"Generate Your Student QR Code",
    subtitle:"Enter your official university information and create your personal attendance QR code.",
    studentInformation:"Student Information",
    localOnly:"Generated locally",
    university:"University",
    faculty:"Faculty",
    department:"Department",
    studentName:"Student Name",
    studentId:"Student ID",
    namePlaceholder:"Enter your full name",
    idPlaceholder:"Enter your student ID",
    generate:"Generate QR Code",
    clear:"Clear",
    success:"QR Code Generated Successfully",
    keepSafe:"Keep this QR card and present it when attendance is taken.",
    attendanceCard:"STUDENT ATTENDANCE CARD",
    downloadPng:"Download PNG",
    downloadPdf:"Download PDF",
    print:"Print",
    generateAgain:"Generate Again",
    privacyTitle:"Your data stays on your device",
    privacyText:"This page generates the QR code in your browser. Your student information is not submitted to a server.",
    offlineTitle:"Offline QR generation",
    offlineText:"After the page and its local libraries have loaded, QR generation does not need an online QR service.",
    compatibleTitle:"Attendance compatible",
    compatibleText:"The QR payload follows the Student QR format used by the Android attendance application.",
    footer:"Student QR Generator • Static frontend application",
    choose:"Select...",
    required:"This field is required.",
    invalidId:"Please enter a valid Student ID.",
    generated:"QR code generated.",
    cleared:"Form cleared."
  },
  ar: {
    brandTitle:"مولد رمز QR للطالب",
    brandSubtitle:"بطاقة QR الشخصية لتسجيل الحضور",
    title:"إنشاء رمز QR الخاص بالطالب",
    subtitle:"أدخل بياناتك الجامعية الرسمية وأنشئ رمز QR الشخصي لاستخدامه في تسجيل الحضور.",
    studentInformation:"بيانات الطالب",
    localOnly:"يتم الإنشاء محليًا",
    university:"الجامعة",
    faculty:"الكلية",
    department:"القسم",
    studentName:"اسم الطالب",
    studentId:"كود الطالب",
    namePlaceholder:"أدخل الاسم بالكامل",
    idPlaceholder:"أدخل كود الطالب",
    generate:"إنشاء رمز QR",
    clear:"مسح",
    success:"تم إنشاء رمز QR بنجاح",
    keepSafe:"احتفظ بهذه البطاقة وأبرزها عند تسجيل الحضور.",
    attendanceCard:"بطاقة حضور الطالب",
    downloadPng:"تحميل PNG",
    downloadPdf:"تحميل PDF",
    print:"طباعة",
    generateAgain:"إنشاء رمز جديد",
    privacyTitle:"بياناتك تبقى على جهازك",
    privacyText:"يتم إنشاء رمز QR داخل المتصفح ولا يتم إرسال بيانات الطالب إلى أي خادم.",
    offlineTitle:"إنشاء QR دون خدمة خارجية",
    offlineText:"بعد تحميل الصفحة والمكتبات المحلية، لا يحتاج إنشاء QR إلى خدمة QR عبر الإنترنت.",
    compatibleTitle:"متوافق مع تطبيق الحضور",
    compatibleText:"بيانات QR تتبع صيغة الطالب المستخدمة في تطبيق الحضور على Android.",
    footer:"مولد رمز QR للطالب • تطبيق ويب ثابت",
    choose:"اختر...",
    required:"هذا الحقل مطلوب.",
    invalidId:"من فضلك أدخل كود طالب صحيح.",
    generated:"تم إنشاء رمز QR.",
    cleared:"تم مسح النموذج."
  }
};

let currentLanguage = "en";

function t(key) {
  return I18N[currentLanguage][key] ?? key;
}

function localName(obj) {
  return obj?.name?.[currentLanguage] ?? obj?.name?.en ?? "";
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[currentLanguage][key]) el.textContent = I18N[currentLanguage][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (I18N[currentLanguage][key]) el.placeholder = I18N[currentLanguage][key];
  });
  document.getElementById("languageToggle").textContent = currentLanguage === "en" ? "العربية" : "English";
  refreshSelectLabels();
  if (window.refreshResultLanguage) window.refreshResultLanguage();
}

function refreshSelectLabels() {
  const ids = ["university","faculty","department"];
  ids.forEach(id => {
    const select = document.getElementById(id);
    if (!select || !select.options.length) return;
    select.options[0].textContent = t("choose");
  });
}
