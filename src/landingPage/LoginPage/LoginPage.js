import React, { useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import http  from '../../Socket/socket.js';
import './LoginPage.css';

const LoginPage = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };
    // function validateform() {
    //     return email.length > 0 && password.length > 0;
    // }

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await http.POST('http://localhost:8080/Yeppy_war/rest/login', {username: `${email}`, password: `${password}`});
        if(response === 400) {
            setTitle('Wrong Email or Password')
            setMsg("Please try again to login with the valid email and password")
            handleClickOpen()
            // sleep(3000).then(() => props.isLogin('login'))
        }
        else if(response.data.resultCode === 200) {
            props.toMainPage(response.data.userId)
            // setTitle("Register Succesfully")
            // setMsg('Congratulations, you just login with email', email)
            // handleClickOpen()
            // sleep(3000).then(() => props.toMainPage())
            
        }
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
                    <Input id="my-pword" type='password' aria-describedby="my-helper-text"  onChange={(e) => setPassword(e.target.value)}/>
                    <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                </FormControl>
                <div style={{margin: '20px 0px'}}>
                    <Button size='large' variant="outlined" color='primary' onClick={(e) => handleSubmit(e)}> Login </Button>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContent>
                        {msg}
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginPage;