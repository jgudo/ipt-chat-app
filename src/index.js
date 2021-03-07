import RoomProvider from 'context/RoomProvider';
import UserProvider from 'context/UserProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import App from './App';
import './index.css';

WebFont.load({
  google: {
    families: ['Poppins']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <RoomProvider>
        <App />
      </RoomProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
