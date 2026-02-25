import { useMemo, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";

const LS_CURRENT_USER = "student_portal_user_v2";
const LS_USERS = "student_portal_users_v2";

function readUsers() {
  const raw = localStorage.getItem(LS_USERS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(LS_CURRENT_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem(LS_CURRENT_USER);
      return null;
    }
  });

  const register = useCallback(async ({ username, email, password }) => {
    const u = username?.trim();
    const e = email?.trim().toLowerCase();
    const p = password?.trim();

    if (!u || !e || !p) throw new Error("All fields are required");

    const users = readUsers();
    const exists = users.some((x) => (x.email ?? "").toLowerCase() === e);
    if (exists) throw new Error("Email already exists");

    const newUser = {
      id: crypto.randomUUID(),
      username: u,
      email: e,
      password: p,
      role: e.includes("admin") ? "admin" : "user",
    };

    const updated = [...users, newUser];
    saveUsers(updated);

    return true;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const e = email?.trim().toLowerCase();
    const p = password?.trim();

    if (!e || !p) throw new Error("Email and password are required");

    const users = readUsers();
    const found = users.find((x) => (x.email ?? "").toLowerCase() === e);

    if (!found) throw new Error("Account not found. Please register first.");
    if (found.password !== p) throw new Error("Invalid email or password");

    const safeUser = {
      id: found.id,
      username: found.username,
      email: found.email,
      role: found.role,
    };

    setUser(safeUser);
    localStorage.setItem(LS_CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(LS_CURRENT_USER);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      register,
      login,
      logout,
    }),
    [user, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
