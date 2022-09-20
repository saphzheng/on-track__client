import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import ExploreByBodyPart from './pages/ExploreByBodyPart/ExploreByBodyPart';

function App() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // async function getUserData() {
  //   try {
  //       const token = await getAccessTokenSilently();
  //       const response = await axios.get("http://localhost:8080/user", {
  //           headers: {
  //               authorization: `Bearer ${token}`
  //           }
  //       });
  //       console.log(response.data);
  //       // setUserData(response.data);
  //       // email, email_verfied, name, nickname, picture, sub, updated
  //   } catch (error) {
  //       console.log(error.message);
  //   }
  // }

  useEffect(() => {
      // getUserData();
      console.log(user)
  }, []);

  return (
    <>
    <Header />
    <main className="main">
      { isAuthenticated ? <Sidebar /> : null }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage loginWithRedirect={loginWithRedirect} />} />
          <Route path="/explore" element={<ExploreByBodyPart />} />
        </Routes>
      </BrowserRouter>
    </main>
    </>
  );
}

export default App;
