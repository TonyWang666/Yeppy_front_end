import React from 'react';
import './Header.css';

const Header = props => {
    return (
        <header className='header'>
            <div>
                Yeppy
                <img className='logo' src={require('../../images/logo.jpeg')} alt="logo" />
            </div>
            <div className='headerMenu'>
                <button className="button">About Us</button>
                <button className="button" onClick={props.setLoginPage}>Login</button>
            </div>
        </header>
    );
}

export default Header;