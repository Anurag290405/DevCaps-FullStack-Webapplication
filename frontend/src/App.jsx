import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App = () => {
  return (

  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);}

export default App;
