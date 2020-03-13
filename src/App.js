import React, { useState }  from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';

function App() {
  const [userStatus, setStatus] = useState(0);
  return (
    userStatus === 0 ? 
    <div className='App'>
      <LandingPage toMainPage={() => setStatus(1)}/>
    </div> : <div> <HomePage /> </div>
  );
}

export default App;
