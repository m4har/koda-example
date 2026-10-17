import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { SidebarShell } from "@/components/dashboard/sidebar-shell";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/students", label: "Peserta", icon: Users, end: false },
];

function DashboardLayout() {
  const { pathname } = useLocation();
  const title = pathname.startsWith("/dashboard/students") ? "Manajemen Peserta" : "Overview";

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" className="font-mono text-xs font-semibold uppercase tracking-[0.1em]">
        Koda Example
      </Link>
      <nav className="flex flex-col gap-1" aria-label="Dashboard">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 border px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon aria-hidden className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
        <div className="flex flex-col gap-1">
          <Label>Admin Demo</Label>
          <span className="truncate text-xs text-muted-foreground">admin@koda-example.id</span>
        </div>
        <Link
          to="/login"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut aria-hidden className="size-3.5" /> Keluar
        </Link>
      </div>
    </div>
  );

  const header = (
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
      <span className="text-sm font-semibold">{title}</span>
      <Badge variant="muted">Mode Demo</Badge>
    </div>
  );

  return (
    <SidebarShell sidebar={sidebar} header={header}>
      <div className="mx-auto max-w-6xl">
        <Outlet />
      </div>
    </SidebarShell>
  );
}

export { DashboardLayout };
