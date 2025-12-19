import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Components
import Home from './pages/HomePage';
import About from './components/HomeComponent/About';


// Admin Components
import Login from './admin/Login';
import AdminDashboard from './admin/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
   
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
  
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<Login />} />
      <Route 
        path="/admindashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;