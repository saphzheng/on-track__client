import './HomePage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({  }) => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    

    return (
        <></>
    );
}

export default HomePage;