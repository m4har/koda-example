// Mock domain data for the koda-example consumer app. Indonesian copy, own wording.

export type StudentStatus = "Aktif" | "Melamar" | "Lulus" | "Cuti" | "Mundur";

export interface Student {
  id: string;
  nama: string;
  email: string;
  batch: string;
  kelas: string;
  status: StudentStatus;
  progress: number; // 0-100
  joinedAt: string; // ISO date
}

export const BATCHES = [
  "Batch 5 — DevOps (Offline)",
  "Batch 6 — Backend (Online)",
  "Batch 7 — Frontend (Online)",
];

export const KELAS = ["DevOps", "Backend", "Frontend"];

export const students: Student[] = [
  { id: "STD-1041", nama: "Raka Pratama", email: "raka.pratama@example.com", batch: BATCHES[0], kelas: "DevOps", status: "Aktif", progress: 72, joinedAt: "2026-11-09" },
  { id: "STD-1042", nama: "Sinta Dewi", email: "sinta.dewi@example.com", batch: BATCHES[0], kelas: "DevOps", status: "Aktif", progress: 65, joinedAt: "2026-11-09" },
  { id: "STD-1043", nama: "Bagas Nugroho", email: "bagas.n@example.com", batch: BATCHES[0], kelas: "DevOps", status: "Melamar", progress: 88, joinedAt: "2026-05-04" },
  { id: "STD-1044", nama: "Citra Ayu", email: "citra.ayu@example.com", batch: BATCHES[1], kelas: "Backend", status: "Lulus", progress: 100, joinedAt: "2025-09-15" },
  { id: "STD-1045", nama: "Dimas Saputra", email: "dimas.s@example.com", batch: BATCHES[1], kelas: "Backend", status: "Aktif", progress: 41, joinedAt: "2026-09-07" },
  { id: "STD-1046", nama: "Elsa Marlina", email: "elsa.m@example.com", batch: BATCHES[1], kelas: "Backend", status: "Cuti", progress: 33, joinedAt: "2026-03-02" },
  { id: "STD-1047", nama: "Fajar Ramadhan", email: "fajar.r@example.com", batch: BATCHES[2], kelas: "Frontend", status: "Aktif", progress: 58, joinedAt: "2026-10-05" },
  { id: "STD-1048", nama: "Gita Permata", email: "gita.p@example.com", batch: BATCHES[2], kelas: "Frontend", status: "Lulus", progress: 100, joinedAt: "2025-04-07" },
  { id: "STD-1049", nama: "Hendra Wijaya", email: "hendra.w@example.com", batch: BATCHES[0], kelas: "DevOps", status: "Mundur", progress: 12, joinedAt: "2026-01-12" },
  { id: "STD-1050", nama: "Indah Sari", email: "indah.sari@example.com", batch: BATCHES[1], kelas: "Backend", status: "Melamar", progress: 91, joinedAt: "2025-09-15" },
  { id: "STD-1051", nama: "Joko Susilo", email: "joko.s@example.com", batch: BATCHES[2], kelas: "Frontend", status: "Aktif", progress: 77, joinedAt: "2026-10-05" },
  { id: "STD-1052", nama: "Kirana Putri", email: "kirana.p@example.com", batch: BATCHES[0], kelas: "DevOps", status: "Aktif", progress: 54, joinedAt: "2026-11-09" },
  { id: "STD-1053", nama: "Lukman Hakim", email: "lukman.h@example.com", batch: BATCHES[1], kelas: "Backend", status: "Lulus", progress: 100, joinedAt: "2025-01-06" },
  { id: "STD-1054", nama: "Maya Anjani", email: "maya.a@example.com", batch: BATCHES[2], kelas: "Frontend", status: "Cuti", progress: 29, joinedAt: "2026-06-01" },
  { id: "STD-1055", nama: "Naufal Akbar", email: "naufal.a@example.com", batch: BATCHES[0], kelas: "DevOps", status: "Melamar", progress: 84, joinedAt: "2026-05-04" },
];

export const statusVariant: Record<StudentStatus, "info" | "success" | "warning" | "destructive" | "muted"> = {
  Aktif: "info",
  Melamar: "warning",
  Lulus: "success",
  Cuti: "warning",
  Mundur: "destructive",
};

// --- Landing: batch cards ---
export const batchCards = [
  {
    nama: "Batch 5 — DevOps Engineering",
    mode: "Offline · Cibubur",
    mulai: "09 Nov 2026",
    selesai: "28 Feb 2027",
    batasDaftar: "26 Okt 2026",
    slot: "Sisa 6 slot",
    slotTone: "warning" as const,
  },
  {
    nama: "Batch 6 — Backend Engineering",
    mode: "Online · Live malam",
    mulai: "07 Sep 2026",
    selesai: "18 Des 2026",
    batasDaftar: "31 Agu 2026",
    slot: "Penuh",
    slotTone: "destructive" as const,
  },
  {
    nama: "Batch 7 — Frontend Engineering",
    mode: "Online · Live malam",
    mulai: "05 Okt 2026",
    selesai: "15 Jan 2027",
    batasDaftar: "21 Sep 2026",
    slot: "Pendaftaran dibuka",
    slotTone: "success" as const,
  },
];

// --- Landing: jadwal tabs (Bootcamp / Golang / Java & .NET) ---
export interface JadwalBatch {
  nama: string;
  deskripsi: string;
  tanggal: string;
  lokasi: string;
  jadwal: string;
  batasDaftar: string;
}

export const jadwalTabs: { id: string; label: string; batches: JadwalBatch[] }[] = [
  {
    id: "bootcamp",
    label: "Bootcamp",
    batches: [
      { nama: "Batch 5 — Fullstack Web", deskripsi: "Dasar pemrograman web sampai deploy portofolio siap kerja.", tanggal: "09 Nov 2026 – 28 Feb 2027", lokasi: "Offline · Cibubur", jadwal: "Fulltime 09.00–18.00 WIB", batasDaftar: "26 Okt 2026" },
      { nama: "Batch 6 — Web Malam", deskripsi: "Kelas live malam untuk yang sudah bekerja dan ingin pindah jalur.", tanggal: "07 Sep 2026 – 18 Des 2026", lokasi: "Online · Live malam", jadwal: "Fulltime 09.00–18.00 WIB", batasDaftar: "31 Agu 2026" },
    ],
  },
  {
    id: "golang",
    label: "Golang",
    batches: [
      { nama: "Kelas GL-1 — Backend Go Intensif", deskripsi: "REST API, concurrency, dan deployment layanan Go ke produksi.", tanggal: "16 Nov 2026 – 22 Jan 2027", lokasi: "Offline · Cibubur", jadwal: "Fulltime 09.00–18.00 WIB", batasDaftar: "02 Nov 2026" },
      { nama: "Kelas GL-2 — Go Microservice", deskripsi: "gRPC, observability, dan arsitektur service untuk tim backend.", tanggal: "11 Jan 2027 – 19 Mar 2027", lokasi: "Online · Live malam", jadwal: "Fulltime 09.00–18.00 WIB", batasDaftar: "28 Des 2026" },
    ],
  },
  {
    id: "java-dotnet",
    label: "Java & .NET",
    batches: [
      { nama: "Kelas JV-1 — Spring Boot", deskripsi: "Backend Java enterprise: Spring, JPA, dan pengujian terotomasi.", tanggal: "23 Nov 2026 – 29 Jan 2027", lokasi: "Offline · Cibubur", jadwal: "Fulltime 09.00–18.00 WIB", batasDaftar: "09 Nov 2026" },
      { nama: "Kelas NT-1 — ASP.NET Core", deskripsi: "Web API .NET, Entity Framework, dan deployment ke cloud.", tanggal: "18 Jan 2027 – 26 Mar 2027", lokasi: "Online · Live malam", jadwal: "Fulltime 09.00–18.00 WIB", batasDaftar: "04 Jan 2027" },
    ],
  },
];

// --- Landing: bulan timeline strip (Okt..Sep) ---
export const timelineMonths = ["Okt", "Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep"];

// --- Landing: jadwal table (5 kategori tab, 7 kolom) ---
export type JadwalKategori = "DevOps" | "Backend" | "Frontend" | "Data" | "Cloud";

export interface JadwalRow {
  kode: string;
  kelas: string;
  kategori: JadwalKategori;
  mulai: string;
  durasi: string;
  mode: string;
  lokasi: string;
  status: "Terbuka" | "Menunggu" | "Penuh";
}

export const jadwalCategories: JadwalKategori[] = ["DevOps", "Backend", "Frontend", "Data", "Cloud"];

export const jadwal: JadwalRow[] = [
  { kode: "DV-501", kelas: "Docker & Container Basic", kategori: "DevOps", mulai: "09 Nov 2026", durasi: "4 hari", mode: "Offline", lokasi: "Cibubur", status: "Terbuka" },
  { kode: "DV-502", kelas: "Kubernetes Operator", kategori: "DevOps", mulai: "07 Des 2026", durasi: "5 hari", mode: "Offline", lokasi: "Cibubur", status: "Menunggu" },
  { kode: "BE-411", kelas: "REST API dengan Go", kategori: "Backend", mulai: "07 Sep 2026", durasi: "6 hari", mode: "Online", lokasi: "Zoom", status: "Penuh" },
  { kode: "BE-412", kelas: "PostgreSQL Performance", kategori: "Backend", mulai: "14 Des 2026", durasi: "3 hari", mode: "Online", lokasi: "Zoom", status: "Terbuka" },
  { kode: "FE-321", kelas: "React Production Patterns", kategori: "Frontend", mulai: "05 Okt 2026", durasi: "5 hari", mode: "Online", lokasi: "Zoom", status: "Terbuka" },
  { kode: "FE-322", kelas: "TypeScript Strict Mode", kategori: "Frontend", mulai: "11 Jan 2027", durasi: "3 hari", mode: "Offline", lokasi: "Depok", status: "Menunggu" },
  { kode: "DA-210", kelas: "Analitik Data dengan Python", kategori: "Data", mulai: "03 Nov 2026", durasi: "6 hari", mode: "Online", lokasi: "Zoom", status: "Terbuka" },
  { kode: "DA-211", kelas: "Dashboard untuk Engineer", kategori: "Data", mulai: "12 Jan 2027", durasi: "4 hari", mode: "Online", lokasi: "Zoom", status: "Menunggu" },
  { kode: "CL-130", kelas: "AWS Core untuk Developer", kategori: "Cloud", mulai: "16 Nov 2026", durasi: "4 hari", mode: "Offline", lokasi: "Jakarta", status: "Terbuka" },
  { kode: "CL-131", kelas: "Infrastructure as Code", kategori: "Cloud", mulai: "18 Jan 2027", durasi: "5 hari", mode: "Online", lokasi: "Zoom", status: "Menunggu" },
];

// --- Landing: kurikulum modul (accordion) ---
export const modul = [
  { judul: "01 · Dasar Linux & Jaringan", materi: ["Shell & filesystem", "Systemd & service", "User & permission", "DNS, port, firewall", "SSH & troubleshooting"] },
  { judul: "02 · Container dengan Docker", materi: ["Image & registry", "Dockerfile production", "Volume & network", "Compose stack", "Hardening container"] },
  { judul: "03 · CI/CD & Otomasi", materi: ["Git flow", "Pipeline GitHub Actions", "Artifact & versioning", "Deploy otomatis", "Rollback strategy"] },
  { judul: "04 · Kubernetes", materi: ["Pod, deployment, service", "Ingress & configmap", "Autoscaling", "Observability cluster", "Capstone cluster"] },
  { judul: "05 · Observability & Cloud", materi: ["Log terpusat", "Metric & alerting", "Distribusi beban", "Backup & disaster recovery", "Biaya cloud"] },
  { judul: "06 · Capstone & Persiapan Karier", materi: ["Proposal proyek", "Review arsitektur", "Deploy publik", "Simulasi wawancara", "Penyaluran kerja"] },
];

// --- Landing: alumni & FAQ ---
export const alumni = [
  { quote: "Dari nol sampai bisa jaga pipeline produksi sendiri dalam satu batch. Mentornya benar-benar review kode tiap minggu.", name: "Rania Oktaviani", role: "DevOps Engineer · Fintech" },
  { quote: "Materi container dan Kubernetes langsung dipakai di kerjaan minggu pertama setelah lulus. Praktiknya nyata, bukan teori slide.", name: "Bagus Setiawan", role: "Platform Engineer · SaaS" },
  { quote: "Saya kerja dulu sambil ikut kelas malam. Jadwal fleksibel, tugas tetap ditagih. Sekarang gaji naik dua kali lipat.", name: "Alya Rahmadani", role: "Backend Engineer · E-commerce" },
  { quote: "Simulasi wawancaranya paling ngebantu. Dapet 3 offer dalam sebulan setelah sesi latihan bareng mentor.", name: "Fajar Maulana", role: "Site Reliability Engineer · Logistics" },
  { quote: "Capstone project saya dipakai demo waktu wawancara. Beda banget ceritanya kalau cuma punya sertifikat.", name: "Nadia Kusuma", role: "Cloud Engineer · Banking" },
  { quote: "Komunitas alumni aktif. Dapet referral pertama malah dari teman satu batch, bukan dari iklan lowongan.", name: "Rizky Firmansyah", role: "Infrastructure Engineer · Healthtech" },
];

export const faq = [
  { q: "Berapa biaya programnya?", a: "Total biaya Rp 42.000.000. Tersedia cicilan setelah bekerja: mulai bulan pertama setelah kamu diterima kerja dengan gaji di atas Rp 6.000.000, angsuran Rp 2.300.000 selama 18 bulan. Di bawah standar itu, cicilan disesuaikan dulu bareng tim kami." },
  { q: "Bagaimana metode belajarnya?", a: "Kelas live bersama mentor, bukan rekaman satu arah. Tiap modul ada praktik langsung, review kode mingguan, dan sesi tanya jawab. Kamu punya akses lab 24/7 untuk latihan mandiri." },
  { q: "Apa syarat ikut bootcamp?", a: "Usia minimal 18 tahun, punya laptop (pinjaman tersedia bila perlu), dan lulus tes dasar logika serta English reading sederhana. Tidak wajib punya latar belakang IT." },
  { q: "Bagaimana proses pendaftarannya?", a: "Isi formulir online, ikut tes tertulis dan wawancara singkat, lalu bayar biaya pendaftaran untuk mengunci kursi. Kuota tiap batch dibatasi agar review mentor tetap personal." },
  { q: "Bagaimana proses penyaluran kerjanya?", a: "Tim karier bantu perbaiki CV dan portofolio, latihan wawancara, lalu kirim rekomendasi ke perusahaan partner. Pendampingan berjalan sampai kamu diterima kerja, bukan berhenti saat lulus kelas." },
  { q: "Apakah bisa diikuti sambil bekerja?", a: "Bisa. Tersedia kelas live malam dan kelas akhir pekan untuk yang sudah bekerja. Beban tugas disesuaikan, tapi tetap ditagih tiap minggu supaya progres tidak mandek." },
];

// --- Landing: fasilitas (facility cards, accent 28px) ---
export const fasilitas = [
  { judul: "Cicil Biaya Setelah Dapat Kerja", desc: "Mulai angsuran bulan pertama setelah gaji di atas standar. Sebelum itu, tidak ada tagihan." },
  { judul: "Asrama & Dapur Bersama", desc: "Tinggal satu atap selama batch offline biar fokus belajar, urusan makan dan tempat tinggal beres." },
  { judul: "Pinjaman Laptop Jika Dibutuhkan", desc: "Belum punya laptop? Kami pinjamkan dulu supaya tidak ada yang tertinggal di hari pertama." },
  { judul: "Pendampingan Sampai Dapat Kerja", desc: "Review CV, portofolio, dan simulasi wawancara — berjalan terus sampai kamu diterima kerja." },
  { judul: "Belajar dengan Tech Stack yang Sesuai Dunia Kerja", desc: "Praktik pakai Git, Docker, dan CI/CD yang benar-benar dipakai tim engineering, bukan versi yang sudah usang." },
];

// --- Landing: Fokus Kami untuk Karirmu (feature grid) ---
export const fokusFeatures = [
  { title: "Kelas Live Malam", description: "Sesi langsung bersama mentor praktisi, bukan rekaman satu arah. Tanya jawab tiap pertemuan.", icon: "terminal" },
  { title: "Review Code Tiap Minggu", description: "Pull request kamu dibaca mentor, dapat catatan konkret yang dipakai di sprint berikutnya.", icon: "git-pull" },
  { title: "Lab 24/7", description: "Cluster nyata untuk latihan mandiri kapan saja — dari shell sampai Kubernetes.", icon: "server" },
  { title: "Proyek Portofolio", description: "Tiap modul ditutup proyek yang bisa dipamerkan ke rekruter, bukan toy project.", icon: "layers" },
  { title: "Persiapan Karier", description: "CV, LinkedIn, dan mock interview — dilatih sampai kamu siap ngobrol sama hiring manager.", icon: "briefcase" },
  { title: "Komunitas Alumni", description: "Grup aktif penuh referral kerja dari teman satu batch dan alumni sebelumnya.", icon: "users" },
];

// --- Landing: Proses Pendaftaran 4 Langkah ---
export const langkah = [
  { judul: "Isi Formulir Online", desc: "Data diri dan motivasi singkat, lima menit selesai." },
  { judul: "Tes Tertulis & Wawancara", desc: "Tes logika dasar dan English reading, lalu ngobrol singkat sama tim." },
  { judul: "Bayar Biaya Pendaftaran", desc: "Kunci kursimu — kuota tiap batch dibatasi." },
  { judul: "Kelas Dimulai", desc: "Akses lab, grup batch, dan jadwal live terkirim sebelum hari pertama." },
];

// --- Landing: hero meta + stat strip ---
export const stats = [
  { value: "100+", label: "Alumni bekerja di perusahaan terkemuka" },
  { value: "95%", label: "Mendapat kerja dalam 6 bulan" },
  { value: "10", label: "Perusahaan partnership lulusan" },
];

// --- Dashboard: chart + activity ---
export const enrollSeries = [
  { bulan: "Jun", pendaftar: 34, lulus: 12 },
  { bulan: "Jul", pendaftar: 41, lulus: 18 },
  { bulan: "Agu", pendaftar: 38, lulus: 21 },
  { bulan: "Sep", pendaftar: 56, lulus: 24 },
  { bulan: "Okt", pendaftar: 62, lulus: 29 },
  { bulan: "Nov", pendaftar: 71, lulus: 33 },
  { bulan: "Des", pendaftar: 66, lulus: 38 },
];

export const progressPerModul = [
  { modul: "Linux", nilai: 88 },
  { modul: "Docker", nilai: 76 },
  { modul: "CI/CD", nilai: 69 },
  { modul: "Kubernetes", nilai: 54 },
  { modul: "Observability", nilai: 41 },
  { modul: "Capstone", nilai: 22 },
];

export const activities = [
  { id: "a1", title: "Sinta Dewi menyelesaikan modul Docker", description: "Batch 5 · DevOps", timestamp: "2 jam lalu", tone: "success" as const },
  { id: "a2", title: "Review capstone Batch 4 dijadwalkan ulang", description: "Mentor: Rania O.", timestamp: "5 jam lalu", tone: "warning" as const },
  { id: "a3", title: "3 peserta baru menyelesaikan pembayaran", description: "Batch 7 · Frontend", timestamp: "Kemarin", tone: "success" as const },
  { id: "a4", title: "Sesi mock interview Batch 4 dimulai", description: "Ruang zoom utama", timestamp: "Kemarin", tone: "default" as const },
  { id: "a5", title: "Lab cluster Cibubur perawatan", description: "Downtime 2 jam", timestamp: "2 hari lalu", tone: "destructive" as const },
];
