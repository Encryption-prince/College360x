import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home.jsx";
import Start from "./pages/Start.jsx";
import Clubs from "./pages/Clubs.jsx";
import Events from "./pages/Events.jsx";
import FacultyLogin from "./pages/FacultyLogin.jsx";
import FacultySignup from "./pages/FacultySignup.jsx";
import Gallery from "./pages/Gallery.jsx";
import Leaderboard from "./pages/leaderboard.jsx";
import LostandFound from "./pages/LostandFound.jsx";
import MemePage from "./pages/MemePage.jsx";
import Ragging from "./pages/Ragging.jsx";
import { RaggingHistoryPage } from "./pages/Ragging.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import StudentSignup from "./pages/StudentSignup.jsx";
import StudyMaterial from "./pages/StudyMaterial.jsx";
import StudyPartner from "./pages/StudyPartner.jsx";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      {/* Landing page for not logged in users */}
      <Route path="/start" element={isLoggedIn ? <Navigate to="/" /> : <Start />} />
      {/* Auth pages */}
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/faculty-login" element={<FacultyLogin />} />
      <Route path="/faculty-signup" element={<FacultySignup />} />
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout><Home /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/clubs" element={
        <ProtectedRoute>
          <MainLayout><Clubs /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/clubs/join" element={
        <ProtectedRoute>
          <MainLayout><Clubs /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/clubs/events" element={
        <ProtectedRoute>
          <MainLayout><Clubs /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/events" element={
        <ProtectedRoute>
          <MainLayout><Events /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/events/registrations" element={
        <ProtectedRoute>
          <MainLayout><Events /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/gallery" element={
        <ProtectedRoute>
          <MainLayout><Gallery /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/leaderboard" element={
        <ProtectedRoute>
          <MainLayout><Leaderboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/lostandfound" element={
        <ProtectedRoute>
          <MainLayout><LostandFound /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/memepage" element={
        <ProtectedRoute>
          <MainLayout><MemePage /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/ragging" element={
        <ProtectedRoute>
          <MainLayout><Ragging /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/ragging/history" element={
        <ProtectedRoute>
          <MainLayout><RaggingHistoryPage /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/studymaterial" element={
        <ProtectedRoute>
          <MainLayout><StudyMaterial /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/studypartner" element={
        <ProtectedRoute>
          <MainLayout><StudyPartner /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/studypartner/groups" element={
        <ProtectedRoute>
          <MainLayout><StudyPartner /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/studypartner/join" element={
        <ProtectedRoute>
          <MainLayout><StudyPartner /></MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;