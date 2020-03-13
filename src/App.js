import React, { useState }  from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';

function App() {
  const [userStatus, setStatus] = useState(0);
  return (
    userStatus === 0 ? 
    <div className='App'>
      <LandingPage isLogin={() => setStatus(1)}/>
    </div> : <div>Welcome to MainPage</div>
  );
}

export default App;
