import './HomePage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const HomePage = ({  }) => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [ userData, setUserData ] = useState(null);
    
    return (
        <></>
    );
}

export default HomePage;