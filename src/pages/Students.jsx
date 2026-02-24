import { useMemo, useState, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import "react-toastify/dist/ReactToastify.css";
import { useStudents } from "../context/useStudents";
import { useNavigate } from "react-router-dom";

function Students() {
  const { students, loading, error, deleteStudent, refetchStudents } =
    useStudents();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterMajor, setFilterMajor] = useState("");

  const handleView = useCallback(
    (id) => navigate(`/students/${id}`),
    [navigate],
  );

  const handleDelete = useCallback((id) => deleteStudent(id), [deleteStudent]);

  const filteredStudents = useMemo(() => {
    const s = search.trim().toLowerCase();
    const m = filterMajor.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch = s
        ? (student.name ?? "").toLowerCase().includes(s)
        : true;

      const matchesMajor = m
        ? (student.major ?? "").toLowerCase().includes(m)
        : true;

      return matchesSearch && matchesMajor;
    });
  }, [students, search, filterMajor]);

  if (loading) {
    return (
      <div className="container">
        <h1>Student Dashboard</h1>
        <p>Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1>Student Dashboard</h1>
        <p style={{ color: "red" }}>❌ {String(error)}</p>

        <div style={{ marginTop: 12 }}>
          <button onClick={refetchStudents}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Student Dashboard</h1>

      <StudentForm />

      <div className="filters">
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Filter by major..."
          value={filterMajor}
          onChange={(e) => setFilterMajor(e.target.value)}
        />
      </div>

      <StudentList
        students={filteredStudents}
        onView={handleView}
        onDelete={handleDelete}
      />

      <ToastContainer />
    </div>
  );
}

export default Students;
