import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/admin" });

API.interceptors.request.use((req) => {
  const locallyStored = localStorage.getItem("profile");

  if (locallyStored && locallyStored.type === "Admin" && locallyStored.token) {
    req.headers.Authorization = `Bearer ${locallyStored.token}`;
  }
  return req;
});

export const adminLogin = (form) => API.post("/login", form);
export const adminRegister = (form) => API.post("/register", form);
