import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

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

      {/* admin Routes */}
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/admin" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;