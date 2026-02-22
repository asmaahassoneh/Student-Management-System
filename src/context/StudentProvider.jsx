import { useEffect, useState } from "react";
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

  const addStudent = async (student) => {
    try {
      setError(null);
      const newStudent = {
        ...student,
      };

      const res = await studentsApi.create(newStudent);
      setStudents((prev) => [...prev, res.data]);
    } catch (e) {
      setError("Failed to add student");
      throw e;
    }
  };

  const deleteStudent = async (id) => {
    try {
      setError(null);
      await studentsApi.remove(id);
      setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
    } catch (e) {
      setError("Failed to delete student");
      throw e;
    }
  };

  const updateStudent = async (id, updatedStudent) => {
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
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        addStudent,
        deleteStudent,
        updateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
