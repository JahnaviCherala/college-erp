import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/teacher" });

API.interceptors.request.use((req) => {
  const locallyStored = localStorage.getItem("profile");

  if (
    locallyStored &&
    locallyStored.type === "Teacher" &&
    locallyStored.token
  ) {
    req.headers.Authorization = `Bearer ${locallyStored.token}`;
  }
  return req;
});

export const teacherLogin = (form) => API.post("/login", form);
export const teacherRegister = (form) => API.post("/register", form);
