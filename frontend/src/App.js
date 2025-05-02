import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Placeholder for actual components
const Home = () => <div>Home Page</div>;
const Login = () => <div>Login Page</div>;
const Register = () => <div>Register Page</div>;
const Preferences = () => <div>Preferences Page</div>;
const Digest = () => <div>Digest Page</div>;
const NotFound = () => <div>404 - Not Found</div>;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/digest" element={<Digest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App; 