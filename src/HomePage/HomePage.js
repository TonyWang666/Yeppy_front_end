import React, { useState } from '../../node_modules/react';
import { Button, TextField, Typography } from '@material-ui/core';
import http  from '../Socket/socket.js';
import Display from '../components/Display/Display';
import './HomePage.css';
const HomePage = props => {
    
    const [search_msg, setMessage] = useState("")
    const [search_data, setSearchData] = useState() 
    const [isRecommend, setIsRecommend] = useState()

    function onTextChange(e){
        setMessage(e.target.value)
    }
    function handleSearch(event) {
        event.preventDefault();
        setIsRecommend(0)
        setSearchData(undefined);
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
        }
    }
    function handleRecommend(e) {
        e.preventDefault()
        setIsRecommend(1)
        setSearchData(undefined);
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
        }
    }

    async function onGeolocateSuccess(coordinates) {
        const { latitude, longitude } = coordinates.coords;
        console.log('Found coordinates: ', latitude, longitude);
        try {
            const request = {userId: '110', term: search_msg, latitude: latitude, longitude:longitude};
            console.log('request is:', request);
            const response = await http.POST('http://localhost:8080/Yeppy_war/rest/search', request);
            console.log('response is:', response)
            console.log('response.data is:', response.data)
            setSearchData(response.data)
        } catch {
        console.log('Exception in handleSearch')
        }
    }
    
    function onGeolocateError(error) {
        console.warn(error.code, error.message);
        if (error.code === 1) {
          // they said no
        } else if (error.code === 2) {
          // position unavailable
        } else if (error.code === 3) {
          // timeout
        }
    }

    return(
        <div className='parent-div'>
            <header className='header'>
                <div style={{display: 'flex'}}>
                    <div onClick={() => {props.setDefault()}}> Yeppy </div>
                    <img className='logo' src={require('../images/logo.png')} alt="logo" />
                </div>
                <div className='headerMenu'>
                    <form noValidate autoComplete="off">
                        <TextField id="search_bar" label="Search..." onChange={onTextChange} />
                    </form>
                    <div style={{marginLeft: '10px'}}>
                        <Button size='large' variant="outlined" color='primary' onClick={(e) => handleSearch(e)} > SEARCH </Button>
                    </div>
                </div>
                <div className='headerMenu'>
                    <div style={{margin: '5px'}}>
                        <Button size='large' variant="outlined" color='primary' onClick={(e) => handleRecommend(e)} > You may like </Button>
                    </div>
                    <div style={{margin: '5px'}}>
                        <Button size='large' variant="outlined" color='primary' >About Us</Button>
                    </div>
                </div>
            </header>
            <div >
                <Typography align='center' display="block" color={isRecommend === 0 ? 'primary' : 'secondary'} variant='h2' component='h2'>{isRecommend === 0 ? 'Search Result' : isRecommend === 1 ? 'Places you may like' : ''}</Typography>
            </div>
            {search_data !== undefined && search_data !== null ? <Display search_data={search_data} /> : <div />}
    </div>
    )
}

export default HomePage;

