# Firebase Security Rules — Petualangan Arsyila

Copy-paste rules di bawah ke Firebase Console setelah project dibuat.
Rules ini penting untuk keamanan — tanpa rules ini, siapapun bisa edit/hapus data.

---

## 1. Firestore Rules

**Lokasi di Console:** Firestore Database → Rules → paste → Publish

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Cerita anak-anak
    match /stories/{storyId} {
      // Semua orang bisa BACA cerita yang sudah approved
      allow read: if resource.data.approved == true;

      // Siapa saja bisa BUAT cerita baru, tapi HARUS approved=false
      // Ini mencegah anak mem-publish langsung tanpa review parent
      allow create: if request.resource.data.approved == false
                    && request.resource.data.title is string
                    && request.resource.data.title.size() > 0
                    && request.resource.data.title.size() < 100
                    && request.resource.data.content is string
                    && request.resource.data.content.size() > 10
                    && request.resource.data.content.size() < 5000
                    && request.resource.data.author is string
                    && request.resource.data.author.size() < 50;

      // Hanya user yang LOGIN (= parent/admin) yang boleh update/delete
      allow update, delete: if request.auth != null;

      // Admin yang login bisa BACA semua cerita (termasuk yang belum approved)
      allow read: if request.auth != null;
    }
  }
}
```

---

## 2. Storage Rules

**Lokasi di Console:** Storage → Rules → paste → Publish

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Gambar ceritamu
    match /drawings/{imageId} {
      // Semua orang bisa lihat gambar
      allow read: if true;

      // Siapa saja bisa upload gambar baru (max 2 MB, hanya image)
      allow create: if request.resource.size < 2 * 1024 * 1024
                    && request.resource.contentType.matches('image/.*');

      // Hanya admin yang bisa hapus gambar
      allow delete: if request.auth != null;
    }
  }
}
```

---

## 3. Penjelasan Keamanan

- **`approved: false` by default** → Cerita baru TIDAK LANGSUNG TAYANG. Anak tidak bisa bypass ini dari frontend karena dicek di server-side rules.
- **Validasi panjang field** → Mencegah spam atau data abnormal.
- **Auth wajib untuk moderasi** → Hanya parent yang login (via admin.html) bisa approve/reject cerita.
- **Limit ukuran gambar 2 MB** → Mencegah abuse storage quota.

---

## 4. Tips Monitoring

- Firebase Console → **Firestore → Usage** untuk pantau reads/writes harian
- Firebase Console → **Storage → Usage** untuk pantau storage & bandwidth
- Free tier: 50K reads, 20K writes, 1 GB Firestore, 5 GB Storage per hari

Jika traffic ramai, aktifkan **Blaze Plan** (pay-as-you-go) — harganya sangat murah untuk project kecil (< $1/bulan biasanya).
