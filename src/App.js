import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import format from 'date-fns/format';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import ExploreByBodyPart from './pages/ExploreByBodyPart/ExploreByBodyPart';
import ExploreBySearch from './pages/ExploreBySearch/ExploreBySearch';
import BodyPartDetails from './pages/BodyPartDetails/BodyPartDetails';
import WorkoutsByMonth from './pages/WorkoutsByMonth/WorkoutsByMonth';
import WorkoutDetails from './pages/WorkoutDetails/WorkoutDetails';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  const { isAuthenticated } = useAuth0();
  const [ openNav, setOpenNav ] = useState(false);

  const today = format(new Date(), "LL-dd-yyyy");

  return (
    <div className="wrapper">
      <BrowserRouter>
        {isAuthenticated ? <Sidebar openNav={openNav} setOpenNav={setOpenNav} /> : null}
        <main className="main">
          {isAuthenticated ? <Header openNav={openNav} setOpenNav={setOpenNav} /> : null}
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} />
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/workouts" element={<WorkoutsByMonth />} />
            <Route path="/workouts/:date" element={<WorkoutDetails />} />
            <Route path="/workouts/today" element={<Navigate to={`/workouts/${today}`} />} />
            <Route path="/explore" element={<ExploreByBodyPart />} />
            <Route path="/explore/:bodyPart" element={<BodyPartDetails />} />
            <Route path="/search/:query" element={<ExploreBySearch />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
