# Student QR Generator

A static, frontend-only Student QR Code Generator for university attendance.

## Features

- University → Faculty cascading selection
- Student name and Student ID
- English / Arabic interface
- RTL Arabic support
- Static QR code containing structured student data
- Local browser-side QR generation
- PNG QR download
- PDF student card
- Browser print card
- No backend
- No database
- No student information upload
- Suitable for GitHub Pages, Cloudflare Pages and Netlify

## QR Payload

The generated QR contains JSON in this format:

```json
{
  "type": "STUDENT",
  "version": 1,
  "universityId": "ECU",
  "facultyId": "CIS",
  "studentId": "20231234",
  "studentName": "Ahmed Mohamed Ali"
}
```

The Student ID is the primary student identifier.

## Configure Your University

Edit:

`js/config.js`

Add or modify universities, faculties and departments. Each item needs a stable ID and localized English/Arabic name.

Example:

```javascript
{
  id: "CIS",
  name: {
    en: "Faculty of Computer and Information Systems",
    ar: "كلية الحاسبات ونظم المعلومات"
  },
  departments: [
    {
      id: "CS",
      name: {
        en: "Computer Science",
        ar: "علوم الحاسب"
      }
    }
  ]
}
```

## Local testing

Because this is a static project, it can be opened through a local static server.

Examples:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

A local server is recommended instead of opening `index.html` directly because browsers can apply stricter rules to local files.

## Deployment

Upload the entire project to a static hosting provider.

### GitHub Pages

1. Create a GitHub repository.
2. Upload all project files.
3. Open repository Settings → Pages.
4. Select the branch/folder containing the website.
5. Save.
6. Open the generated Pages URL.

### Cloudflare Pages / Netlify

Create a static-site project and point it to the repository. No build command is required.

## Offline behavior

All QR generation code is intended to be local. The `lib/` directory contains the local libraries used by the application.

Do not replace the local QR/PDF libraries with external CDN URLs if offline/privacy behavior is required.

## Android attendance compatibility

The Android attendance application should parse the QR as UTF-8 JSON and validate:

- `type === "STUDENT"`
- `version === 1`
- universityId
- facultyId
- studentId
- studentName

The Android app should use the Student ID as the primary identifier.

## Important production note

The website is intentionally not an authoritative student-information system. A student can type any name or ID. The Android attendance application should therefore validate the university/faculty context and apply whatever institutional verification rules are appropriate.

## License

You may adapt this project for your university's educational/administrative use.


## Important: QR/PDF library loading
The application first checks for local libraries. If they are not present, it automatically loads QRCode.js and jsPDF from their public package CDNs. This fixes the “QR library is unavailable” error in the previous package. For a completely offline deployment, place the official library builds in `lib/qrcode.min.js` and `lib/jspdf.umd.min.js`.

## Branding
Uses the supplied ECU logo and displays: Dr. Mohamed Gresha — Faculty of Computer and Information Systems — Egyptian Chinese University.
