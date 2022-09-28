import './LandingPage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../../assets/images/ontrack-logo.svg';

const LandingPage = () => {
    const { loginWithRedirect } = useAuth0();
    
    return (
        <section className="landing">
            <div className="landing__bg"></div>
            <div className="landing__content">
            <img className="landing__logo" src={logo} alt="onTrack Fitness"></img>
                <h1 className="landing__title">Get started with onTrack Fitness</h1>
                <span className="landing__description">Bring meaning to your workouts by using onTrack to plan out and reach your exercise goals.</span>
                <span className="landing__description">Record sets, reps, weight to start visualizing your progress in a new way and identify areas of improvement.</span>
                <button className="primary-button landing__cta" onClick={loginWithRedirect}>Log In</button>
            </div>
        </section>
    );
}

export default LandingPage;