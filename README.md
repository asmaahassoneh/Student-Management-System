# 📚 Student Portal v2

A multi-page React application for managing students using a mock backend (JSON Server).  
This project demonstrates routing, context, custom hooks, CRUD operations, error handling, and performance optimization.
A mock authentication system was implemented using **LocalStorage** to simulate a real authentication flow without a backend server. 

The system supports:
- User registration
- Login & logout
- Role-based access control
- Route protection
- Persistent authentication state
---

## 🚀 Features

- Multi-page application using React Router
- Global state management with Context API
- Full CRUD operations (Create, Read, Update, Delete)
- JSON Server mock backend
- Loading and error handling
- Custom `useFetch` hook
- Error Boundary implementation
- Performance optimization using:
  - `React.memo`
  - `useCallback`
  - `useMemo`
- Profiling with React DevTools


---

If the email contains the word admin, the account is automatically assigned the role "admin".
admin@gmail.com → role: "admin"
asmaa@gmail.com  → role: "user"
