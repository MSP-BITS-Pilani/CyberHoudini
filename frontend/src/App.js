import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Containers/mainComponent';

function App() {
  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  );
}

export default App;
