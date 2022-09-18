import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Landing from './pages/Landing/Landing';

function App() {
  return (
    <>
    <Header />
    <main className="main">
      <Sidebar />
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
