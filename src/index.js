import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-3av77v7a.us.auth0.com"
    clientId="rpGuAUdfqvx12tenDjbvsyCeeVM8n1iY"
    redirectUri={window.location.origin}
    audience="https://onTrack.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
);
