import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { Auth0Provider } from '@auth0/auth0-react';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));

const store= configureStore({
  reducer: rootReducer,
});

root.render(

<Provider store={store}>
  <BrowserRouter>
  <Auth0Provider
    domain="dev-xy7wbbxernjdx1bi.us.auth0.com"
    clientId="rWAJFdAqYLsGZUGxWyQj1LHKZQDTnyuH"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
   
      <App />
      <Toaster/>
      </Auth0Provider>
  </BrowserRouter>

  </Provider>
  
);

reportWebVitals();
