export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeStudent(values) {
  return {
    ...values,
    name: values.name?.trim(),
    email: values.email?.trim(),
    major: values.major?.trim(),
    gpa: values.gpa === "" ? "" : Number(values.gpa),
  };
}

export function validateStudent(values) {
  const v = normalizeStudent(values);

  if (!v.name || !v.email || !v.major) {
    return { ok: false, message: "Name, Email, and Major are required" };
  }

  if (!emailRegex.test(v.email)) {
    return { ok: false, message: "Please enter a valid email address" };
  }

  const gpaValue = Number(v.gpa);
  if (Number.isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
    return { ok: false, message: "GPA must be between 0 and 4" };
  }

  return { ok: true, data: { ...v, gpa: gpaValue } };
}
