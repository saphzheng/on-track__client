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
import BodyPartDetails from './pages/BodyPartDetails/BodyPartDetails';
import WorkoutsByMonth from './pages/WorkoutsByMonth/WorkoutsByMonth';
import WorkoutDetails from './pages/WorkoutDetails/WorkoutDetails';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  useEffect(() => {
      console.log(user)
  }, []);

  const today = format(new Date(), "LL-dd-yyyy");

  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        {isAuthenticated ? <Sidebar /> : null}
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage loginWithRedirect={loginWithRedirect} />} />
          <Route path="/workouts" element={<WorkoutsByMonth />} />
          <Route path="/workouts/:date" element={<WorkoutDetails />} />
          <Route path="/workouts/today" element={<Navigate to={`/workouts/${today}`} />} />
          <Route path="/explore/byBodyPart" element={<ExploreByBodyPart />} />
          <Route path="/explore/byBodyPart/:bodyPart" element={<BodyPartDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
