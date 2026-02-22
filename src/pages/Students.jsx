import { useState } from "react";
import { ToastContainer } from "react-toastify";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import "react-toastify/dist/ReactToastify.css";
import { useStudents } from "../context/useStudents";

function Students() {
  const { students, loading, error } = useStudents();

  const [search, setSearch] = useState("");
  const [filterMajor, setFilterMajor] = useState("");

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
      <div className="container">
        <h1>Student Dashboard</h1>
        <p style={{ color: "red" }}>❌ {error}</p>
      </div>
    );
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMajor = filterMajor
      ? student.major.toLowerCase().includes(filterMajor.toLowerCase())
      : true;

    return matchesSearch && matchesMajor;
  });

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

      <StudentList students={filteredStudents} />

      <ToastContainer />
    </div>
  );
}

export default Students;
