import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from 'components/main/Main';
import SignPage from 'components/auth/SignPage';
import { AuthProvider } from 'components/guards/AuthContext';
import ProtectedRoute from 'components/guards/ProtectedRoute';
import LandingPage from './components/landingPage/LandingPage';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<SignPage />} />
          <Route path="/land*" element={<LandingPage />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};


export default App;
