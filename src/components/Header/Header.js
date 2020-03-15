import React from 'react';
import './Header.css';
import { Button } from '@material-ui/core';

const Header = props => {
    return (
        <header className='header'>
            <div style={{display: 'flex'}}>
                <div onClick={() => {props.setDefault()}}> Yeppy </div>
                <img className='logo' src={require('../../images/logo.png')} alt="logo" />
            </div>
            <div className='headerMenu'>
                <div style={{margin: '5px'}}>
                    <Button size='large' variant="outlined" color='primary' >About Us</Button>
                </div>
                <div style={{margin: '5px'}}>
                    <Button size='large' variant="outlined" color='primary' onClick={props.setLoginPage}>Login</Button>
                </div>
            </div>
        </header>
    );
}

export default Header;