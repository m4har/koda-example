import * as React from "react";
import { Link } from "react-router-dom";
import { Terminal, Users } from "lucide-react";
import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { RuleRail } from "@/components/landing/rule-rail";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { StatCounter } from "@/components/landing/stat-counter";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { Testimonial } from "@/components/landing/testimonial";
import { CtaBand } from "@/components/landing/cta-band";
import { Footer } from "@/components/landing/footer";
import { SectionFrame } from "@/components/ui/section-frame";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { SidebarShell } from "@/components/dashboard/sidebar-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartShell } from "@/components/dashboard/chart-shell";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DataTable } from "@/components/dashboard/data-table";
import { AuthCard } from "@/components/auth/auth-card";
import { Accordion } from "@/components/accordion";
import { Modal } from "@/components/modal";
import { students, activities, alumni, faq, stats, BATCHES, KELAS, statusVariant } from "@/lib/data";

function Frame({ id, name, children }: { id: string; name: string; children: React.ReactNode }) {
  return (
    <section id={id} data-capture={name} className="border-t border-border px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Label>{name}</Label>
        {children}
      </div>
    </section>
  );
}

function GalleryPage() {
  const [dark, setDark] = React.useState(true);
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const sampleColumns = [
    { header: "Nama", cell: (row: (typeof students)[number]) => row.nama },
    { header: "Batch", cell: (row: (typeof students)[number]) => row.batch },
    {
      header: "Status",
      cell: (row: (typeof students)[number]) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-background text-foreground">
        <AnnouncementBar>Component gallery — one section per capture</AnnouncementBar>

        <div className="relative pl-7">
          <RuleRail />
          <div className="sticky top-5 z-40 flex h-10 items-center justify-between border-b border-border bg-background/95 pl-4 sm:pl-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">Gallery</span>
            <div className="flex items-center gap-3 pr-4 sm:pr-8">
              <Button size="sm" variant="outline" onClick={() => setDark((v) => !v)}>
                {dark ? "Dark" : "Light"}
              </Button>
              <Button size="sm" asChild>
                <Link to="/">← Landing</Link>
              </Button>
            </div>
          </div>

          <Frame id="button" name="button">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button loading>Simpan</Button>
              <Button iconLeft={<Terminal aria-hidden />}>With icon</Button>
            </div>
          </Frame>

          <Frame id="badge" name="badge">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="muted">Muted</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Frame>

          <Frame id="card" name="card">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Batch 5 — DevOps</CardTitle>
                <CardDescription>Offline · Cibubur</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <Label>Mulai</Label>
                  <span>09 Nov 2026</span>
                </div>
                <div className="flex justify-between">
                  <Label>Sisa slot</Label>
                  <span>6</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Daftar batch ini</Button>
              </CardFooter>
            </Card>
          </Frame>

          <Frame id="input" name="input">
            <div className="grid max-w-xl gap-4">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
            </div>
          </Frame>

          <Frame id="textarea" name="textarea">
            <div className="grid max-w-xl gap-2">
              <Label>Catatan</Label>
              <Textarea placeholder="Tulis catatan…" />
            </div>
          </Frame>

          <Frame id="select" name="select">
            <div className="grid max-w-xl gap-2">
              <Label>Kategori</Label>
              <Select defaultValue={KELAS[0]}>
                {KELAS.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </Select>
            </div>
          </Frame>

          <Frame id="label" name="label">
            <div className="flex flex-col gap-2">
              <Label>01 / Micro label</Label>
              <Label className="text-primary">Accent label</Label>
            </div>
          </Frame>

          <Frame id="separator" name="separator">
            <div className="flex max-w-xl items-center gap-4">
              <span className="text-sm text-muted-foreground">Kiri</span>
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">Kanan</span>
            </div>
            <div className="flex max-w-xl items-start gap-4">
              <div className="h-24">
                <Separator orientation="vertical" />
              </div>
              <span className="text-sm text-muted-foreground">Orientasi vertikal</span>
            </div>
          </Frame>

          <Frame id="skeleton" name="skeleton">
            <div className="flex max-w-xl flex-col gap-3">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </Frame>

          <Frame id="spinner" name="spinner">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Spinner /> Memuat data…
            </div>
          </Frame>

          <Frame id="table" name="table">
            <div className="max-w-3xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Kode</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Mulai</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">DV-501</TableCell>
                    <TableCell className="font-medium">Docker &amp; Container Basic</TableCell>
                    <TableCell>09 Nov 2026</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="success">Terbuka</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">BE-411</TableCell>
                    <TableCell className="font-medium">REST API dengan Go</TableCell>
                    <TableCell>07 Sep 2026</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="destructive">Penuh</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Frame>

          <Frame id="section-frame" name="section-frame">
            <div className="border border-border">
              <SectionFrame eyebrow="01 / Contoh" heading="SectionFrame heading" description="Section chrome dengan eyebrow mono dan heading display.">
                <p className="text-sm text-muted-foreground">Konten section.</p>
              </SectionFrame>
            </div>
          </Frame>

          <Frame id="announcement-bar" name="announcement-bar">
            <div className="relative h-16 w-full overflow-hidden border border-border">
              <AnnouncementBar>Pendaftaran Batch 5 ditutup 26 Oktober 2026 — sisa 6 slot</AnnouncementBar>
            </div>
          </Frame>

          <Frame id="rule-rail" name="rule-rail">
            <div className="relative h-48 w-16 overflow-hidden border border-border bg-background">
              <RuleRail />
            </div>
          </Frame>

          <Frame id="navbar" name="navbar">
            <div className="overflow-hidden border border-border">
              <Navbar
                brand="Koda"
                items={[
                  { label: "Program", href: "#" },
                  { label: "Jadwal", href: "#" },
                  { label: "FAQ", href: "#" },
                ]}
                cta={{ label: "Daftar Sekarang", href: "#" }}
              />
            </div>
          </Frame>

          <Frame id="hero" name="hero">
            <div className="border border-border">
              <Hero
                eyebrow="Batch 5 — DevOps"
                heading="Ship production infra in 16 weeks"
                description="Live classes at night, real lab, weekly code review."
                actions={<Button>Daftar Sekarang</Button>}
              />
            </div>
          </Frame>

          <Frame id="stat-counter" name="stat-counter">
            <StatCounter stats={stats} />
          </Frame>

          <Frame id="feature-grid" name="feature-grid">
            <FeatureGrid
              features={[
                { title: "Kelas Live Malam", description: "Sesi langsung bersama mentor praktisi.", icon: <Terminal /> },
                { title: "Komunitas Alumni", description: "Referral kerja dari teman satu batch.", icon: <Users /> },
                { title: "Lab 24/7", description: "Cluster nyata untuk latihan mandiri." },
              ]}
            />
          </Frame>

          <Frame id="testimonial" name="testimonial">
            <Testimonial items={alumni.slice(0, 3)} />
          </Frame>

          <Frame id="accordion" name="accordion">
            <Accordion className="max-w-2xl" items={faq.slice(0, 3).map((item) => ({ title: item.q, content: <p className="leading-relaxed">{item.a}</p> }))} />
          </Frame>

          <Frame id="cta-band" name="cta-band">
            <div className="border border-border">
              <CtaBand eyebrow="Siap bergabung?" heading="Kursi Batch 5 tinggal 6" description="Amankan sebelum batas pendaftaran." actions={<Button>Daftar Sekarang</Button>} />
            </div>
          </Frame>

          <Frame id="footer" name="footer">
            <div className="border border-border">
              <Footer
                brand="Koda Example"
                tagline="Bootcamp intensif DevOps & software engineering."
                columns={[
                  { title: "Program", links: [{ label: "Bootcamp DevOps", href: "#" }, { label: "Jadwal", href: "#" }] },
                  { title: "Akun", links: [{ label: "Masuk", href: "/login" }, { label: "Daftar", href: "/register" }] },
                ]}
                newsletter={{ heading: "Info batch & deadline", placeholder: "email kamu", buttonLabel: "Langganan" }}
              />
            </div>
          </Frame>

          <Frame id="sidebar-shell" name="sidebar-shell">
            <div className="h-80 overflow-hidden border border-border">
              <SidebarShell
                sidebar={
                  <nav className="flex flex-col gap-1">
                    <Label>Menu</Label>
                    <span className="px-3 py-2 text-sm text-foreground">Overview</span>
                    <span className="px-3 py-2 text-sm text-muted-foreground">Students</span>
                  </nav>
                }
                header={<span className="font-mono text-xs uppercase tracking-[0.1em]">Shell header</span>}
              >
                <div className="p-6 text-sm text-muted-foreground">Konten utama shell.</div>
              </SidebarShell>
            </div>
          </Frame>

          <Frame id="stat-card" name="stat-card">
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Pendaftar" value="62" delta="+12% vs bulan lalu" trend="positive" />
              <StatCard label="Lulus" value="38" delta="+5% vs bulan lalu" trend="positive" />
              <StatCard label="Churn" value="2" delta="-1% vs bulan lalu" trend="negative" />
            </div>
          </Frame>

          <Frame id="chart-shell" name="chart-shell">
            <ChartShell title="Pendaftar vs Lulus" description="7 bulan terakhir">
              <div className="flex h-40 items-end gap-2">
                {[34, 41, 38, 56, 62, 71, 66].map((v, i) => (
                  <div key={i} className="flex-1 bg-primary/80" style={{ height: `${v}%` }} />
                ))}
              </div>
            </ChartShell>
          </Frame>

          <Frame id="activity-feed" name="activity-feed">
            <div className="max-w-xl">
              <ActivityFeed items={activities} />
            </div>
          </Frame>

          <Frame id="data-table" name="data-table">
            <DataTable
              columns={sampleColumns}
              rows={students.slice(0, 5)}
              getRowId={(row) => row.id}
            />
          </Frame>

          <Frame id="auth-card" name="auth-card">
            <div className="flex justify-center">
              <AuthCard
                brand="Koda Example"
                title="Masuk ke akunmu"
                description="Gunakan email yang terdaftar."
                footer={<span className="text-sm text-muted-foreground">Belum punya akun? <Link className="text-primary" to="/register">Daftar</Link></span>}
              >
                <Label>Email</Label>
                <Input id="g-a-email" type="email" placeholder="you@example.com" />
                <Label>Password</Label>
                <Input id="g-a-pass" type="password" placeholder="••••••••" />
                <Button className="w-full">Masuk</Button>
              </AuthCard>
            </div>
          </Frame>

          <Frame id="modal" name="modal">
            <div className="relative">
              <Modal
                open
                onClose={() => undefined}
                title="Hapus data siswa?"
                description="Tindakan ini tidak bisa dibatalkan."
                footer={
                  <>
                    <Button variant="outline">Batal</Button>
                    <Button variant="destructive">Hapus</Button>
                  </>
                }
              >
                <p className="text-sm text-muted-foreground">Siswa STD-1041 akan dihapus dari daftar batch.</p>
              </Modal>
            </div>
          </Frame>

          <Frame id="batches" name="batches">
            <div className="flex flex-wrap gap-2">
              {BATCHES.map((b) => (
                <Badge key={b} variant="outline">
                  {b}
                </Badge>
              ))}
            </div>
          </Frame>

          <Footer
            brand="Koda Example"
            tagline="Gallery — semua komponet koda-ui."
            columns={[{ title: "Halaman", links: [{ label: "Landing", href: "/" }, { label: "Register", href: "/register" }, { label: "Login", href: "/login" }] }]}
            newsletter={false}
            socials={[]}
          />
        </div>
      </div>
    </div>
  );
}

export { GalleryPage };
