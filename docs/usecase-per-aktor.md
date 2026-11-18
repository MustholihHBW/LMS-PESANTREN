# Use Case Diagram per Aktor — LMS NUURUSSAADAH

> Versi use case yang dipisah per aktor, masing-masing dengan batas sistem (*system boundary*).
> Ditulis dengan Mermaid (flowchart) karena Mermaid tidak menyediakan tipe use case native.

Daftar:
1. Use Case — Admin
2. Use Case — Guru
3. Use Case — Siswa

---

## 1. Use Case Diagram — Admin

```mermaid
flowchart LR
    Admin(("Admin"))

    subgraph SISTEM["Sistem LMS"]
        direction TB
        Login(["Login"])
        Logout(["Logout"])
        Profil(["Lihat Profil"])
        KelolaUser(["Kelola Pengguna"])
        KelolaKelas(["Kelola Kelas"])
        AssignGuru(["Assign Guru ke Kelas"])
        RekapNilai(["Lihat Rekap Nilai"])
    end

    Admin --> Login
    Admin --> Logout
    Admin --> Profil
    Admin --> KelolaUser
    Admin --> KelolaKelas
    Admin --> RekapNilai

    KelolaKelas -.->|include| AssignGuru
```

---

## 2. Use Case Diagram — Guru

```mermaid
flowchart LR
    Guru(("Guru"))

    subgraph SISTEM["Sistem LMS"]
        direction TB
        Login(["Login"])
        Logout(["Logout"])
        Profil(["Lihat Profil"])
        KelolaKelas(["Kelola Kelas Diampu"])
        KelolaMateri(["Kelola Materi"])
        KelolaTugas(["Kelola Tugas"])
        NilaiTugas(["Nilai Tugas"])
        KelolaKuis(["Kelola Kuis / UTS"])
        HasilKuis(["Lihat Hasil Kuis"])
    end

    Guru --> Login
    Guru --> Logout
    Guru --> Profil
    Guru --> KelolaKelas
    Guru --> KelolaMateri
    Guru --> KelolaTugas
    Guru --> KelolaKuis
    Guru --> HasilKuis

    KelolaTugas -.->|include| NilaiTugas
```

---

## 3. Use Case Diagram — Siswa

```mermaid
flowchart LR
    Siswa(("Siswa"))

    subgraph SISTEM["Sistem LMS"]
        direction TB
        Login(["Login"])
        Logout(["Logout"])
        Profil(["Lihat Profil"])
        LihatKelas(["Lihat Kelas"])
        UnduhMateri(["Unduh Materi"])
        KumpulTugas(["Kumpulkan Tugas"])
        LihatNilai(["Lihat Nilai"])
        KerjakanKuis(["Kerjakan Kuis / UTS"])
        HasilKuis(["Lihat Hasil Kuis"])
    end

    Siswa --> Login
    Siswa --> Logout
    Siswa --> Profil
    Siswa --> LihatKelas
    Siswa --> UnduhMateri
    Siswa --> KumpulTugas
    Siswa --> LihatNilai
    Siswa --> KerjakanKuis
    Siswa --> HasilKuis

    KumpulTugas -.->|include| Login
    KerjakanKuis -.->|include| Login
```
