import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from '../../components/infiniteScroll';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import useApiSearch from "../../hooks/useApiSearch";
import s from './style.module.css';
import useApiRequest from '../../hooks/useApiRequest/';
import { FETCHING, SUCCESS, ERROR } from '../../hooks/useApiRequest/actionTypes';
import { TextField,Select,FormControl,InputLabel,MenuItem,FormHelperText,Checkbox,FormControlLabel,Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

const useStyles = makeStyles((theme) => ({
  formControl:{
    marginTop: 15
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const List = props => {

	const classes = useStyles();

	const location = useLocation();	

	const { currentType, currentTerm, currentTag, setTag, searchTerm, setType, currentUrl, setUrl, currentComm, setComm, setMinPrice, currentMinPrice } = useApiSearch();

	const [{status,response}, makeRequest] = useApiRequest(`${props.base_url}/comm/${currentComm}`,{verb:"get", params:{}});

	const [term, setTerm] = useState(currentTerm);
	const [minPrice, setPrice1] = useState(currentMinPrice);

	//console.log("currentPrice", currentPrice);

	React.useEffect(()=>{
        try{
            document.title="Shopping | DeltaQuo";

            return ()=>{};
        }catch(e){
          console.log(e);
        }
        //setId(props.match.params.id);
    },[]);

    React.useEffect(() => {
    
	  const currentPath = location.pathname;
	  const searchParams = new URLSearchParams(location.search);
	  const tag = searchParams.get('tag');
	  const type = searchParams.get('type');
	  const term = searchParams.get('term');
	  const comm = searchParams.get('comm');
	  const minPrice = searchParams.get('minPrice');

	  let o_url={};
	  if(term){
	  	//..term
	  	setTerm(term);
	    searchTerm(term);
	    o_url.term=term;
	  }
	   if(type){
	    setType(type);
	    o_url.type=type;
	  }
	  if(tag){
	    setTag(tag);
	    o_url.tag=tag;
	  }
	  if(comm){
	    setComm(comm);
	    o_url.comm=comm;
	  }
	  
	  if(minPrice){
  		setPrice1(minPrice);
  		setMinPrice(minPrice);
    	o_url.minPrice=minPrice;
	  }

	  setUrl(o_url);


	  return () => {
	    //console.log('will unmount');
	  };
	}, []);

	React.useEffect(()=>{
        try{
            let i = currentComm;
			console.log(i);
			if(currentComm){
				makeRequest();
			}
            return ()=>{};
        }catch(e){
          console.log(e);
        }
        //setId(props.match.params.id);
    },[currentComm]);

    React.useEffect(()=>{
        try{
        	setTerm(currentTerm);
            return ()=>{};
        }catch(e){
          console.log(e);
        }
        //setId(props.match.params.id);
    },[currentTerm]);


	const { history } = props;

	const dTag = e => {
		setTag('');
		//history.push('/shopping');
		let o_url = currentUrl;
        delete o_url.tag;
        let paramString = new URLSearchParams(o_url);
        
        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);
	}

	const dTerm = e => {
		searchTerm('');
		//history.push('/shopping');
		let o_url = currentUrl;
        delete o_url.term;
        let paramString = new URLSearchParams(o_url);
        
        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);

	}

	const dType = e => {
		setType('');
		//history.push('/shopping');
		let o_url = currentUrl;
        delete o_url.type;
        //o_url.type = '';
        let paramString = new URLSearchParams(o_url);

        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);

	}

	const dComm = e => {
		setComm('');
		//history.push('/shopping');
		let o_url = currentUrl;
        delete o_url.comm;
        //o_url.type = '';
        let paramString = new URLSearchParams(o_url);

        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);

	}

	const i2s = i => {
		const a = ['Locales','Terrenos','Inmuebles','Vehiculos','Productos','Ofertas','Remates','Concursos','Eventos','Museos','Templos','Parques','Hoteles','Multitiendas','Teatros','Centros Comerciales','Promociones'];
		return a[i-1];
	}

	const handleChangeSel = (e) => {
		let type = e.target.value;

		if(type == ""){
			setType('');
			let o_url = currentUrl;
	        delete o_url.type;
	        let paramString = new URLSearchParams(o_url);
	        setUrl(o_url);
	        history.push(`/shopping?${paramString.toString()}`);
		}else{
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
			//let o_url = currentUrl;
	        //delete o_url.type;
	        //let paramString = new URLSearchParams(o_url);
	        //setUrl(o_url);
	        //history.push(`/shopping?${paramString.toString()}`);
    	}
  	};

  	const handleChangeMinPriceCheck = (e) => {
  		//const minPrice = e.target.value;
		setMinPrice(minPrice);
		ReactGA.event({
          category:'minPrice',
          action:String(minPrice)
        });
        let o_url = currentUrl;
        o_url.minPrice = minPrice;
        let paramString = new URLSearchParams(o_url)
        setUrl(o_url);
        history.push(`/shopping?${paramString.toString()}`);
		//console.log("event.target.checked", e.target.checked);
  	};

  	const handleChangeTermCheck = (e) => {
  		//const term = e.target.value;
		searchTerm(term);
		ReactGA.event({
          category:'Term',
          action:String(term)
        });
        let o_url = currentUrl;
        o_url.term = term;
        let paramString = new URLSearchParams(o_url)
        setUrl(o_url);
        history.push(`/shopping?${paramString.toString()}`);
		//console.log("event.target.checked", e.target.checked);
  	};

  	const handleTerm = (e) => {
  		setTerm(e.target.value);
  	}

  	const handleMinPrice = (e) => {
  		setPrice1(e.target.value);	
  	}

    return(
    <div>	
    	<Grid container spacing={0} justify="center" alignItems="flex-start"> 
	    	<Grid className={s.ls} item xs={12} sm={12} md={3} style={{display: currentType || currentTag || currentTerm || currentComm ? 'block' : 'none'}}>
	    		<Paper style={{padding:'5px 10px',margin:'3px'}}>
					<p><span>Criterios actuales:</span></p>
			        
			        <FormControl fullWidth={true} className={classes.formControl}>
			        	<TextField
				        	size="small"
				            color="primary"
				            name="term"
				            label="Termino" 
				            onKeyPress={(e) => {
		                      if (e.key==='Enter'){
		                        handleChangeTermCheck(e);
		                      }
			                }}
			                onChange={ handleTerm }
			                value={ term }
			                />
				    </FormControl>

			        <FormControl fullWidth={true} className={classes.formControl}>
			        	<TextField
				        	size="small"
				          	type="number"
				          	value={ minPrice }
				            name="cMinPrice"
				            color="primary"
				            label="Precio minimo" 
				            onKeyPress={(e) => {
			                      if (e.key==='Enter'){
			                         handleChangeMinPriceCheck(e);
			                      }
			                }}
			                onChange={ handleMinPrice }
			                />
				    </FormControl>

				    <FormControl fullWidth={true} className={classes.formControl}>
				    <InputLabel id="select-autowidth-label">Seleccione tipo</InputLabel>
				        <Select
				          labelId="select-autowidth-label"
				          id="select-autowidth"
				          value={currentType}
				          onChange={handleChangeSel}
				          autoWidth
				        >
				          <MenuItem value=""><em>Seleccione</em></MenuItem>
				          <MenuItem value={6}>Ofertas</MenuItem>
				          <MenuItem value={3}>Inmuebles</MenuItem>
				          <MenuItem value={5}>Productos</MenuItem>
				          <MenuItem value={1}>Locales</MenuItem>
				          <MenuItem value={17}>Promociones</MenuItem>
				          <MenuItem value={12}>Parques</MenuItem>
				          <MenuItem value={10}>Museos</MenuItem>
				          <MenuItem value={9}>Eventos</MenuItem>
				          <MenuItem value={8}>Concursos</MenuItem>
				          <MenuItem value={2}>Terrenos</MenuItem>
				          <MenuItem value={7}>Remates</MenuItem>
				          <MenuItem value={11}>Templos</MenuItem>
				          <MenuItem value={13}>Hoteles</MenuItem>
				          <MenuItem value={14}>Multitiendas</MenuItem>
				          <MenuItem value={15}>Teatros</MenuItem>
				          <MenuItem value={16}>Centros Comerciales</MenuItem>
				        </Select>
				        <FormHelperText>Agrupación de elementos</FormHelperText>
				    </FormControl>


				    <FormControl fullWidth={false} className={classes.formControl}>
	    				{currentType && (
	    					<Chip
						        icon={<FilterListRoundedIcon />}
						        label={i2s(currentType)}
						        clickable
						        color="primary"
						        onDelete={dType}
						        variant="outlined"
						        size="small"
						        style={{marginLeft:5}}
						    />
	    					)}
	    			</FormControl>

	    			<FormControl fullWidth={false} className={classes.formControl}>
					    {currentTerm && (
					    	<Chip
						        icon={<FilterListRoundedIcon />}
						        label={currentTerm}
						        clickable
						        color="primary"
						        onDelete={dTerm}
						        variant="outlined"
						        size="small"
						        style={{marginLeft:5}}
						    />
					    )}
	    			</FormControl>

					<FormControl fullWidth={false} className={classes.formControl}>
	    				{currentTag && (
	    					<Chip
						        icon={<FilterListRoundedIcon />}
						        label={currentTag}
						        clickable
						        color="primary"
						        onDelete={dTag}
						        variant="outlined"
						        size="small"
						        style={{marginLeft:5}}
						    />
	    				)}
	    			</FormControl>

	    			<FormControl fullWidth={false} className={classes.formControl}>
	    				{currentComm && status === SUCCESS && (
	    					<Chip
						        icon={<FilterListRoundedIcon />}
						        label={response.data.cn}
						        clickable
						        color="primary"
						        onDelete={dComm}
						        variant="outlined"
						        size="small"
						        style={{marginLeft:5}}
						    />
	    				)}
				    </FormControl>
	    		</Paper>
	    	</Grid>
	      	<Grid className={s.ls} item xs={12} sm={12} md={currentType || currentTag || currentTerm || currentComm ? 9 : 12}>
	        	<InfiniteScroll search_on={true} base_url={props.base_url} api={props.api} params={props.params}/>
	    	</Grid>
    	</Grid>
    </div>
    )
  
};
export default List;