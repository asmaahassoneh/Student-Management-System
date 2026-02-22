import useFetch from "../hooks/useFetch";
import { useCallback, useState } from "react";

function RandomUser() {
  const { data, loading, error } = useFetch("http://localhost:3001/students");
  const [randomStudent, setRandomStudent] = useState(null);

  const pickRandom = useCallback(() => {
    if (!data || data.length === 0) return;

    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomStudent(data[randomIndex]);
  }, [data]);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Random Student</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {!loading && !error && (!data || data.length === 0) && (
        <p>No students found.</p>
      )}

      {randomStudent && (
        <div className="card">
          <h2>{randomStudent.name}</h2>
          <p>Email: {randomStudent.email}</p>
          <p>Major: {randomStudent.major}</p>
          <p>GPA: {randomStudent.gpa}</p>
        </div>
      )}

      <button
        onClick={pickRandom}
        style={{ marginTop: "20px" }}
        disabled={loading || !data?.length}
      >
        {randomStudent ? "Get Another Random Student" : "Pick a Random Student"}
      </button>
    </div>
  );
}

export default RandomUser;
