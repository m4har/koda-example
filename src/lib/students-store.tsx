import * as React from "react";
import { students as seed, type Student } from "@/lib/data";

interface StudentsContextValue {
  students: Student[];
  create: (input: Omit<Student, "id">) => void;
  update: (id: string, patch: Partial<Omit<Student, "id">>) => void;
  remove: (id: string) => void;
}

const StudentsContext = React.createContext<StudentsContextValue | null>(null);

// ponytail: in-memory store only; swap for an API client when a backend exists.
function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = React.useState<Student[]>(seed);

  const create = React.useCallback((input: Omit<Student, "id">) => {
    setStudents((prev) => {
      const nextId = `STD-${1041 + prev.length}`;
      return [{ ...input, id: nextId }, ...prev];
    });
  }, []);

  const update = React.useCallback((id: string, patch: Partial<Omit<Student, "id">>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const remove = React.useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = React.useMemo(() => ({ students, create, update, remove }), [students, create, update, remove]);
  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

function useStudents(): StudentsContextValue {
  const ctx = React.useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used inside <StudentsProvider>");
  return ctx;
}

export { StudentsProvider, useStudents };
