import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const studentsApi = {
  getAll: () => api.get("/students"),
  getOne: (id) => api.get(`/students/${id}`),
  create: (student) => api.post("/students", student),
  update: (id, student) => api.put(`/students/${id}`, student),
  remove: (id) => api.delete(`/students/${id}`),
};
