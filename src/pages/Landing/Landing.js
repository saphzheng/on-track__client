import './Landing.scss';
import landingImage from '../../assets/images/landing-image.jpg';
import { Parallax } from 'react-parallax';
import { useEffect, useState } from 'react';

const hero = () => {
    // const [ offsetY, setOffsetY ] = useState(0);

    // const handleScroll = () => {
    //     setOffsetY(window.scrollY);
    // };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // })

    return (
        <Parallax className="landing" blur={3} bgImage={landingImage} strength={600}>
            <div className="hero__content">
                <h1 className="hero__title">Get Started</h1>
                <button className="hero__cta">Sign Up</button>
                <div className="hero__secondary-cta">
                    <span className="hero__login-prompt">Already have an account?</span>
                    <button className="hero__login">Log In</button>
                </div>
            </div>
        </Parallax>
    );
}

export default hero;