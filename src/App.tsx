import React from 'react';
import logo from './logo.svg';
import './App.css';
import PrivateRoute from './routes/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <PrivateRoute />
      <ToastContainer /></>

  );
}

export default App;
