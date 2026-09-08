/*
 * University / Faculty configuration.
 * Departments have been removed as requested.
 * Add/change faculty IDs and localized names here.
 */
const UNIVERSITY_CONFIG = {
  universities: [
    {
      id: "ECU",
      name: {
        en: "Egyptian Chinese University",
        ar: "الجامعة المصرية الصينية"
      },
      logo: "assets/university-logo.svg",
      faculties: [
        { id: "PDT", name: { en: "Pharmacy and Drug Technology", ar: "الصيدلة وتكنولوجيا الدواء" } },
        { id: "PT", name: { en: "Physical Therapy", ar: "العلاج الطبيعي" } },
        { id: "VM", name: { en: "Veterinary Medicine", ar: "الطب البيطري" } },
        { id: "NUR", name: { en: "Nursing", ar: "التمريض" } },
        { id: "ENG", name: { en: "Engineering and Technology", ar: "الهندسة والتكنولوجيا" } },
        { id: "CIS", name: { en: "Computers and Information Systems", ar: "الحاسبات ونظم المعلومات" } },
        { id: "AD", name: { en: "Arts and Design", ar: "الفنون والتصميم" } },
        { id: "EIT", name: { en: "Economics and International Trade", ar: "الاقتصاد والتجارة الدولية" } },
        { id: "MC", name: { en: "Mass Communication", ar: "الإعلام والاتصال الجماهيري" } },
        { id: "LAW", name: { en: "Law", ar: "الحقوق" } },
        { id: "LS", name: { en: "Literary Studies", ar: "الدراسات الأدبية" } },
        { id: "HUM", name: { en: "Humanities", ar: "العلوم الإنسانية" } }
      ]
    }
  ]
};

const QR_SCHEMA = {
  type: "STUDENT",
  version: 1
};
