import * as React from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import { Plus, ArrowUpDown, Pencil, Trash2, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Modal } from "@/components/modal";
import { useStudents } from "@/lib/students-store";
import { BATCHES, KELAS, statusVariant, type Student, type StudentStatus } from "@/lib/data";

const STATUSES: StudentStatus[] = ["Aktif", "Melamar", "Lulus", "Cuti", "Mundur"];

interface DraftState {
  nama: string;
  email: string;
  batch: string;
  kelas: string;
  status: StudentStatus;
  progress: string;
}

const emptyDraft: DraftState = {
  nama: "",
  email: "",
  batch: BATCHES[0],
  kelas: KELAS[0],
  status: "Aktif",
  progress: "0",
};

function StudentsPage() {
  const { students, create, update, remove } = useStudents();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Student | null>(null);
  const [draft, setDraft] = React.useState<DraftState>(emptyDraft);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Student | null>(null);

  const openCreate = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setFormError(null);
    setFormOpen(true);
  };

  const openEdit = (student: Student) => {
    setEditing(student);
    setDraft({
      nama: student.nama,
      email: student.email,
      batch: student.batch,
      kelas: student.kelas,
      status: student.status,
      progress: String(student.progress),
    });
    setFormError(null);
    setFormOpen(true);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const progress = Number(draft.progress);
    if (draft.nama.trim().length < 2) return setFormError("Nama minimal 2 karakter.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) return setFormError("Format email tidak valid.");
    if (!Number.isFinite(progress) || progress < 0 || progress > 100) return setFormError("Progres harus antara 0 dan 100.");
    const payload = {
      nama: draft.nama.trim(),
      email: draft.email.trim(),
      batch: draft.batch,
      kelas: draft.kelas,
      status: draft.status,
      progress,
    };
    if (editing) update(editing.id, payload);
    else create({ ...payload, joinedAt: new Date().toISOString().slice(0, 10) });
    setFormOpen(false);
  };

  const columns = React.useMemo<ColumnDef<Student>[]>(
    () => [
      {
        header: "Peserta",
        cell: ({ row }) => (
          <Link to={`/dashboard/students/${row.original.id}`} className="flex flex-col">
            <span className="text-sm font-medium underline-offset-4 hover:underline">{row.original.nama}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{row.original.id}</span>
          </Link>
        ),
      },
      { header: "Email", cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
      { header: "Kelas", cell: ({ row }) => row.original.kelas },
      { header: "Batch", cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.batch}</span> },
      {
        header: "Status",
        cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>,
      },
      {
        header: "Progres",
        sortingFn: (a, b) => a.original.progress - b.original.progress,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 bg-muted">
              <div className="h-full bg-primary" style={{ width: `${row.original.progress}%` }} />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{row.original.progress}%</span>
          </div>
        ),
      },
      {
        header: "Bergabung",
        sortingFn: (a, b) => a.original.joinedAt.localeCompare(b.original.joinedAt),
        cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.joinedAt}</span>,
      },
      {
        header: "Aksi",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label={`Lihat ${row.original.nama}`}>
              <Link to={`/dashboard/students/${row.original.id}`}>
                <Eye aria-hidden />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label={`Edit ${row.original.nama}`} onClick={() => openEdit(row.original)}>
              <Pencil aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label={`Hapus ${row.original.nama}`} onClick={() => setDeleteTarget(row.original)}>
              <Trash2 aria-hidden />
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [update]
  );

  const table = useReactTable({
    data: students,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Cari nama, email, batch…"
            aria-label="Cari peserta"
            className="pl-9"
          />
        </div>
        <Button onClick={openCreate}>
          <Plus aria-hidden /> Tambah Peserta
        </Button>
      </div>

      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="text-base">Daftar Peserta</CardTitle>
          <CardDescription>{table.getFilteredRowModel().rows.length} dari {students.length} peserta</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full caption-bottom border-collapse text-sm">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-border">
                    {hg.headers.map((header) => (
                      <th key={header.id} className="h-10 px-4 text-left align-middle font-medium">
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <ArrowUpDown aria-hidden className="size-3" />
                            {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : ""}
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="h-24 text-center">
                      <Label>Tidak ada peserta yang cocok</Label>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b border-border transition-colors hover:bg-muted/40">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3 align-middle">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Label>
          Halaman {table.getState().pagination.pageIndex + 1} / {Math.max(table.getPageCount(), 1)}
        </Label>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft aria-hidden /> Sebelumnya
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Berikutnya <ChevronRight aria-hidden />
          </Button>
        </div>
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? `Edit ${editing.nama}` : "Tambah Peserta"}
        description={editing ? editing.id : "Peserta baru akan masuk ke daftar demo."}
        footer={
          <>
            <Button variant="ghost" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button onClick={submitForm}>{editing ? "Simpan Perubahan" : "Tambah"}</Button>
          </>
        }
      >
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2" htmlFor="draft-nama">
              <Label>Nama</Label>
              <Input id="draft-nama" value={draft.nama} onChange={(e) => setDraft((d) => ({ ...d, nama: e.target.value }))} />
            </label>
            <label className="flex flex-col gap-2" htmlFor="draft-email">
              <Label>Email</Label>
              <Input id="draft-email" type="email" value={draft.email} onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))} />
            </label>
            <label className="flex flex-col gap-2" htmlFor="draft-batch">
              <Label>Batch</Label>
              <Select id="draft-batch" value={draft.batch} onChange={(e) => setDraft((d) => ({ ...d, batch: e.target.value }))}>
                {BATCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Select>
            </label>
            <label className="flex flex-col gap-2" htmlFor="draft-kelas">
              <Label>Kelas</Label>
              <Select id="draft-kelas" value={draft.kelas} onChange={(e) => setDraft((d) => ({ ...d, kelas: e.target.value }))}>
                {KELAS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </Select>
            </label>
            <label className="flex flex-col gap-2" htmlFor="draft-status">
              <Label>Status</Label>
              <Select id="draft-status" value={draft.status} onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as StudentStatus }))}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </label>
            <label className="flex flex-col gap-2" htmlFor="draft-progress">
              <Label>Progres (%)</Label>
              <Input id="draft-progress" type="number" min={0} max={100} value={draft.progress} onChange={(e) => setDraft((d) => ({ ...d, progress: e.target.value }))} />
            </label>
          </div>
          {formError ? <span className="text-xs text-destructive">{formError}</span> : null}
          <button type="submit" className="hidden" aria-hidden />
        </form>
      </Modal>

      <Modal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Hapus peserta?"
        description={deleteTarget ? `${deleteTarget.nama} (${deleteTarget.id}) akan dihapus dari daftar demo.` : undefined}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteTarget) remove(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Hapus
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">Tindakan ini tidak bisa dibatalkan di sesi demo ini.</p>
      </Modal>
    </div>
  );
}

export { StudentsPage };
