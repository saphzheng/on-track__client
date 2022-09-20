import './LandingPage.scss';
import landingImage from '../../assets/images/landing-image.jpg';
import { Parallax } from 'react-parallax';

const LandingPage = ({ loginWithRedirect }) => {
    return (
        <Parallax className="landing" blur={3} bgImage={landingImage} strength={600}>
            <div className="hero__content">
                <h1 className="hero__title">onTrack</h1>
                <span className="hero__description">Bring meaning to your workouts by using onTrack to plan out and reach your exercise goals.
                    Record sets, reps, weight to start to visualizing your progress in a new way and identify areas of improvement.
                </span>
                <h2 className="hero__subtitle">Get Started</h2>
                <button className="hero__cta" onClick={loginWithRedirect}>Log In</button>
            </div>
        </Parallax>
    );
}

export default LandingPage;