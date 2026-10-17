import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartShell } from "@/components/dashboard/chart-shell";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useStudents } from "@/lib/students-store";
import { progressPerModul, statusVariant } from "@/lib/data";

function StudentDetailPage() {
  const { id } = useParams();
  const { students } = useStudents();
  const student = students.find((s) => s.id === id);

  const activities = React.useMemo(
    () => [
      { id: "d1", title: `Progres diperbarui ke ${student?.progress ?? 0}%`, description: "Otomatis dari sistem belajar", timestamp: "Hari ini", tone: "success" as const },
      { id: "d2", title: "Menyelesaikan kuis modul CI/CD", description: "Nilai 84", timestamp: "2 hari lalu", tone: "success" as const },
      { id: "d3", title: "Sesi mentoring mingguan", description: "Mentor: Fajar M.", timestamp: "5 hari lalu", tone: "default" as const },
      { id: "d4", title: "Tugas container belum disubmit", description: "Deadline lewat 1 hari", timestamp: "1 minggu lalu", tone: "warning" as const },
    ],
    [student?.progress]
  );

  if (!student) {
    return (
      <div className="flex flex-col items-start gap-4 border border-dashed border-border p-8">
        <Label>Peserta tidak ditemukan</Label>
        <Button asChild variant="outline">
          <Link to="/dashboard/students">
            <ArrowLeft aria-hidden /> Kembali ke daftar
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link to="/dashboard/students">
          <ArrowLeft aria-hidden /> Kembali ke daftar peserta
        </Link>
      </Button>

      <Card className="rounded-none">
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <span
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center border border-border bg-muted font-mono text-sm font-medium uppercase tracking-[0.1em]"
          >
            {student.nama
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-semibold tracking-tight">{student.nama}</h1>
              <Badge variant={statusVariant[student.status]}>{student.status}</Badge>
            </div>
            <span className="truncate text-sm text-muted-foreground">{student.email}</span>
            <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">ID · {student.id}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Kelas · {student.kelas}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Bergabung · {student.joinedAt}</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <Label>Progres Kuliah</Label>
            <span className="font-display text-3xl font-semibold tracking-tight text-primary">{student.progress}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-none sm:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Info Batch</CardTitle>
            <CardDescription>{student.batch}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <Label>Mode</Label>
              <span>{student.kelas === "DevOps" ? "Offline" : "Online"}</span>
            </div>
            <div className="flex justify-between">
              <Label>Mentor</Label>
              <span>Rania O.</span>
            </div>
            <div className="flex justify-between">
              <Label>Jadwal</Label>
              <span>Senin &amp; Rabu · 19.00</span>
            </div>
          </CardContent>
        </Card>

        <ChartShell title="Progres per Modul" description="Persentase materi selesai" className="sm:col-span-2">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressPerModul} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="modul" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: "var(--muted)" }}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="nilai" fill="#fe5f21" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartShell>
      </div>

      <ChartShell title="Riwayat Aktivitas" description="Jejak belajar peserta ini">
        <ActivityFeed items={activities} />
      </ChartShell>
    </div>
  );
}

export { StudentDetailPage };
