# 🛂 Age & Identity Verification System

A web-based proof-of-concept system that verifies a user’s **age and identity** using a **simulated Aadhar card** and a **live selfie**. This tool demonstrates face matching and DOB extraction to determine if the person:
- Is **18+**
- Matches the photo on the ID

> ⚠️ This is a demo application. No real government APIs or sensitive data are used.

---

## 🔧 Tech Stack

- ⚛️ React (with Vite)
- 🎨 Tailwind CSS
- Flask for Backend
- 📸 Webcam & File Upload APIs
- 🧠 Placeholder logic for Face Matching & OCR (mocked for POC)
- 🖼 Image preview and match scoring

---

## 🚀 Features

- Upload Aadhar card (image file)
- Capture a selfie using your device camera
- Preview extracted photo and DOB
- Show confidence score of face match (simulated)
- Determine if user is **18+ or not**
- Responsive landing page with beautiful UI

---

## 📸 demo video link 
https://drive.google.com/file/d/1VrxHqkkdLlxZimWe3RmxbOQjLG5uBIHe/view?usp=drive_link

## ppt link
https://drive.google.com/file/d/1JvWY1wxSXVs4DJOmAEfWgCoUcSWjPwk5/view?usp=drive_link
---

## 📂 Folder Structure

```

age-id-verification/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx
│   │   ├── SelfieCapture.jsx
│   │   |── ResultCard.jsx
|   |   |── LandingPage.jsx
│   |   |── VerificationApp.jsx
│   |   |── VerificationResult.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── eslint.config.js
|── package-lock.json
|── package.json
└── README.md


💻 How to Run Locally

1. Clone the repository

```bash
git clone https://github.com/raunaktohangar/age-id-verification.git
cd age-id-verification
````

2. Install dependencies

```bash
npm install
```
```
3. Run the development server

```bash
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 🧠 How It Works (POC Logic)

| Step           | Description                                  |
| -------------- | -------------------------------------------- |
| Aadhar Upload  | User uploads an image (simulated Aadhar)     |
| Selfie Capture | Camera opens to take a live selfie           |
| Face Match     | Simulated confidence score shown (e.g., 82%) |
| DOB Extract    | DOB hardcoded or mocked from OCR             |
| Age Check      | Calculates if user is 18+                    |

---

## 📌 Do’s and Don’ts for Selfie Upload

![Dos and Don'ts Guide](./path-to-dos-and-donts-image.png)

---

## 🎯 Future Enhancements

* Add blur and lighting detection
* Multi-language OCR support
* Data encryption / secure session storage

---

## 🛡 Disclaimer

This app is built for **educational and demonstration** purposes only. It is **not** intended for production or real-world legal identity verification.

---

## 👨‍💻 Author

* [Raunak Tohangar](https://github.com/raunaktohangar)

---

## ⭐️ Give it a Star!

If you found this project useful or interesting, please ⭐️ the repo to support future improvements.

```

