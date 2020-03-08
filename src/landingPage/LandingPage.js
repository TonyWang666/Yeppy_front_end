import React, { useState } from '../../node_modules/react';
import './style.css';
import Header from '../components/Header/Header.js'
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const LandingPage = props => {
    const [page, setPage] = useState("default");

    return (
        <div>
            <Header setLoginPage={() => setPage("login")} />
            {page === "default" ?
            <div className="wrapper">
                <div className='mainImage'>
                    <img  src={require('../images/logo.jpeg')} alt="logo" />
                </div>

                <div className='mainLogo'> Yeppy </div>
                <div className='login'>
                    <button onClick={() => setPage("login")}> Login </button>
                </div>
                <div className='register'>
                    <button onClick={() => setPage("register")}> Register </button>
                </div>
            </div> : 
            page === "login" ? <LoginPage /> : <RegisterPage />
            }
        </div>

        
    );
}

export default LandingPage;