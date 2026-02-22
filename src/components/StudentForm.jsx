import { toast } from "react-toastify";
import { useStudents } from "../context/useStudents";
import useForm from "../hooks/useForm";
import { validateStudent } from "../utils/studentUtils";

function StudentForm() {
  const { addStudent } = useStudents();

  const { values, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    major: "",
    gpa: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validateStudent(values);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    try {
      await addStudent(result.data);
      toast.success("Student Registered Successfully!");
      resetForm();
    } catch (e) {
      toast.error("Failed to add student" + e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <input
        name="name"
        placeholder="Full Name"
        value={values.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email Address"
        value={values.email}
        onChange={handleChange}
        required

      />
      <input
        name="major"
        placeholder="Major"
        value={values.major}
        onChange={handleChange}
        required
      />
      <input
        name="gpa"
        type="number"
        step="0.1"
        placeholder="GPA (0 - 4)"
        value={values.gpa}
        onChange={handleChange}
        required
      />
      <button type="submit">Register Student</button>
    </form>
  );
}

export default StudentForm;
