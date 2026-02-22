import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import About from "./pages/About";
import RandomUser from "./pages/RandomUser";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/random-user" element={<RandomUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
