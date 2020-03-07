import React from 'react';
import './style.css';
import Header from '../components/Header/Header.js'
const LandingPage = props => {
    return (
        <div>
            <Header />
            <div class="wrapper">
                <div className='mainImage'>
                    <img  src={require('../images/logo.jpeg')} alt="logo" />
                </div>

                <div className='mainLogo'> Yeppy </div>
                <div className='login'>
                    <button> Login </button>
                </div>
                <div className='register'>
                    <button> Register </button>
                </div>
            </div>
        </div>

        
    );
}

export default LandingPage;