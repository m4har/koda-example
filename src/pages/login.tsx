import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Format email tidak valid.");
      return;
    }
    if (values.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    setError(null);
    setLoading(true);
    // Mock login — accepts any valid-looking credentials in this demo app.
    window.setTimeout(() => navigate("/dashboard"), 600);
  };

  return (
    <AuthCard
      brand="Koda Example"
      title="Masuk"
      description="Akses dashboard peserta dan admin."
      footer={
        <>
          Belum punya akun?{" "}
          <Link to="/register" className="text-foreground underline underline-offset-4">
            Daftar
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2" htmlFor="email">
            <Label>Email</Label>
            <Input id="email" type="email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} placeholder="nama@email.com" aria-invalid={Boolean(error)} />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-2" htmlFor="password">
            <Label>Password</Label>
            <Input id="password" type="password" value={values.password} onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))} placeholder="Minimal 8 karakter" />
          </label>
        </div>
        {error ? <span className="text-xs text-destructive">{error}</span> : null}
        <Button type="submit" loading={loading} className="w-full">
          {loading ? "Memeriksa…" : "Masuk"}
        </Button>
      </form>
    </AuthCard>
  );
}

export { LoginPage };
