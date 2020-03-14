import React, { useState } from '../../node_modules/react';
import { Button, Typography, TextField, Card, CardHeader, CardMedia, Avatar, CardContent, TableContainer } from '@material-ui/core';
//import { Table, TableHead, TableRow, TableCell, TableBody, CardActions, IconButton} from '@material-ui/core';
import { Box, CardActions, IconButton, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import http  from '../Socket/socket.js';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 1200,
    },
    oneRow: {
        // width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
}));

const HomePage = props => {
    const classes = useStyles();
    const [search_msg, setMessage] = useState("")
    const [search_data, setSearchData] = useState()
    const [iconClicked, setIconClicked] = useState()
    const [like_result, setLikeResult] = useState("")
    const [open, setOpen] = React.useState(false);
    //props.userId

    function onTextChange(e){
        setMessage(e.target.value)
    }
    async function handleSearch(event) {
        event.preventDefault();
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
            setSearchData(response.data)
            var arr = new Array(response.data.length);
            arr.fill(false)
            setIconClicked(arr)
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
    
    function handleRecommend(e) {
        e.preventDefault()
    }

    async function handleLike(e, bus_id, categories, index){
        e.preventDefault()
        iconClicked[index] = true
        setIconClicked(iconClicked)
        // console.log('index is:', index)
        // let temp_class = document.getElementById(index)
        // console.log('temp_class is:', temp_class)
        // temp_class.css('background-color', 'secondary')

        // temp_class.color = 'secondary'
        try {
            const request = {userId: props.userId, businessId: bus_id, categories: categories};
            console.log('request is:', request)
            const response = await http.POST('http://localhost:8080/Yeppy_war/rest/like', request)
            console.log('response is:', response)
            const msg = response.data.message
            setLikeResult(msg)
            setOpen(true)
        } catch {
            console.log('Exception in handleLike')
        }
    }
    function handleClose() {
        setOpen(false)
    }
    return(
        <div>
            <header className='header'>
                <div style={{display: 'flex'}}>
                    <div onClick={() => {props.setDefault()}}> Yeppy </div>
                    <img className='logo' src={require('../images/logo.jpeg')} alt="logo" />
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
                { 
                search_data ? search_data.map((value, index) => {

                    let category = ""
                    for(let each of value.categories) {
                        category += each + ' '
                    }
                    let addr_str = value.address.substring(1, value.address.length - 1)
                    let addr_arr = addr_str.split(',')
                    let address = ""
                    for(let each of addr_arr) {
                        let l = each.charAt(0) === '"' ? 1 : 0
                        let r = each.charAt(each.length - 1) === '"' ? each.length - 1 : each.length
                        address += each.substring(l, r)
                    }
                    let distance = value.distance.toFixed(1)
                    return(
                    <Card  key={index} style={{margin: '20px 300px'}}>
                        <CardHeader
                            avatar = {<Avatar aria-label='recipe' className={classes.avatar}> Y </Avatar> }
                            title={value.name}
                            action={
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon id={index} color={iconClicked && iconClicked[index] ? 'secondary' : 'default'} onClick={(e) => handleLike(e, value.id, value.categories, index) }/>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            }
                        />
                        <CardMedia
                            className={classes.media}
                            image={value.url}
                            title="food_image"
                        />
                        <CardContent>
                                <div className={classes.oneRow}>
                                    <Rating name="half-rating-read" size='large' value={value.rating} defaultValue={2.5} precision={0.5} readOnly />
                                    <Typography color="primary" style={{marginLeft: '30px'}}>{value.price}</Typography>
                                </div>
                                <div className={classes.oneRow}>
                                    <Typography style={{marginRight:'30px'}}>{category}</Typography>
                                    <PhoneIcon color='primary' />
                                    <Typography>{value.phone}</Typography>
                                </div>
                                <div className={classes.oneRow}>
                                    <Typography>{address}</Typography>
                                    <Typography style={{marginLeft:'30px'}}>{distance} meters away from me</Typography>
                                </div>
                        </CardContent>
                        
                    </Card>
                    )
                }) : <div />

                }
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            {like_result}
            </Alert>
        </Snackbar>
    </div>
    )
}

export default HomePage;

