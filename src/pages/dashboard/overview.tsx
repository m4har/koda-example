import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartShell } from "@/components/dashboard/chart-shell";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useStudents } from "@/lib/students-store";
import { enrollSeries, activities } from "@/lib/data";

function OverviewPage() {
  const { students } = useStudents();
  const aktif = students.filter((s) => s.status === "Aktif").length;
  const lulus = students.filter((s) => s.status === "Lulus").length;
  const avg =
    students.length === 0 ? 0 : Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Peserta" value={students.length} delta="+3 minggu ini" trend="positive" />
        <StatCard label="Sedang Aktif" value={aktif} delta="kelas berjalan" trend="neutral" />
        <StatCard label="Lulus" value={lulus} delta="+2 bulan ini" trend="positive" />
        <StatCard label="Rata-rata Progres" value={`${avg}%`} delta={avg >= 60 ? "on track" : "perlu atensi"} trend={avg >= 60 ? "positive" : "negative"} />
      </div>

      <ChartShell
        title="Pendaftar vs Lulusan"
        description="Data agregat 7 bulan terakhir"
        actions={<span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">2026</span>}
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enrollSeries} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="fillPendaftar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fe5f21" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#fe5f21" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillLulus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#35d49c" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#35d49c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={{ stroke: "var(--border)" }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 0,
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Area type="monotone" dataKey="pendaftar" stroke="#fe5f21" strokeWidth={2} fill="url(#fillPendaftar)" />
              <Area type="monotone" dataKey="lulus" stroke="#35d49c" strokeWidth={2} fill="url(#fillLulus)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartShell>

      <ChartShell title="Aktivitas Terkini" description="Perkembangan kelas dan peserta">
        <ActivityFeed items={activities} />
      </ChartShell>
    </div>
  );
}

export { OverviewPage };
