import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactGA from 'react-ga';
import n from './style.moduleidx.css';
import useApiSearch from "../../hooks/useApiSearch";
import { makeStyles } from '@material-ui/core/styles';

import {Card,CardHeader,CardContent,CardMedia,Typography,CardActionArea,CardActions,Button} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
	  width: 345,
	  minHeight:450,
	},
	media: {
	  width:330,
	  height: 200,
	  backgroundPositionY:'top'
	},
	overlay: {
		color: 'black',
		padding: 10,
		fontWeight:'bolder',
		background: 'rgb(2,0,36)',
		background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'
	 }
  });

const NodeIDX = props => {
	
	const classes = useStyles();

	const { history } = props;

	const d = v => {
		const months_arr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
		const date = new Date(v*1000);
		const year = date.getFullYear();
		const month = months_arr[date.getMonth()];
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = "0" + date.getMinutes();
		const seconds = "0" + date.getSeconds();
		return day+' '+month+' '+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}

	const p = (v,m) => {
		return m+' '+v.split('.')[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");	
	}

	const { searchTerm, setType, currentType, currentTerm, setUrl, currentUrl, setComm } = useApiSearch();

	const [sL, setSL] = React.useState(false);
	const l = t => {
		setSL(true);
	}

	const goComm = (comm_id,comm_val) => {
		if(comm_id){
			if(typeof(comm_id)==="number"){
	            setComm(comm_id);
	            ReactGA.event({
	              category:'Comm',
	              action:String(comm_id)
	            });
	            
	            let o_url = currentUrl;
	            o_url.comm = comm_id;
	            let paramString = new URLSearchParams(o_url)
	            
	            setUrl(o_url);

	            history.push(`/shopping?${paramString.toString()}`);
	        }else{
	            console.log("no comm_id");
	        }
		}
	};

	const goType = type => {
		if(typeof(type)==="number"){
            setType(type);
            ReactGA.event({
              category:'Type',
              action:String(type)
            });
            
            let o_url = currentUrl;
            o_url.type = type;
            let paramString = new URLSearchParams(o_url)
            
            setUrl(o_url);

            history.push(`/shopping?${paramString.toString()}`);
        }else{
            console.log("no type");
        }
	}

return (
	<Card className={classes.root}>
		
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
		<Link style={{textDecoration:'none'}} to={`/${props.id}`}>
        <CardContent>
		<Typography gutterBottom variant="h5" component="h2" >
		{props.price > 0 && (<div className={`${classes.overlay} ticket`}>{p(props.price, props.money)}</div>)}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" style={{ whiteSpace: 'break-spaces' }}>
		  {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
		  {d(props.update)}
          </Typography>
		  
        </CardContent>
		</Link>
      </CardActionArea>
      <CardActions style={{ position:'absolute', bottom: 0}}>
        <Button size="small" color="primary" onClick={()=>goComm(parseInt(props.comm_id),props.comm)}>
		{props.comm}
        </Button>
        <Button size="small" color="primary" onClick={()=>goType(parseInt(props.type_id))}>
		{props.type}
        </Button>
      </CardActions>
	  
    </Card>
)

/* 	return(
	  	
		  	<div className={sL ? n.e : n.hee}>
			  	<div className={n.di}>
			  		<div className={n.h}>
			  			<Link className={n.l} to={`/${props.id}`} ><p className={n.pt}>{props.title}--</p></Link>
			  			<span className={n.sti}>{d(props.update)}</span>
			  		</div>
			  		<Link className={n.l} to={`/${props.id}`} ><img className={n.i} title={props.title} alt={props.title} src={props.image} onLoad={l}/></Link>
				  	{props.price>0 && (<span className={n.sp} style={{display:'inline-block'}}>{p(props.price,props.money)}</span>)}
				  	{props.price==0 && (<span className={n.hp} style={{display:'inline-block'}}>&nbsp;</span>)}
				  	
				  	<p className={n.tp}>
				  		<span className={n.tt} onClick={()=>goType(parseInt(props.type_id))}>{props.type}</span>
			  			{props.type_id != 5 && props.type_id != 6 && (<span className={n.cc} onClick={()=>goComm(parseInt(props.comm_id),props.comm)}>{props.comm}</span>)}
			  		</p>
			  	</div>
		  	</div>
	  	
  	); */
	
}
export default NodeIDX;