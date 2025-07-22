import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(theme => ({
  card:{
    maxWidth:200,

  },
  media: {
    width:200,
    height:100
    //paddingTop: '56.25%', // 16:9
  },
  header:{
  	minHeight:150
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

export default function NodeLight(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {title,price,image,update,desc,id}=props;

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
        title={title}
      	subheader={update}
      	className={classes.header}
      />
      <CardActionArea>
	  <Link to={`/node/${id}`}>
	      <CardMedia
	        className={classes.media}
	        image={'http://cnx.com'+image}
	        title={title}
	        src="img"
	      />
	      <CardContent>
	        <Typography variant="h5" color="textPrimary" component="p" align={'center'}>{price}</Typography>
	      </CardContent>
      </Link>
      </CardActionArea>
      <CardActions disableSpacing>
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
          <Typography paragraph variant={'caption'} align={'left'} display={'inline'}>{desc}</Typography>
        </CardContent>
      </Collapse>
      
    </Card>
  );
}