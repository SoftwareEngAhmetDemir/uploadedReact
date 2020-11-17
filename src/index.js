import { Redirect, Switch } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import WebPanel from './web_or_panel.js';
import AuthProvider from './panel/Context/AuthContext';
import './web/style.css';

ReactDOM.render(
  <AuthProvider>
    <Router>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <WebPanel />
      </SnackbarProvider>
    </Router>
  </AuthProvider>,
  document.getElementById('root')
);

