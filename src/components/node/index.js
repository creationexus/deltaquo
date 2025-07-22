import React,{Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PageviewIcon from '@material-ui/icons/Pageview';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  card: {
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

export default function Node(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {title,price,image,update} = props;

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Card className={classes.card}>
    
      <CardHeader
        avatar={
          <PersonIcon />
        }
        action={
        <Fragment>
        	<IconButton aria-controls="simple-menu" aria-haspopup="true" aria-label="settings" onClick={handleClick}>
        	<MoreVertIcon/>
        	</IconButton>
          	<Menu
		        id="simple-menu"
		        anchorEl={anchorEl}
		        keepMounted
		        open={Boolean(anchorEl)}
		        onClose={handleClose}
		      >
		        <MenuItem onClick={handleClose}>Denunciar</MenuItem>
		    </Menu>
		</Fragment> 
        }
        style={{whiteSpace:'break-spaces'}}
        title={title}
      	subheader={update}
      />
      <CardActionArea>
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
        src="picture"
        style={{width:'300px'}}
      />

      <CardContent>
        <Typography variant="h5" color="textPrimary" component="p" align={'center'}>{price}</Typography>
      </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant={'caption'} align={'left'} display={'inline'}>
 Marca: Asus Modelo: X407ub-eb223t Velocidad Procesador: 1.8 ghz (8m cache, up to 4.0 ghz) Pulgadas: 14" Resolución: 1920 x 1080 Procesador: Intel Core i7 Incluye: asus giftboxasus splendidicesound Tipo de Producto: Notebooks Capacidad: 1TB Generación procesador: Octava Generación Descripción de Tecnología: "built-in speakerbuilt-in microphoneaudio by icepower®sonic master" Tarjeta de Video: Nvidia GeForce MX110 Memoria RAM: 8GB Sistema Operativo: Windows Conexiones: 1x usb 2.01x usb 3.0",1x headphone-out & audio-in combo jack
          </Typography>
        </CardContent>
      </Collapse>
      
    </Card>
  );
}