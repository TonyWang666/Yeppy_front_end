import React, { useState }  from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';

function App() {
  const [userId, setUserId] = useState(-1); 
  return (
    userId === -1 ? 
    <div className='App'>
      <LandingPage userId={userId} toMainPage={(userId) => { setUserId(userId)}} />
    </div> : <div> <HomePage userId={userId} /> </div>
  );
}

export default App;
