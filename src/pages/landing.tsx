import * as React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Terminal, GitPullRequest, Server, Layers, Briefcase, Users } from "lucide-react";
import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { RuleRail } from "@/components/landing/rule-rail";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { StatCounter } from "@/components/landing/stat-counter";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { SectionFrame } from "@/components/ui/section-frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion } from "@/components/accordion";
import { batchCards, langkah, faq, stats, fasilitas, fokusFeatures } from "@/lib/data";

const WA_LINK =
  "https://api.whatsapp.com/send/?phone=6281234567890&text=Halo%20tim%20Koda%20Example%2C%20saya%20ingin%20tanya%20program%20bootcamp";

const navItems = [
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Fokus", href: "#fokus" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Pendaftaran", href: "#pendaftaran" },
  { label: "FAQ", href: "#faq" },
];

const featureIcons: Record<string, React.ReactNode> = {
  terminal: <Terminal />,
  "git-pull": <GitPullRequest />,
  server: <Server />,
  layers: <Layers />,
  briefcase: <Briefcase />,
  users: <Users />,
};

function LandingPage() {
  // ponytail: rows ≈ documentHeight / 20, matched to this page after build; raise it if the page grows.
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar href="/register" className="pl-7">
        Pendaftaran Batch 5 ditutup 26 Oktober 2026 — sisa 6 slot
      </AnnouncementBar>

      <div className="relative flex flex-1 flex-col pl-7">
        <RuleRail rows={420} />

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
                <Badge variant="muted">Online &amp; Offline</Badge>
              </>
            }
          />

          <section className="px-4 py-12 sm:px-8">
            <div className="mx-auto max-w-6xl">
              <StatCounter stats={stats} />
            </div>
          </section>

          <SectionFrame
            id="fasilitas"
            eyebrow="01 / Fasilitas"
            heading="Kamu fokus belajar, sisanya kami siapkan."
            description="Biaya, tempat tinggal, perangkat, dan pendampingan karier — sudah disiapkan supaya kamu tidak berhenti di tengah jalan."
          >
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {fasilitas.map((item) => (
                <div key={item.judul} className="flex flex-col gap-3 bg-background p-6 sm:p-8">
                  <span className="font-display text-[28px] font-medium leading-tight tracking-tight text-primary">
                    {item.judul}
                  </span>
                  <p className="max-w-md text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame
            id="fokus"
            eyebrow="02 / Fokus"
            heading="Fokus Kami untuk Karirmu"
            description="Enam hal yang dilatih tiap batch — semuanya dipakai langsung saat wawancara dan kerja."
          >
            <FeatureGrid
              features={fokusFeatures.map((f) => ({ ...f, icon: featureIcons[f.icon] }))}
            />
          </SectionFrame>

          <SectionFrame
            id="jadwal"
            eyebrow="03 / Jadwal"
            heading="Jadwal Bootcamp Terdekat"
            description="Pilih batch yang paling pas. Semua batch dapat akses lab, mentoring, dan pendampingan karier."
          >
            <div className="grid gap-px border border-border bg-border md:grid-cols-3">
              {batchCards.map((batch) => (
                <Card key={batch.nama} className="rounded-none border-0">
                  <CardHeader className="flex-row items-start justify-between space-y-0">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-[32px] font-medium leading-[1.1]">{batch.nama}</CardTitle>
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
            id="pendaftaran"
            eyebrow="04 / Pendaftaran"
            heading="Proses Pendaftaran Simpel Dalam 4 Langkah"
            description="Tidak ada biaya tersembunyi dan tidak ada tes yang disembunyikan."
          >
            <FeatureGrid
              className="sm:grid-cols-2 lg:grid-cols-4"
              features={langkah.map((step, i) => ({
                index: String(i + 1).padStart(2, "0"),
                title: step.judul,
                description: step.desc,
              }))}
            />
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
            heading="Jadi Insinyur DevOps Profesional dalam 16 Minggu"
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
                { label: "Bootcamp DevOps", href: "#fasilitas" },
                { label: "Jadwal bootcamp", href: "#jadwal" },
                { label: "Proses daftar", href: "#pendaftaran" },
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
          newsletter={{ heading: "Info batch & deadline", placeholder: "email kamu", buttonLabel: "Langganan" }}
        />
      </div>
    </div>
  );
}

export { LandingPage };
