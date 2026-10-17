import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { JadwalBatch } from "@/lib/data";

interface JadwalTab {
  id: string;
  label: string;
  batches: JadwalBatch[];
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <Label>{label}</Label>
      <span className="text-right">{value}</span>
    </div>
  );
}

/** Jadwal: tab kategori + kartu batch. Label "Batch mendatang" ambil jumlah dari tab aktif. */
function JadwalTabs({ tabs, className }: { tabs: JadwalTab[]; className?: string }) {
  const [active, setActive] = React.useState(tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Kategori jadwal" className="flex flex-wrap gap-px border border-border bg-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={cn(
                "px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                t.id === active ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted/50",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Label>{`Batch mendatang: ${tab.batches.length} batch`}</Label>
      </div>

      <div className="grid gap-px border border-border bg-border md:grid-cols-2">
        {tab.batches.map((batch) => (
          <Card key={batch.nama} className="rounded-none border-0">
            <CardHeader>
              <CardTitle className="text-[28px] font-medium leading-tight">{batch.nama}</CardTitle>
              <CardDescription>{batch.deskripsi}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <Row label="Tanggal berlangsung" value={batch.tanggal} />
              <Row label="Lokasi" value={batch.lokasi} />
              <Row label="Jadwal pelatihan" value={batch.jadwal} />
              <Row label="Batas pendaftaran" value={batch.batasDaftar} />
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/register">Daftar batch ini</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export { JadwalTabs };
