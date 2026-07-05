/* ============================================================
   FIREBASE CONFIG — JobSuperFast
   ============================================================
   1. Go to https://console.firebase.google.com
   2. Create a project (or use an existing one)
   3. Add a Web App inside the project
   4. Copy the config object Firebase gives you and paste it below,
      replacing the placeholder values.
   5. In the Firebase Console, turn ON:
      - Authentication → Sign-in method → Email/Password
      - Authentication → Sign-in method → Google
      - Firestore Database → Create database (start in test mode
        while developing, then tighten security rules later)

   IMPORTANT: Until you paste real values below, the site runs in
   DEMO MODE automatically (see script.js -> FIREBASE_READY).
   In demo mode: login/save-job features are simulated using
   localStorage so you can still show off the UI in interviews
   without a live Firebase project.
   ============================================================ */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Flip this to true only after you've filled in real values above.
const FIREBASE_ENABLED = false;
