import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./context/StudentProvider";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <StudentProvider>
        <App />
      </StudentProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
