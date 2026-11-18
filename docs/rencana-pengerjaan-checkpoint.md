# Rencana Pengerjaan Proyek — LMS NUURUSSAADAH (Checkpoint)

> Berdasarkan `docs/spesifikasi-final-lms.md`. Setiap checkpoint punya tujuan, daftar tugas, dan definisi selesai (Definition of Done). Kerjakan berurutan.

---

## CP-0 — Persiapan & Inisialisasi Proyek

**Tujuan:** Menyiapkan lingkungan dan kerangka proyek Next.js.

- [ ] Pastikan Node.js LTS & npm terpasang.
- [ ] Pastikan MySQL/MariaDB berjalan dan buat database `lms_nuurussaadah`.
- [ ] Inisialisasi git (`git init`) + `.gitignore` (termasuk `.env`).
- [ ] Scaffold `create-next-app` (TypeScript, App Router, Tailwind, ESLint).
- [ ] Setup alias import (`@/*`), struktur folder `src/`.
- [ ] Inisialisasi **shadcn/ui**.
- [ ] Buat `.env` + `.env.example` (`DATABASE_URL`, `AUTH_SECRET`).

**Definition of Done:** `npm run dev` jalan, halaman default tampil tanpa error.

---

## CP-1 — Fondasi Prisma & Database

**Tujuan:** ORM dan skema data siap, database ter-migrasi.

- [ ] Install `prisma` + `@prisma/client`, `prisma init`.
- [ ] Tulis `schema.prisma` lengkap (User, Class, Enrollment, Material, Assignment, Submission, Grade, Quiz, Question, Option, QuizAttempt, Answer) + enum `Role`.
- [ ] Tentukan relasi antar model & index penting.
- [ ] Jalankan migrasi awal (`prisma migrate dev`).
- [ ] Buat `prisma/seed.ts` (akun admin/guru/siswa contoh + kelas contoh).
- [ ] Buat `src/lib/prisma.ts` (singleton Prisma Client).
- [ ] Verifikasi data via `prisma studio`.

**Definition of Done:** Migrasi sukses, seed berjalan, data terlihat di Prisma Studio.

---

## CP-2 — Autentikasi & Role-Based Access Control

**Tujuan:** Login aman dan pembatasan akses per role.

- [ ] Install & konfigurasi **Auth.js (NextAuth v5)** dengan Credentials provider.
- [ ] Hash password dengan **bcrypt** (registrasi/seed).
- [ ] Halaman `/login` + validasi Zod.
- [ ] Simpan `role` pada session/JWT.
- [ ] Middleware proteksi route `/admin`, `/guru`, `/siswa`.
- [ ] Helper `getSession`/`requireRole` di server.

**Definition of Done:** Tiap role login dan diarahkan ke dashboard sesuai, route lain tertolak.

---

## CP-3 — Layout & Dashboard per Role

**Tujuan:** Kerangka UI dan navigasi tiap role.

- [ ] Layout dashboard (sidebar/topbar) dengan menu sesuai role.
- [ ] Halaman utama `admin`, `guru`, `siswa`.
- [ ] Komponen bersama (table, form, dialog, empty state).
- [ ] Halaman profil & logout.

**Definition of Done:** Navigasi antar menu berfungsi, tampilan konsisten.

---

## CP-4 — Modul Kelas & Enrollment

**Tujuan:** Manajemen kelas dan keanggotaan.

- [ ] Admin: CRUD kelas + assign guru.
- [ ] Guru: melihat/mengelola kelas yang diampu.
- [ ] Enroll siswa ke kelas (admin/guru).
- [ ] Siswa: melihat daftar kelas yang diikuti.
- [ ] Server Actions + validasi Zod.

**Definition of Done:** Kelas dapat dibuat, siswa ter-enroll, tampil sesuai role.

---

## CP-5 — Modul Materi

**Tujuan:** Distribusi materi pembelajaran.

- [ ] Guru: upload materi (file/link) + judul/deskripsi per kelas.
- [ ] Daftar & hapus materi.
- [ ] Siswa: melihat/mengunduh materi.
- [ ] Konfigurasi storage upload (UploadThing atau lokal).

**Definition of Done:** Guru mengunggah materi, siswa dapat mengaksesnya.

---

## CP-6 — Modul Tugas & Pengumpulan

**Tujuan:** Alur tugas dari pembuatan hingga pengumpulan.

- [ ] Guru: buat tugas (judul, deskripsi, deadline, lampiran).
- [ ] Siswa: melihat tugas & mengumpulkan (file/teks) sebelum deadline.
- [ ] Guru: melihat daftar pengumpulan.
- [ ] Status pengumpulan (belum/terkumpul/terlambat).

**Definition of Done:** Tugas dibuat, siswa mengumpulkan, guru melihat submission.

---

## CP-7 — Modul Nilai

**Tujuan:** Pencatatan dan tampilan nilai.

- [ ] Guru: input/edit nilai tugas & komponen nilai.
- [ ] Perhitungan nilai akhir (bobot sederhana).
- [ ] Siswa: melihat rekap nilai.
- [ ] Admin: melihat rekap nilai per kelas.

**Definition of Done:** Nilai tersimpan dan tampil sesuai role dengan perhitungan benar.

---

## CP-8 — Modul Kuis / UTS Online

**Tujuan:** Kuis pilihan ganda dengan timer dan auto-scoring.

- [ ] Guru: CRUD kuis, soal pilihan ganda, opsi jawaban + kunci.
- [ ] Pengaturan kuis (durasi, waktu buka/tutup, percobaan).
- [ ] Siswa: mengerjakan kuis dengan **timer**.
- [ ] Auto-scoring saat submit → simpan `QuizAttempt` + `Answer`.
- [ ] Hasil & rekap skor untuk guru dan siswa.
- [ ] Cegah submit ganda / akses di luar waktu.

**Definition of Done:** Siswa menyelesaikan kuis, skor terhitung otomatis, hasil terlihat.

---

## CP-9 — Penyempurnaan, Pengujian & Dokumentasi

**Tujuan:** Stabilkan dan siapkan rilis.

- [ ] Validasi & error handling menyeluruh (Zod di server).
- [ ] Pengujian alur kunci (login, CRUD, submit, kuis).
- [ ] Perbaikan UI/responsif & aksesibilitas dasar.
- [ ] Update dokumentasi (README, cara instalasi, env).
- [ ] Seed data demo final.

**Definition of Done:** Alur utama lolos uji, dokumentasi lengkap, `npm run build` sukses.

---

## CP-10 — Deployment (Opsional)

**Tujuan:** Rilis ke lingkungan nyata.

- [ ] Siapkan database produksi (MySQL/MariaDB).
- [ ] Set environment variables di platform.
- [ ] `prisma migrate deploy` + seed produksi.
- [ ] Deploy aplikasi & uji smoke test.

**Definition of Done:** Aplikasi dapat diakses online dan fungsi inti berjalan.

---

## Ringkasan Urutan

| CP | Fokus | Ketergantungan |
|---|---|---|
| CP-0 | Inisialisasi | — |
| CP-1 | Prisma & DB | CP-0 |
| CP-2 | Auth & RBAC | CP-1 |
| CP-3 | Layout Dashboard | CP-2 |
| CP-4 | Kelas & Enrollment | CP-2, CP-3 |
| CP-5 | Materi | CP-4 |
| CP-6 | Tugas & Submission | CP-5 |
| CP-7 | Nilai | CP-6 |
| CP-8 | Kuis/UTS | CP-7 |
| CP-9 | Pengujian & Dokumentasi | CP-4 s.d. CP-8 |
| CP-10 | Deployment | CP-9 |
