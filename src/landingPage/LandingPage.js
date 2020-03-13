import React, { useState } from '../../node_modules/react';
import './LandingPage.css';
import { Button, Divider } from '@material-ui/core';
import Header from '../components/Header/Header.js'
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';


const LandingPage = props => {
    const [page, setPage] = useState("default");
    return (
        <div>
            <div>
                <Header setDefault={() => setPage('default')} setLoginPage={() => setPage("login")} />
            </div>
            <Divider />
            {page === "default" ?
            <div className="back">
                <div className="wrapper">
                    <div className='mainImage'>
                        <img  src={require('../images/logo.jpeg')} alt="logo" />
                    </div>
                    <div className='mainLogo' > Yeppy </div>
                    <div className='login'>
                        <Button size='large' variant="outlined" color='primary' onClick={() => setPage("login")}> Login </Button>
                    </div>
                    <div className='register'>
                        <Button size='large' variant="outlined" color='primary' onClick={() => setPage("register")}> Register </Button>
                    </div>
                </div>
            </div> : 
            page === "login" ? <LoginPage isLogin={(msg) => setPage(msg)} toMainPage={ props.toMainPage } /> : <RegisterPage isRegister={(msg) => setPage(msg)} />
            }
        </div>

        
    );
}

export default LandingPage;