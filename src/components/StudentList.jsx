import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/useStudents";

function StudentList({ students }) {
  const { deleteStudent } = useStudents();
  const navigate = useNavigate();

  if (students.length === 0) {
    return <p className="empty-message">No students registered yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td data-label="Name">{student.name}</td>
              <td data-label="Email">{student.email}</td>
              <td data-label="Major">{student.major}</td>
              <td data-label="GPA">{student.gpa}</td>
              <td data-label="Actions">
                <button onClick={() => navigate(`/students/${student.id}`)}>
                  View
                </button>
                <button onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
