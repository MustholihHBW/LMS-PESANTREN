# Diagram UML — LMS NUURUSSAADAH

> Berdasarkan `docs/spesifikasi-final-lms.md`. Diagram ditulis dengan **Mermaid** agar dapat dirender di VS Code / GitHub / Markdown viewer yang mendukung.

Daftar diagram:
1. Use Case Diagram
2. Activity Diagram — Admin
3. Activity Diagram — Guru
4. Activity Diagram — Siswa
5. Class Diagram

---

## 1. Use Case Diagram

> Catatan: Mermaid tidak menyediakan tipe *use case diagram* native, sehingga direpresentasikan dengan flowchart (aktor = node lingkaran, use case = node stadium).

```mermaid
flowchart LR
    %% ===== Aktor =====
    Admin(("Admin"))
    Guru(("Guru"))
    Siswa(("Siswa"))

    %% ===== Use Case Umum =====
    Login(["Login"])
    Logout(["Logout"])
    Profil(["Lihat Profil"])

    %% ===== Use Case Admin =====
    KelolaUser(["Kelola Pengguna"])
    KelolaKelas(["Kelola Kelas"])
    AssignGuru(["Assign Guru ke Kelas"])
    RekapNilai(["Lihat Rekap Nilai"])

    %% ===== Use Case Guru =====
    GKelolaKelas(["Kelola Kelas Diampu"])
    GKelolaMateri(["Kelola Materi"])
    GKelolaTugas(["Kelola Tugas"])
    GNilaiTugas(["Nilai Tugas"])
    GKelolaKuis(["Kelola Kuis / UTS"])
    GHasilKuis(["Lihat Hasil Kuis"])

    %% ===== Use Case Siswa =====
    SLihatKelas(["Lihat Kelas"])
    SUnduhMateri(["Unduh Materi"])
    SKumpulTugas(["Kumpulkan Tugas"])
    SLihatNilai(["Lihat Nilai"])
    SKerjakanKuis(["Kerjakan Kuis / UTS"])
    SLihatHasil(["Lihat Hasil Kuis"])

    %% ===== Relasi Aktor =====
    Admin --> Login
    Admin --> Logout
    Admin --> Profil
    Admin --> KelolaUser
    Admin --> KelolaKelas
    Admin --> AssignGuru
    Admin --> RekapNilai

    Guru --> Login
    Guru --> Logout
    Guru --> Profil
    Guru --> GKelolaKelas
    Guru --> GKelolaMateri
    Guru --> GKelolaTugas
    Guru --> GNilaiTugas
    Guru --> GKelolaKuis
    Guru --> GHasilKuis

    Siswa --> Login
    Siswa --> Logout
    Siswa --> Profil
    Siswa --> SLihatKelas
    Siswa --> SUnduhMateri
    Siswa --> SKumpulTugas
    Siswa --> SLihatNilai
    Siswa --> SKerjakanKuis
    Siswa --> SLihatHasil

    %% ===== Include =====
    KelolaKelas -.->|include| AssignGuru
    SKumpulTugas -.->|include| Login
    SKerjakanKuis -.->|include| Login
```

---

## 2. Activity Diagram — Admin

```mermaid
flowchart TD
    Start([Mulai]) --> Login[Input email & password]
    Login --> Valid{Valid?}
    Valid -- Tidak --> Err[Tampilkan pesan error]
    Err --> Login
    Valid -- Ya --> Dash[Dashboard Admin]
    Dash --> Pilih{Pilih Aksi}

    Pilih -- Kelola Pengguna --> CU[Tambah/Ubah/Hapus user]
    Pilih -- Kelola Kelas --> CK[Tambah/Ubah/Hapus kelas]
    Pilih -- Assign Guru --> AG[Tetapkan guru ke kelas]
    Pilih -- Rekap Nilai --> RN[Lihat rekap nilai per kelas]

    CU --> Simpan[Simpan ke database via Prisma]
    CK --> Simpan
    AG --> Simpan
    RN --> Tampil[Tampilkan data]

    Simpan --> Lagi{Lanjut?}
    Tampil --> Lagi
    Lagi -- Ya --> Pilih
    Lagi -- Tidak --> Logout[Logout]
    Logout --> End([Selesai])
```

---

## 3. Activity Diagram — Guru

```mermaid
flowchart TD
    Start([Mulai]) --> Login[Input email & password]
    Login --> Valid{Valid?}
    Valid -- Tidak --> Err[Tampilkan pesan error]
    Err --> Login
    Valid -- Ya --> Dash[Dashboard Guru]
    Dash --> Pilih{Pilih Aksi}

    Pilih -- Kelola Materi --> Materi[Buat/Ubah/Hapus materi + upload file]
    Pilih -- Kelola Tugas --> Tugas[Buat tugas + deadline]
    Pilih -- Nilai Tugas --> Nilai[Input nilai submission siswa]
    Pilih -- Kelola Kuis --> Kuis[Buat kuis + soal pilihan ganda + kunci]
    Pilih -- Lihat Hasil Kuis --> Hasil[Lihat skor & rekap kuis]

    Materi --> Simpan[Simpan ke database via Prisma]
    Tugas --> Simpan
    Nilai --> Simpan
    Kuis --> Simpan
    Hasil --> Tampil[Tampilkan data]

    Simpan --> Lagi{Lanjut?}
    Tampil --> Lagi
    Lagi -- Ya --> Pilih
    Lagi -- Tidak --> Logout[Logout]
    Logout --> End([Selesai])
```

---

## 4. Activity Diagram — Siswa

```mermaid
flowchart TD
    Start([Mulai]) --> Login[Input email & password]
    Login --> Valid{Valid?}
    Valid -- Tidak --> Err[Tampilkan pesan error]
    Err --> Login
    Valid -- Ya --> Dash[Dashboard Siswa]

    Dash --> Kelas[Pilih Kelas]
    Kelas --> Pilih{Pilih Aksi}

    Pilih -- Lihat Materi --> Materi[Unduh/buka materi]
    Pilih -- Kumpulkan Tugas --> CekDeadline{Sebelum deadline?}
    CekDeadline -- Tidak --> Tolak[Tolak pengumpulan]
    CekDeadline -- Ya --> Upload[Upload file/jawaban]
    Upload --> SimpanSub[Simpan Submission]

    Pilih -- Kerjakan Kuis --> CekWaktu{Waktu tersedia?}
    CekWaktu -- Tidak --> Tutup[Kuis tidak tersedia]
    CekWaktu -- Ya --> Kerjakan[Jawab soal + timer berjalan]
    Kerjakan --> Submit[Submit jawaban]
    Submit --> AutoScore[Auto-scoring via Prisma]
    AutoScore --> SimpanSkor[Simpan QuizAttempt + Answer]

    Pilih -- Lihat Nilai --> Nilai[Tampilkan nilai tugas & kuis]

    Materi --> Lagi{Lanjut?}
    SimpanSub --> Lagi
    SimpanSkor --> Lagi
    Nilai --> Lagi
    Tolak --> Lagi
    Tutup --> Lagi
    Lagi -- Ya --> Pilih
    Lagi -- Tidak --> Logout[Logout]
    Logout --> End([Selesai])
```

---

## 5. Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +String email
        +String password
        +Role role
        +DateTime createdAt
        +login()
        +logout()
    }

    class Class {
        +String id
        +String name
        +String description
        +String teacherId
        +DateTime createdAt
        +addStudent()
        +removeStudent()
    }

    class Enrollment {
        +String id
        +String studentId
        +String classId
        +DateTime enrolledAt
    }

    class Material {
        +String id
        +String title
        +String description
        +String fileUrl
        +String classId
        +DateTime createdAt
    }

    class Assignment {
        +String id
        +String title
        +String description
        +DateTime dueDate
        +String fileUrl
        +String classId
        +DateTime createdAt
    }

    class Submission {
        +String id
        +String assignmentId
        +String studentId
        +String fileUrl
        +String content
        +SubmissionStatus status
        +DateTime submittedAt
    }

    class Grade {
        +String id
        +String studentId
        +String classId
        +String assignmentId
        +String quizAttemptId
        +Float score
        +String feedback
        +DateTime gradedAt
        +calculateFinalScore()
    }

    class Quiz {
        +String id
        +String title
        +String description
        +Int durationMinutes
        +DateTime startAt
        +DateTime endAt
        +String classId
        +isOpen()
    }

    class Question {
        +String id
        +String quizId
        +String text
        +Int points
    }

    class Option {
        +String id
        +String questionId
        +String text
        +Boolean isCorrect
    }

    class QuizAttempt {
        +String id
        +String quizId
        +String studentId
        +DateTime startedAt
        +DateTime submittedAt
        +Float score
        +submit()
        +autoScore()
    }

    class Answer {
        +String id
        +String attemptId
        +String questionId
        +String optionId
        +Boolean isCorrect
    }

    class Role {
        <<enumeration>>
        ADMIN
        GURU
        SISWA
    }

    class SubmissionStatus {
        <<enumeration>>
        BELUM
        TERKUMPUL
        TERLAMBAT
    }

    %% ===== Relasi =====
    User "1" --> "0..*" Class : mengampu
    User "1" --> "0..*" Enrollment : enrollment
    Class "1" --> "0..*" Enrollment : memiliki
    Class "1" --> "0..*" Material : memiliki
    Class "1" --> "0..*" Assignment : memiliki
    Class "1" --> "0..*" Quiz : memiliki
    Assignment "1" --> "0..*" Submission : memiliki
    User "1" --> "0..*" Submission : mengumpulkan
    User "1" --> "0..*" Grade : menerima
    Class "1" --> "0..*" Grade : memiliki
    Quiz "1" --> "0..*" Question : berisi
    Question "1" --> "0..*" Option : memiliki
    Quiz "1" --> "0..*" QuizAttempt : dikerjakan
    User "1" --> "0..*" QuizAttempt : mengerjakan
    QuizAttempt "1" --> "0..*" Answer : berisi
    Question "1" --> "0..*" Answer : dijawab
    User --> Role : memiliki
    Submission --> SubmissionStatus : status
```

---

## Catatan Pemetaan ke Prisma

| Kelas UML | Model Prisma | Keterangan |
|---|---|---|
| User | `User` | Ditambah enum `Role` |
| Class | `Class` | Relasi ke guru (User) |
| Enrollment | `Enrollment` | Tabel pivot siswa ↔ kelas |
| Material | `Material` | Materi per kelas |
| Assignment | `Assignment` | Tugas per kelas |
| Submission | `Submission` | Pengumpulan tugas |
| Grade | `Grade` | Nilai tugas/kuis |
| Quiz | `Quiz` | Kuis/UTS |
| Question | `Question` | Soal pilihan ganda |
| Option | `Option` | Pilihan + kunci |
| QuizAttempt | `QuizAttempt` | Percobaan + skor |
| Answer | `Answer` | Jawaban siswa |
| — | enum `SubmissionStatus` | Status pengumpulan |
