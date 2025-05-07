
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import Courses from "@/pages/Courses";
import { initializeData } from "@/lib/data";

const App = () => {
  useEffect(() => {
    // Initialize demo data
    initializeData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/departments" element={<Dashboard />} />
        <Route path="/attendance" element={<Dashboard />} />
        <Route path="/grades" element={<Dashboard />} />
        <Route path="/announcements" element={<Dashboard />} />
        <Route path="/fees" element={<Dashboard />} />
        <Route path="/reports" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
