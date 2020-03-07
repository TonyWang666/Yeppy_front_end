import React from 'react';
import './Header.css';

const Header = props => {
    return (
        <header className='header'>
            <div>
                <text>Yeppy</text>
                <img className='logo' src={require('../../images/logo.jpeg')} alt="logo" />
            </div>
            <div className='headerMenu'>
                <button className="button">About Us</button>
                <button className="button">Login</button>
            </div>
        </header>
    );
}

export default Header;