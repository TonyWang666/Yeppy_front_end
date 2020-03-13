import React, { useState } from '../../node_modules/react';
import { Button, form, TextField, Card, CardHeader, CardMedia, Avatar, CardContent, TableContainer } from '@material-ui/core';
import { Table, TableHead, TableRow, TableCell, TableBody, CardActions, IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import http  from '../Socket/socket.js';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345,
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
    // const [latitude, setLatitude] = useState(0.0)
    // const [longitude, setLongitude] = useState(0.0)
    // const [isLocated, setLocation] = useState(false)
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
                        <Button size='large' variant="outlined" color='primary' > You may like </Button>
                    </div>
                    <div style={{margin: '5px'}}>
                        <Button size='large' variant="outlined" color='primary' >About Us</Button>
                    </div>
                </div>
            </header>
            <div>
                { 
                search_data ? search_data.map((value, index) => {
                    let category = "", counter = 1
                    for(let each of value.categories) {
                        category += counter + '. ' + each + ' '
                        counter++
                    }
                    return(
                    <Card>
                        <CardHeader
                            avatar = {<Avatar aria-label='recipe' className={classes.avatar}> Y </Avatar> }
                            title={value.name}
                        />
                        {/* <CardMedia
                            image={require('../images/logo.jpeg')}
                            title="food_image"
                        /> */}
                        <CardContent>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Attribute</TableCell>
                                            <TableCell>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>{value.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell>{category}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>rating</TableCell>
                                            <TableCell>{value.rating}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>price</TableCell>
                                            <TableCell>{value.price}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>phone</TableCell>
                                            <TableCell>{value.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>url</TableCell>
                                            <TableCell>{value.url}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>address</TableCell>
                                            <TableCell>{value.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>distance</TableCell>
                                            <TableCell>{value.distance}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                
                            </Typography> */}
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </IconButton>
                        </CardActions>
                    </Card>
                    )
                }) : <div />
                }
        </div>
    </div>
    )
}

export default HomePage;

