import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import './App.css';

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      {/* Define the routes here...? React is weird */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<div />} />
          <Route path="about" element={<div />} />
          <Route path="dashboard" element={<div />} />
          {/* 404 */}
          <Route path="*" element={<div />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
