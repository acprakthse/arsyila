// ============================================================
// KONFIGURASI FIREBASE — Petualangan Arsyila
// ============================================================
// CARA SETUP:
// 1. Buka https://console.firebase.google.com
// 2. Klik "Add project" → beri nama (misal: "petualangan-arsyila")
// 3. Setelah project dibuat, klik ikon Web (</>) untuk register app
// 4. Salin objek firebaseConfig dari sana ke bawah ini
// 5. Di sidebar Firebase Console:
//    a. Firestore Database → Create database → Mode: "Start in production mode"
//    b. Storage → Get started → Mode: "Start in production mode"
// 6. Copy rules dari file FIREBASE_RULES.md ke masing-masing service
// 7. Untuk halaman admin: Authentication → Sign-in method → enable "Email/Password"
//    Lalu di tab "Users" → Add user manual (ini akan jadi akun parent/admin)
// ============================================================

export const firebaseConfig = {
  apiKey: "AIzaSyDYTlF_heLG183G4Zqj2UcZtOu0FrHlVFs",
  authDomain: "arsyila-46df2.firebaseapp.com",
  projectId: "arsyila-46df2",
  storageBucket: "arsyila-46df2.firebasestorage.app",
  messagingSenderId: "410063092137",
  appId: "1:410063092137:web:c5bc8cf00a2ca87770acb8",
  measurementId: "G-KF7H0ZPL8Y"
};

// Flag untuk mode demo (tanpa Firebase) — fallback ke localStorage
// Otomatis terdeteksi dari apiKey placeholder
export const DEMO_MODE = firebaseConfig.apiKey.startsWith("GANTI");
