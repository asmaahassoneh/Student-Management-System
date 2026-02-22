import { useEffect, useMemo, useState, useCallback } from "react";
import { StudentContext } from "./StudentContext";
import { studentsApi } from "../services/studentsApi";

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await studentsApi.getAll();
        setStudents(res.data);
      } catch (e) {
        setError("Failed to load students" + e);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = useCallback(async (student) => {
    try {
      setError(null);
      const res = await studentsApi.create({ ...student });
      setStudents((prev) => [...prev, res.data]);
    } catch (e) {
      setError("Failed to add student");
      throw e;
    }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    try {
      setError(null);
      await studentsApi.remove(id);
      setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
    } catch (e) {
      setError("Failed to delete student");
      throw e;
    }
  }, []);

  const updateStudent = useCallback(async (id, updatedStudent) => {
    try {
      setError(null);
      const res = await studentsApi.update(id, updatedStudent);
      setStudents((prev) =>
        prev.map((s) => (String(s.id) === String(id) ? res.data : s)),
      );
    } catch (e) {
      setError("Failed to update student");
      throw e;
    }
  }, []);

  const value = useMemo(
    () => ({
      students,
      loading,
      error,
      addStudent,
      deleteStudent,
      updateStudent,
    }),
    [students, loading, error, addStudent, deleteStudent, updateStudent],
  );

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}
