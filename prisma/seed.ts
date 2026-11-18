import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@lms.test" },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@lms.test",
      password,
      role: Role.ADMIN,
    },
  });

  const guru = await prisma.user.upsert({
    where: { email: "guru@lms.test" },
    update: {},
    create: {
      name: "Ustadz Ahmad",
      email: "guru@lms.test",
      password,
      role: Role.GURU,
    },
  });

  const siswa = await prisma.user.upsert({
    where: { email: "siswa@lms.test" },
    update: {},
    create: {
      name: "Santri Abdullah",
      email: "siswa@lms.test",
      password,
      role: Role.SISWA,
    },
  });

  const siswa2 = await prisma.user.upsert({
    where: { email: "siswa2@lms.test" },
    update: {},
    create: {
      name: "Santriah Aisyah",
      email: "siswa2@lms.test",
      password,
      role: Role.SISWA,
    },
  });

  const kelas = await prisma.class.upsert({
    where: { id: "class-matematika-7a" },
    update: {},
    create: {
      id: "class-matematika-7a",
      name: "Matematika 7A",
      description: "Kelas Matematika semester ganjil",
      teacherId: guru.id,
    },
  });

  for (const student of [siswa, siswa2]) {
    await prisma.enrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: kelas.id,
        },
      },
      update: {},
      create: {
        studentId: student.id,
        classId: kelas.id,
      },
    });
  }

  await prisma.material.upsert({
    where: { id: "material-aljabar" },
    update: {},
    create: {
      id: "material-aljabar",
      title: "Pengantar Aljabar",
      description: "Ringkasan materi operasi aljabar dasar.",
      classId: kelas.id,
    },
  });

  await prisma.assignment.upsert({
    where: { id: "assignment-latihan-1" },
    update: {},
    create: {
      id: "assignment-latihan-1",
      title: "Latihan Aljabar 1",
      description: "Kerjakan soal latihan pada buku halaman 12.",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      classId: kelas.id,
    },
  });

  await prisma.quiz.upsert({
    where: { id: "quiz-aljabar-1" },
    update: {},
    create: {
      id: "quiz-aljabar-1",
      title: "Kuis Aljabar Dasar",
      description: "Kuis pilihan ganda operasi hitung dasar.",
      durationMinutes: 30,
      classId: kelas.id,
      questions: {
        create: [
          {
            text: "Berapa hasil dari 2 + 3 x 4?",
            points: 10,
            options: {
              create: [
                { text: "20", isCorrect: false },
                { text: "14", isCorrect: true },
                { text: "24", isCorrect: false },
                { text: "10", isCorrect: false },
              ],
            },
          },
          {
            text: "Nilai x dari 2x + 4 = 10 adalah?",
            points: 10,
            options: {
              create: [
                { text: "2", isCorrect: false },
                { text: "3", isCorrect: true },
                { text: "4", isCorrect: false },
                { text: "5", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seed selesai:");
  console.log(`- Admin : ${admin.email}`);
  console.log(`- Guru  : ${guru.email}`);
  console.log(`- Siswa : ${siswa.email}, ${siswa2.email}`);
  console.log("- Password semua akun demo: password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
