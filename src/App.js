/* eslint-disable no-unused-vars */
import './App.css';
import Login from './components/login';
import Studentlist from './components/studentlist';
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';




function App() {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setApiKey(localStorage.getItem('token'));
    // showApiKey();
  }, []);

  const showApiKey = () => {
    console.log('apiKey:', apiKey);
  }
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={30}
        containerClassName="notification-container"
        toastOptions={{
          className: "notification-toast",
          duration: 1500,
        }}
      />
      <Router>
        <Routes>
          <Route
            path="/"
            element={apiKey ? <Navigate to="/studentlist" /> : <Login setApiKey={setApiKey} />}
          />
          <Route
            path="/studentlist"
            element={apiKey ? <Studentlist setApiKey={setApiKey} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
