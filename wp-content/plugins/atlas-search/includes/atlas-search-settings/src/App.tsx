import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';

import './App.scss';

import ConfigPage from './pages/Config';
import SettingsPage from './pages/Settings';
import SyncDataPage from './pages/SyncData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          autoClose={2000}
          draggable={false}
          position="top-center"
          transition={Flip}
        />
        <ViewTemplate />
      </BrowserRouter>
    </div>
  );
}

function ViewTemplate() {
  const query = new URLSearchParams(useLocation().search);
  const view = query.get('view');

  switch (view) {
    case 'search-config': {
      return <ConfigPage />;
    }

    case 'sync-data': {
      return <SyncDataPage />;
    }

    default: {
      return <SettingsPage />;
    }
  }
}

export default App;
