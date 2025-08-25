import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import JobsList from "./components/JobsList";
import JobForm from "./components/JobForm";
import JobDetails from "./components/jobDetails"; // ✅ fixed casing
import Auth from "./components/LoginForm";
import Header from "./components/Header";
import ProtectedRoute from "./components/protectedRoute"; // ✅ fixed casing

import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/new"
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/edit/:id"
            element={
              <ProtectedRoute>
                <JobForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
