import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
        <div className="Login">
            <h>LoginPage</h>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default LoginPage;