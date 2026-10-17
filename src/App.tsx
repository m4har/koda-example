import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "@/pages/landing";
import { RegisterPage } from "@/pages/register";
import { LoginPage } from "@/pages/login";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { OverviewPage } from "@/pages/dashboard/overview";
import { StudentsPage } from "@/pages/dashboard/students";
import { StudentDetailPage } from "@/pages/dashboard/student-detail";
import { StudentsProvider } from "@/lib/students-store";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/dashboard",
    element: (
      <StudentsProvider>
        <DashboardLayout />
      </StudentsProvider>
    ),
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "students", element: <StudentsPage /> },
      { path: "students/:id", element: <StudentDetailPage /> },
    ],
  },
]);

export { router };
