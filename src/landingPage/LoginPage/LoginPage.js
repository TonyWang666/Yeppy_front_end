import React, { useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button, Typography } from '@material-ui/core';
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './LoginPage.css';

const LoginPage = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // function validateform() {
    //     return email.length > 0 && password.length > 0;
    // }
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Email is: " + email);
        console.log("password is:" + password);
    }
    return (
        <div id='login'>
            <div style={{ margin:'20px 50px' }}>            
                <Typography variant="h3" fontFamily='Pacifico'> Login Page </Typography>
            </div>
            <div style={{width:'200px', margin:'20px 50px'}}>
                <FormControl>
                    <InputLabel htmlFor="my-input" >Email address</InputLabel>
                    <Input id="my-email" aria-describedby="my-helper-text" onChange={(e) => setEmail(e.target.value)}/>
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input id="my-pword" aria-describedby="my-helper-text"  onChange={(e) => setPassword(e.target.value)}/>
                    <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                </FormControl>
                <div style={{margin: '20px 0px'}}>
                    <Button size='large' variant="outlinedPrimary" color='primary' onClick={(e) => handleSubmit(e)}> Login </Button>
                </div>
            </div>
            
        </div>
    );
}

export default LoginPage;