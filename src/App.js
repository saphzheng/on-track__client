import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
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
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
      console.log(user)
  }, []);

  const today = format(new Date(), "LL-dd-yyyy");

  return (
    <BrowserRouter>
      {isAuthenticated ? <Header /> : null}
      <main className="main">
        {isAuthenticated ? <Sidebar /> : null}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsByMonth />} />
          <Route path="/workouts/:date" element={<WorkoutDetails />} />
          <Route path="/workouts/today" element={<Navigate to={`/workouts/${today}`} />} />
          <Route path="/explore/category" element={<ExploreByBodyPart />} />
          <Route path="/explore/category/:bodyPart" element={<BodyPartDetails />} />
          <Route path="/explore/search" element={<ExploreBySearch />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
