# Progress Pengerjaan — LMS NUURUSSAADAH

> Terakhir diperbarui: 2026-11-17
> Status keseluruhan: **CP-0 sedang berjalan** (inisialisasi proyek, sebagian selesai)

---

## 1. Ringkasan

| Item | Status |
|---|---|
| Dokumen spesifikasi | ✅ Selesai |
| Rencana checkpoint | ✅ Selesai |
| Diagram UML (MD + PNG) | ✅ Selesai |
| Use case per aktor (MD + PNG) | ✅ Selesai |
| Instalasi database | ✅ Selesai (MariaDB) |
| Inisialisasi git | ⏳ Belum |
| Scaffold Next.js | ⏳ Belum |
| Setup Prisma | ⏳ Belum (CP-1) |

---

## 2. Environment

| Komponen | Nilai |
|---|---|
| OS | Windows |
| Working directory | `D:\LMS-NUURUSSAADAH` |
| Node.js | v24.11.1 |
| npm | 11.6.2 |
| Git | `C:\Program Files\Git\cmd\git.exe` |
| Package manager | winget v1.29.380, Chocolatey 2.5.1 |
| Docker | Tidak tersedia |
| XAMPP / Laragon | Tidak tersedia |

---

## 3. Database — MariaDB

### Instalasi
- Package: `MariaDB.Server` versi **13.0.2**
- Metode: `winget install --id MariaDB.Server -e --source winget --accept-source-agreements --accept-package-agreements`
- Lokasi instalasi: `C:\Program Files\MariaDB 13.0`
- Binary CLI: `C:\Program Files\MariaDB 13.0\bin\mysql.exe`

### Konfigurasi (`C:\Program Files\MariaDB 13.0\data\my.ini`)
```ini
[mysqld]
datadir=C:/Program Files/MariaDB 13.0/data
port=3306
innodb_buffer_pool_size=981M
[client]
port=3306
plugin-dir=C:\Program Files\MariaDB 13.0/lib/plugin
```

### Service
- Nama service: **MariaDB**
- Status: **RUNNING**
- Perintah daftar service:
  ```
  "C:\Program Files\MariaDB 13.0\bin\mysqld.exe" --install MariaDB --defaults-file="C:\Program Files\MariaDB 13.0\data\my.ini"
  net start MariaDB
  ```

### Database
- Nama: `lms_nuurussaadah`
- Charset: `utf8mb4`, collation `utf8mb4_unicode_ci`
- Akses: user `root`, **tanpa password** (khusus development lokal)
- Verifikasi: `mysql -u root -e "SELECT VERSION();"` → `13.0.2-MariaDB`

### Connection string rencana
```
DATABASE_URL="mysql://root@localhost:3306/lms_nuurussaadah"
```

---

## 4. Dokumen yang Sudah Dibuat

| File | Isi |
|---|---|
| `docs/spesifikasi-final-lms.md` | Rangkuman spesifikasi final (stack, role, fitur, model, struktur) |
| `docs/rencana-pengerjaan-checkpoint.md` | Rencana CP-0 s.d. CP-10 + definisi selesai |
| `docs/diagram-uml.md` | Use case, activity per user, class diagram (Mermaid) |
| `docs/usecase-per-aktor.md` | Use case terpisah Admin / Guru / Siswa |
| `docs/uml/src/*.mmd` | Source Mermaid tiap diagram |
| `docs/uml/png/*.png` | Render PNG tiap diagram |

### Daftar PNG
- `docs/uml/png/usecase.png`
- `docs/uml/png/usecase-admin.png`
- `docs/uml/png/usecase-guru.png`
- `docs/uml/png/usecase-siswa.png`
- `docs/uml/png/activity-admin.png`
- `docs/uml/png/activity-guru.png`
- `docs/uml/png/activity-siswa.png`
- `docs/uml/png/class.png`

---

## 5. CP-0 — Status Detail

| Tugas | Status |
|---|---|
| Pastikan Node.js LTS & npm | ✅ v24.11.1 / 11.6.2 |
| Pastikan MariaDB berjalan | ✅ service `MariaDB` RUNNING |
| Buat database `lms_nuurussaadah` | ✅ selesai |
| Inisialisasi git (`git init`) | ⏳ belum |
| Scaffold `create-next-app` (TS, App Router, Tailwind, ESLint) | ⏳ belum |
| Setup alias import `@/*`, struktur `src/` | ⏳ belum (dibuat oleh scaffold) |
| Inisialisasi shadcn/ui | ⏳ belum |
| Buat `.env` + `.env.example` | ⏳ belum |

**Catatan teknis untuk scaffold berikutnya:**
- Direktori root sudah berisi `.commandcode/` dan `docs/`, sehingga `create-next-app` dijalankan di folder sementara lalu isinya disalin ke root (menghindari konflik folder non-empty).
- Rencana flag: `--ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --skip-install`. Setelah salin, jalankan `npm install` di root.

---

## 6. Perubahan Sistem yang Sudah Dilakukan

- Menginstal **MariaDB Server 13.0.2** via winget.
- Menginisialisasi data directory MariaDB (otomatis saat instalasi).
- Mendaftarkan dan menjalankan service Windows **MariaDB**.
- Membuat database **`lms_nuurussaadah`**.
- Menambahkan dokumen proyek di folder `docs/`.

> Tidak ada perubahan lain di luar proyek dan instalasi database.

---

## 7. Langkah Berikutnya

1. `git init` + pastikan `.gitignore` mencakup `.env` dan `node_modules`.
2. Scaffold Next.js (TypeScript + App Router + Tailwind).
3. `npm install` di root proyek.
4. Inisialisasi shadcn/ui.
5. Buat `.env` / `.env.example` dengan `DATABASE_URL`.
6. Lanjut **CP-1**: Prisma schema + migrasi + seed.
