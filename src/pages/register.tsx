import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FormErrors {
  nama?: string;
  email?: string;
  password?: string;
  konfirmasi?: string;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({ nama: "", email: "", password: "", konfirmasi: "" });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (values.nama.trim().length < 2) next.nama = "Isi nama lengkap minimal 2 karakter.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Format email tidak valid.";
    if (values.password.length < 8) next.password = "Password minimal 8 karakter.";
    if (values.konfirmasi !== values.password) next.konfirmasi = "Konfirmasi password tidak cocok.";
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setLoading(true);
    // Mock submit — no backend in this demo app.
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 800);
  };

  if (done) {
    return (
      <AuthCard brand="Koda Example" title="Pendaftaran diterima" description="Kami kirim email berisi langkah tes & wawancara.">
        <div className="flex flex-col gap-4">
          <Badge variant="success">Terdaftar · {values.email}</Badge>
          <Button asChild>
            <Link to="/login">Lanjut ke halaman masuk</Link>
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      brand="Koda Example"
      title="Daftar Bootcamp"
      description="Isi data diri untuk mengikuti seleksi batch berikutnya."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-4">
            Masuk
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2" htmlFor="nama">
            <Label>Nama Lengkap</Label>
            <Input id="nama" value={values.nama} onChange={set("nama")} placeholder="Nama sesuai identitas" aria-invalid={Boolean(errors.nama)} />
          </label>
          {errors.nama ? <span className="text-xs text-destructive">{errors.nama}</span> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2" htmlFor="email">
            <Label>Email</Label>
            <Input id="email" type="email" value={values.email} onChange={set("email")} placeholder="nama@email.com" aria-invalid={Boolean(errors.email)} />
          </label>
          {errors.email ? <span className="text-xs text-destructive">{errors.email}</span> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2" htmlFor="password">
            <Label>Password</Label>
            <Input id="password" type="password" value={values.password} onChange={set("password")} placeholder="Minimal 8 karakter" aria-invalid={Boolean(errors.password)} />
          </label>
          {errors.password ? <span className="text-xs text-destructive">{errors.password}</span> : null}
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2" htmlFor="konfirmasi">
            <Label>Konfirmasi Password</Label>
            <Input id="konfirmasi" type="password" value={values.konfirmasi} onChange={set("konfirmasi")} placeholder="Ulangi password" aria-invalid={Boolean(errors.konfirmasi)} />
          </label>
          {errors.konfirmasi ? <span className="text-xs text-destructive">{errors.konfirmasi}</span> : null}
        </div>
        <Button type="submit" loading={loading} className="w-full">
          {loading ? "Mengirim…" : "Daftar Sekarang"}
        </Button>
        <button type="button" onClick={() => navigate("/login")} className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Sudah punya akun? Masuk
        </button>
      </form>
    </AuthCard>
  );
}

export { RegisterPage };
