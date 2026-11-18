# Spesifikasi Final — Learning Management System (LMS) NUURUSSAADAH

> Dokumen rangkuman keputusan sebelum tahap scaffold. Versi: 1.0

## 1. Ringkasan Proyek

Membangun Learning Management System (LMS) berbasis web dengan **ORM sebagai inti pengelolaan data**. Proyek dimulai dari nol (greenfield) di direktori `D:\LMS-NUURUSSAADAH`.

## 2. Keputusan Teknologi

| Layer | Teknologi | Keterangan |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Fullstack: UI + server (Server Actions / Route Handlers) |
| ORM | **Prisma ORM** | Schema terpusat, type-safe, migration + `prisma studio` |
| Database | **MySQL / MariaDB** | Sesuai keputusan; cocok dengan hosting sekolah |
| Autentikasi | **Auth.js (NextAuth v5)** | Credentials provider + hashing password |
| Hashing Password | **bcrypt** | Menyimpan kredensial dengan aman |
| UI | **Tailwind CSS + shadcn/ui** | Komponen siap pakai, cepat |
| Form & Validasi | **React Hook Form + Zod** | Validasi dipakai bersama di client & server |
| Upload File | **UploadThing** atau local storage `/public` (dev) | Materi & lampiran tugas |
| Deploy (rencana) | **Vercel** + MySQL (hosting/VPS) | Menyesuaikan infrastruktur sekolah |

### Alasan pemilihan
- Satu bahasa (**TypeScript**) dari database hingga UI.
- **Prisma** menjadi single source of truth lewat `schema.prisma`, lalu di-generate jadi Prisma Client yang dipakai di server components dan Server Actions.
- **Server Actions** memungkinkan CRUD (kelas, materi, tugas, nilai, kuis) tanpa banyak endpoint REST manual.

## 3. Pengguna & Role

Sistem memiliki tiga role:

| Role | Deskripsi Singkat |
|---|---|
| **ADMIN** | Mengelola pengguna, kelas, dan keseluruhan sistem |
| **GURU** | Mengelola kelas yang diampu, materi, tugas, nilai, dan kuis |
| **SISWA** | Melihat materi, mengumpulkan tugas, mengerjakan kuis, melihat nilai |

## 4. Fitur Versi Pertama (v1)

- **Kelas** — manajemen kelas, enroll siswa, penugasan guru.
- **Materi** — upload/kelola materi pembelajaran (file/link) per kelas.
- **Tugas** — pembuatan tugas, pengumpulan oleh siswa, penilaian oleh guru.
- **Nilai** — pencatatan dan tampilan nilai siswa.
- **Kuis/UTS Online** — soal pilihan ganda, timer, dan **auto-scoring**.

## 5. Rancangan Model Data (Prisma)

| Model | Fungsi |
|---|---|
| `User` | Pengguna + `role` (`ADMIN`/`GURU`/`SISWA`) |
| `Class` | Kelas yang diampu guru |
| `Enrollment` | Relasi siswa ↔ kelas |
| `Material` | Materi + lampiran per kelas |
| `Assignment` | Tugas per kelas |
| `Submission` | Pengumpulan tugas siswa |
| `Grade` | Nilai siswa |
| `Quiz` | Kuis/UTS online |
| `Question` | Soal (pilihan ganda) |
| `Option` | Pilihan jawaban |
| `QuizAttempt` | Percobaan mengerjakan kuis + skor |
| `Answer` | Jawaban siswa per soal |

### Relasi utama (garis besar)
```
User (GURU) ──1:N── Class
Class ──1:N── Material
Class ──1:N── Assignment ──1:N── Submission
Class ──1:N── Quiz ──1:N── Question ──1:N── Option
Quiz ──1:N── QuizAttempt ──1:N── Answer
User (SISWA) ──N:M── Class (via Enrollment)
```

## 6. Struktur Folder Rencana

```
prisma/
  schema.prisma
  seed.ts
src/
  lib/
    prisma.ts        # singleton Prisma Client
    auth.ts          # konfigurasi Auth.js
  app/
    (auth)/login/
    (dashboard)/
      admin/...
      guru/...
      siswa/...
    api/...          # Route Handlers bila diperlukan
docs/
  spesifikasi-final-lms.md
```

## 7. Catatan Implementasi

- Semua akses data melalui **Prisma Client di sisi server** (Server Actions / Route Handlers) — ORM menjadi inti alur aplikasi.
- Validasi input memakai **Zod** di server dan klien.
- Password disimpan sebagai hash **bcrypt**.
- Role dicek pada layout/route handler per area dashboard.
- Database MySQL/MariaDB; connection string disimpan di `.env` (`DATABASE_URL`).

## 8. Status

- [x] Pemilihan stack
- [x] Penentuan database (MySQL/MariaDB)
- [x] Penentuan role (Admin, Guru, Siswa)
- [x] Penentuan fitur v1 (Kelas, Materi, Tugas, Nilai, Kuis/UTS)
- [ ] Scaffold proyek (menunggu persetujuan)
