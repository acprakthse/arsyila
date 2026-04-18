# 🚀 Petualangan Arsyila — Panduan Setup

Panduan ini menjelaskan cara setup Firebase dan deploy website ke GitHub Pages.

## 📁 Struktur File

```
petualangan-arsyila/
├── index.html          ← Halaman utama (blog + animasi scroll)
├── cerita.html         ← Halaman detail cerita (buka saat card diklik)
├── tulis.html          ← Halaman input cerita anak
├── admin.html          ← Panel orang tua untuk manage cerita
├── firebase-config.js  ← Konfigurasi Firebase (edit file ini!)
├── FIREBASE_RULES.md   ← Rules keamanan untuk Firebase
└── SETUP.md            ← Panduan ini
```

## ⚡ Quick Start (3 langkah)

### Langkah 1: Setup Firebase Project

1. Buka https://console.firebase.google.com
2. Klik **"Add project"** → beri nama (misal: `petualangan-arsyila`)
3. Matikan Google Analytics (tidak perlu untuk project ini)
4. Setelah project dibuat, klik ikon **Web `</>`** untuk register app
5. Beri nama app (misal: "Arsyila Web") → **Register app**
6. **Copy objek `firebaseConfig`** yang muncul, lalu paste ke `firebase-config.js`

Contoh hasil edit `firebase-config.js`:
```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "petualangan-arsyila.firebaseapp.com",
  projectId: "petualangan-arsyila",
  storageBucket: "petualangan-arsyila.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:123:web:abc"
};
```

### Langkah 2: Enable Firestore, Storage, & Auth

Di Firebase Console, sidebar kiri:

**A. Firestore Database**
- Klik **Firestore Database** → **Create database**
- Pilih lokasi: `asia-southeast1` (Singapore) — terdekat dari Indonesia
- Mode: **Start in production mode** → Create
- Tab **Rules** → hapus rules default → paste dari `FIREBASE_RULES.md` bagian Firestore → **Publish**

**B. Storage**
- Klik **Storage** → **Get started**
- Next → Next → Done
- Tab **Rules** → paste dari `FIREBASE_RULES.md` bagian Storage → **Publish**

**C. Authentication** (untuk login admin)
- Klik **Authentication** → **Get started**
- Tab **Sign-in method** → klik **Email/Password** → Enable → Save
- Tab **Users** → **Add user**
  - Email: (email Ardian)
  - Password: (buat password kuat)
  - → **Add user**
- Akun ini yang akan dipakai untuk login di `admin.html`

### Langkah 3: Deploy ke GitHub Pages

```bash
# 1. Buat repo baru di GitHub (misal: petualangan-arsyila)
# 2. Di terminal local:
cd petualangan-arsyila
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/petualangan-arsyila.git
git push -u origin main

# 3. Di GitHub repo → Settings → Pages
# Source: Deploy from a branch
# Branch: main, folder: / (root)
# Save
```

**Penting:** Setelah deploy, tambahkan domain GitHub Pages kamu ke **Authorized domains** di Firebase:
- Firebase Console → Authentication → Settings → Authorized domains
- Add domain: `USERNAME.github.io`

Website live di: `https://USERNAME.github.io/petualangan-arsyila/`

---

## 🎯 Cara Pakai Website

### Untuk Anak-anak:
1. Buka `index.html` — lihat animasi scroll, baca cerita Arsyila
2. **Klik card cerita** untuk buka halaman detail (`cerita.html`) dengan gambar besar & cerita lengkap
3. Di halaman detail ada tombol emoji reaction (❤️ 😂 🤩 👏 🌟) untuk kasih apresiasi
4. Klik tombol **✏️ Tulis Cerita** di nav untuk buat cerita baru
5. Isi nama, judul, kategori → tulis cerita → gambar di canvas
6. Klik **🚀 Terbitkan Ceritaku!** — cerita menunggu review orang tua

### Untuk Orang Tua (admin.html):
1. Buka `admin.html` → login dengan email/password dari Firebase
2. Ada 3 tab: **⏳ Menunggu Review**, **✓ Sudah Tayang**, **📚 Semua**
3. Tombol aksi per card:
   - 👁 — preview cerita di modal
   - ✏️ — edit lengkap (judul, nama, umur, kategori, ikon, isi cerita)
   - 🔗 — buka halaman detail di tab baru (hanya untuk yang sudah tayang)
   - ✓ Setujui / ⏸ Sembunyikan — toggle visibility
   - 🗑 — hapus permanen (termasuk gambar di Storage)
4. Semua perubahan real-time ke halaman utama — tidak perlu refresh manual

---

## 🛡️ Catatan Keamanan

- Cerita baru TIDAK LANGSUNG TAYANG — selalu `approved: false` dulu
- Rules Firestore mencegah anak bypass approval dari frontend
- Validasi panjang input (title, content, author) di server-side rules
- Limit upload gambar 2 MB per file
- Delete gambar dan document otomatis sinkron (lewat `admin.html`)

## 💰 Biaya

Free tier Firebase per hari:
- **Firestore**: 50.000 reads, 20.000 writes, 20.000 deletes, 1 GB storage
- **Storage**: 5 GB storage, 1 GB/day download, 20K upload/day
- **Authentication**: Unlimited untuk Email/Password

Untuk blog cerita anak, ini lebih dari cukup. Biaya baru muncul kalau traffic sangat besar (ribuan user harian).

## 🐛 Troubleshooting

**"Firebase: Error (auth/invalid-api-key)"**
→ `firebase-config.js` belum diisi dengan benar. Cek ulang dari Firebase Console → Project Settings → Your apps.

**"Missing or insufficient permissions"**
→ Rules belum di-publish. Re-check Firestore Rules dan Storage Rules.

**"Cross-Origin Request Blocked" saat test lokal**
→ Jangan buka file pakai `file://`. Pakai local server:
```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

**Gambar tidak muncul di index.html**
→ Cek Firebase Console → Storage → Rules sudah allow read public

---

## 🎨 Mode Demo (tanpa Firebase)

Kalau `firebase-config.js` belum diedit (masih ada placeholder `GANTI_DENGAN_...`), website otomatis berjalan dalam **mode demo** pakai `localStorage`:
- Cerita tersimpan lokal di browser
- `admin.html` bisa diakses langsung tanpa login
- Cocok untuk demo atau development

Mode demo berguna untuk testing UI sebelum setup Firebase. Tapi data tidak shared antar device.

---

Selamat berpetualang! ✨
