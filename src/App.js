import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  

  return (
    <>
    <Header isAuthenticated={isAuthenticated} logout={logout} />
    <main className="main">
      { isAuthenticated ? <Sidebar /> : null }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage loginWithRedirect={loginWithRedirect} />} />
        </Routes>
      </BrowserRouter>
    </main>
    </>
  );
}

export default App;
