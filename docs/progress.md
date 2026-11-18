# Progress Pengerjaan — LMS NUURUSSAADAH

> Terakhir diperbarui: 2026-11-18
> Status keseluruhan: **CP-1 SELESAI**, siap lanjut CP-2

---

## 1. Ringkasan Checkpoint

| CP | Fokus | Status |
|---|---|---|
| CP-0 | Inisialisasi proyek | ✅ Selesai |
| CP-1 | Prisma & database | ✅ Selesai |
| CP-2 | Auth & RBAC | ⏳ Belum |
| CP-3 | Layout dashboard | ⏳ Belum |
| CP-4 | Kelas & enrollment | ⏳ Belum |
| CP-5 | Materi | ⏳ Belum |
| CP-6 | Tugas & submission | ⏳ Belum |
| CP-7 | Nilai | ⏳ Belum |
| CP-8 | Kuis/UTS | ⏳ Belum |
| CP-9 | Pengujian & dokumentasi | ⏳ Belum |
| CP-10 | Deployment | ⏳ Belum |

---

## 2. Environment

| Komponen | Nilai |
|---|---|
| OS | Windows |
| Working directory | `D:\LMS-NUURUSSAADAH` |
| Node.js | v24.11.1 |
| npm | 11.6.2 |
| Git | `C:\Program Files\Git\cmd\git.exe` |
| GitHub | `https://github.com/MustholihHBW/LMS-PESANTREN.git` |

---

## 3. Database — MariaDB

- Versi: **13.0.2** (via winget `MariaDB.Server`)
- Lokasi: `C:\Program Files\MariaDB 13.0`
- Service: **MariaDB**, status **RUNNING**
- Database: `lms_nuurussaadah` (utf8mb4 / utf8mb4_unicode_ci)
- Akses dev: user `root`, tanpa password

### my.ini
```ini
[mysqld]
datadir=C:/Program Files/MariaDB 13.0/data
port=3306
innodb_buffer_pool_size=981M
[client]
port=3306
plugin-dir=C:\Program Files\MariaDB 13.0/lib/plugin
```

### Connection string
```
DATABASE_URL="mysql://root@localhost:3306/lms_nuurussaadah"
```

---

## 3b. Prisma (CP-1)

- Versi: **Prisma 7.10.1** (client & CLI)
- Alasan turun dari v8: Prisma 8 masih RC dan memakai alur config baru (`contract emit` / `family` / `target`)
- Driver adapter: `@prisma/adapter-mariadb`

### File
| File | Isi |
|---|---|
| `prisma/schema.prisma` | 12 model + enum `Role`, `SubmissionStatus` |
| `prisma/migrations/20261118032601_init` | Migrasi awal |
| `prisma.config.ts` | schema path, migrations path, seed, `datasource.url` |
| `prisma/seed.ts` | Akun demo + kelas + materi + tugas + kuis |
| `src/lib/prisma.ts` | Singleton `PrismaClient` dengan adapter MariaDB |

### Konfigurasi penting
- Prisma 7 tidak memuat `.env` otomatis → `prisma.config.ts` memakai `import "dotenv/config"`.
- `url` tidak lagi di `schema.prisma`, dipindah ke `datasource.url` di `prisma.config.ts`.
- Runtime client butuh adapter: `new PrismaClient({ adapter: new PrismaMariaDb(DATABASE_URL) })`.

### Migrasi & seed
```
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
```

### Akun demo (password semua: `password123`)
| Role | Email |
|---|---|
| Admin | `admin@lms.test` |
| Guru | `guru@lms.test` |
| Siswa | `siswa@lms.test` |
| Siswa | `siswa2@lms.test` |

### Verifikasi data
| Tabel | Jumlah |
|---|---|
| User | 4 |
| Class | 1 |
| Quiz | 1 |
| Question | 2 |

---

## 4. Aplikasi (Next.js)

| Item | Nilai |
|---|---|
| Framework | Next.js **16.4.6** (Turbopack) |
| React | 19.3.0 |
| Bahasa | TypeScript |
| Styling | Tailwind CSS 4.3.3 |
| UI kit | shadcn/ui (`components.json`, `src/components/ui`, `src/lib/utils.ts`) |
| Struktur | App Router, `src/app` |
| Alias import | `@/*` |

### File konfigurasi
- `.env` — `DATABASE_URL`, `AUTH_SECRET` (gitignored)
- `.env.example` — template
- `.npmrc` — `include=dev` agar devDependencies selalu terpasang
- `components.json` — konfigurasi shadcn

### Verifikasi
- `npm run build` → **berhasil** (TypeScript lolos, 4 halaman statis)

---

## 5. Git & GitHub

- Branch: `main`
- Remote: `origin` → `https://github.com/MustholihHBW/LMS-PESANTREN.git`
- Commit awal: `d769c97` — `chore: initial project scaffold with Next.js and documentation`
- `.commandcode/` di-ignore (preferensi pribadi tidak di-push)

---

## 6. Dokumen Proyek

| File | Isi |
|---|---|
| `docs/spesifikasi-final-lms.md` | Spesifikasi final |
| `docs/rencana-pengerjaan-checkpoint.md` | Rencana CP-0 s.d. CP-10 |
| `docs/diagram-uml.md` | UML (use case, activity, class) |
| `docs/usecase-per-aktor.md` | Use case per aktor |
| `docs/uml/src/*.mmd` | Source Mermaid |
| `docs/uml/png/*.png` | Render PNG |
| `docs/progress.md` | Dokumen ini |

---

## 7. Catatan Teknis

- `NODE_ENV=production` di environment membuat npm melewati devDependencies; diatasi dengan `npm install --production=false` dan `.npmrc` berisi `include=dev`.
- Build pertama gagal karena cache `.next` dibuat sebelum `@tailwindcss/turbopack` terpasang; solusi hapus `.next` lalu build ulang.
- Scaffold dibuat di folder sementara lalu disalin ke root karena root sudah berisi `docs/` dan `.commandcode/`.
- `npm audit` melaporkan 20 vulnerabilities (18 high). Belum di-`audit fix` agar tidak breaking.

---

## 8. Langkah Berikutnya (CP-2)

1. Install `next-auth@beta` (Auth.js v5) + `@auth/prisma-adapter` bila diperlukan.
2. Konfigurasi credentials provider + bcrypt.
3. Halaman `/login` dengan validasi Zod.
4. Simpan `role` di session/JWT.
5. Middleware proteksi route `/admin`, `/guru`, `/siswa`.
6. Helper `getSession` / `requireRole` di server.
