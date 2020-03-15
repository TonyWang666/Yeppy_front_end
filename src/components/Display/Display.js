import React, { useState } from '../../../node_modules/react';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Typography, Card, CardHeader, CardMedia, Avatar, CardContent } from '@material-ui/core';
import { CardActions, IconButton, Snackbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import MuiAlert from '@material-ui/lab/Alert';
import http  from '../../Socket/socket.js';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 900,
      margin: '0 auto',
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

const Display = props => {
    const [data, setData] = useState()
    const [iconClicked, setIconClicked] = useState()
    const [like_result, setLikeResult] = useState("")
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    if(data === undefined && props.search_data !== null && props.search_data !== undefined) {
        console.log('props.search_data is:', props.search_data)
        console.log('current data is:', data)
        setData(props.search_data)
        var arr = new Array(props.search_data.length);
        arr.fill(false)
        setIconClicked(arr) 
    }


    async function handleLike(bus_id, categories, index){
        iconClicked[index] = true
        setIconClicked(iconClicked)
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

    return (
        <div className='parent_div'>
            { 
            data !== undefined ? data.map((value, index) => {

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
                    <div key={Math.random()} className='card'>
                <Card  className={classes.root} key={index} style={{marginTop:'30px'}}>
                    <CardHeader
                        avatar = {<Avatar aria-label='recipe' className={classes.avatar}> Y </Avatar> }
                        title={value.name}
                        action={
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon id={index} color={iconClicked && iconClicked[index] ? 'secondary' : 'default'} onClick={() => handleLike(value.id, value.categories, index) }/>
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
                </div>

                )
            }) : <div />
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                {like_result}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Display