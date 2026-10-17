import * as React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { StatCounter } from "@/components/landing/stat-counter";
import { Testimonial } from "@/components/landing/testimonial";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { SectionFrame } from "@/components/ui/section-frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Accordion } from "@/components/accordion";
import {
  batchCards,
  jadwal,
  jadwalCategories,
  modul,
  alumni,
  faq,
  stats,
  type JadwalKategori,
} from "@/lib/data";

const WA_LINK =
  "https://api.whatsapp.com/send/?phone=6281234567890&text=Halo%20tim%20Koda%20Example%2C%20saya%20ingin%20tanya%20program%20bootcamp";

const navItems = [
  { label: "Program", href: "#program" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Alumni", href: "#alumni" },
  { label: "FAQ", href: "#faq" },
];

function statusBadge(status: string) {
  const variant = status === "Terbuka" ? "success" : status === "Penuh" ? "destructive" : "muted";
  return (
    <Badge variant={variant} className="justify-center">
      {status}
    </Badge>
  );
}

function LandingPage() {
  const [kategori, setKategori] = React.useState<JadwalKategori>("DevOps");
  const rows = jadwal.filter((row) => row.kategori === kategori);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        brand="Koda Example"
        items={navItems}
        cta={{ label: "Daftar Sekarang", href: "/register" }}
      />

      <main className="flex-1">
        <Hero
          eyebrow="Bootcamp DevOps & Software"
          heading="Jadi Insinyur DevOps Profesional dalam 16 Minggu"
          description="Kelas live malam, praktik di lab nyata, review kode tiap minggu, sampai kamu diterima kerja. Tanpa risiko finansial — bayar setelah bekerja."
          actions={
            <>
              <Button asChild>
                <Link to="/register">
                  Daftar Sekarang <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={WA_LINK} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden /> Chat Tim Koda
                </a>
              </Button>
            </>
          }
          meta={
            <>
              <Badge variant="muted">Batch berikutnya · 09 Nov 2026</Badge>
              <Badge variant="muted">Kuota 24 peserta</Badge>
              <Badge variant="muted">Online & Offline</Badge>
            </>
          }
        />

        <section className="px-4 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <StatCounter stats={stats} />
          </div>
        </section>

        <SectionFrame
          id="program"
          eyebrow="01 / Program"
          heading="Batch Mendatang"
          description="Pilih jadwal yang paling pas. Semua batch dapat akses lab, mentoring, dan pendampingan karier."
        >
          <div className="grid gap-px border border-border bg-border md:grid-cols-3">
            {batchCards.map((batch) => (
              <Card key={batch.nama} className="rounded-none border-0">
                <CardHeader className="flex-row items-start justify-between space-y-0">
                  <div className="flex flex-col gap-1.5">
                    <CardTitle className="text-base">{batch.nama}</CardTitle>
                    <CardDescription>{batch.mode}</CardDescription>
                  </div>
                  <Badge variant={batch.slotTone}>{batch.slot}</Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <Label>Mulai</Label>
                    <span>{batch.mulai}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label>Selesai</Label>
                    <span>{batch.selesai}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label>Batas daftar</Label>
                    <span>{batch.batasDaftar}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/register">Daftar batch ini</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          id="jadwal"
          eyebrow="02 / Jadwal"
          heading="Jadwal Training Terdekat"
          description="Kelas pendek terbuka umum — ikut tanpa harus ikut bootcamp penuh."
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategori kelas">
              {jadwalCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={kategori === cat}
                  onClick={() => setKategori(cat)}
                  className={
                    "border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
                    (kategori === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Kode</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Mulai</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.kode}>
                      <TableCell className="font-mono text-xs">{row.kode}</TableCell>
                      <TableCell className="font-medium">{row.kelas}</TableCell>
                      <TableCell>{row.mulai}</TableCell>
                      <TableCell>{row.durasi}</TableCell>
                      <TableCell>{row.mode}</TableCell>
                      <TableCell>{row.lokasi}</TableCell>
                      <TableCell className="text-center">{statusBadge(row.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          id="kurikulum"
          eyebrow="03 / Kurikulum"
          heading="Enam Modul, Satu Jalur Karier"
          description="Setiap modul ditutup dengan proyek yang bisa kamu taruh di portofolio."
        >
          <Accordion
            items={modul.map((m) => ({
              title: m.judul,
              meta: `Lihat ${m.materi.length} materi`,
              content: (
                <ul className="flex flex-col gap-2">
                  {m.materi.map((mat) => (
                    <li key={mat} className="flex items-center gap-3">
                      <span aria-hidden className="size-1.5 bg-primary" />
                      {mat}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        </SectionFrame>

        <SectionFrame
          id="alumni"
          eyebrow="04 / Alumni"
          heading="Cerita Mereka Setelah Lulus"
          description="Bukan janji kosong — ini pengalaman alumni yang sudah melewati prosesnya."
        >
          <Testimonial items={alumni} />
        </SectionFrame>

        <SectionFrame
          id="faq"
          eyebrow="05 / FAQ"
          heading="Pertanyaan yang Sering Diajukan"
          description="Belum ketemu jawabannya? Chat tim kami lewat WhatsApp."
        >
          <Accordion
            items={faq.map((item) => ({
              title: item.q,
              content: <p className="leading-relaxed">{item.a}</p>,
            }))}
          />
        </SectionFrame>

        <CtaBand
          eyebrow="Siap bergabung?"
          heading="Mulai Karier DevOps-mu Mulai Batch Ini"
          description="Kuota tiap batch dibatasi 24 peserta supaya review mentor tetap personal. Amankan kursimu sebelum batas pendaftaran."
          actions={
            <>
              <Button asChild>
                <Link to="/register">
                  Daftar Sekarang <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <a href={WA_LINK} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden /> Tanya dulu
                </a>
              </Button>
            </>
          }
        />
      </main>

      <Footer
        brand="Koda Example"
        tagline="Bootcamp intensif DevOps & software engineering. Belajar dari nol sampai siap kerja, dibimbing mentor praktisi."
        columns={[
          {
            title: "Program",
            links: [
              { label: "Bootcamp DevOps", href: "#program" },
              { label: "Jadwal training", href: "#jadwal" },
              { label: "Kurikulum", href: "#kurikulum" },
            ],
          },
          {
            title: "Akun",
            links: [
              { label: "Masuk", href: "/login" },
              { label: "Daftar", href: "/register" },
              { label: "Dashboard demo", href: "/dashboard" },
            ],
          },
          {
            title: "Kontak",
            links: [
              { label: "WhatsApp", href: WA_LINK },
              { label: "halo@koda-example.id", href: "mailto:halo@koda-example.id" },
            ],
          },
        ]}
      />
      <Separator />
    </div>
  );
}

export { LandingPage };
