import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Landing from './pages/Landing/Landing';

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);

  return (
    <>
    <Header loggedIn={loggedIn}/>
    <main className="main">
      { loggedIn ? <Sidebar /> : null }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </main>
    </>
  );
}

export default App;
