import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, InputBase, MenuItem, IconButton, Link, Icon} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, fade } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import ReactGA from 'react-ga';
import ReactFlagsSelect from 'react-flags-select';
import s from './style.module.css';
import useApiSearch from "../../hooks/useApiSearch";

//import css module
////////import 'react-flags-select/css/react-flags-select.css'; --> Module not found: Can't resolve 'react-flags-select/css/react-flags-select.css' in '/usr/src/app/deltaquo/src/components/appBar


//import { useParams} from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar:{
      backgroundColor:'#d6b71e'
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  title: {
    textShadow:'0 0 2px #d6b71e',
    color:'black',
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginRight:'5px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 220,
      '&:focus': {
        width: 400,
      },
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 220,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const Page = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const { history } = props;
    //const { match } = props;
    //let {tag} = match.params;
    //let { tag } = useParams();

    const { searchTerm, setType, currentType, currentTerm, currentUrl, setUrl } = useApiSearch();

    //let ro = false;
    const [term, setTerm] = useState(currentTerm);
    const [ro, setRo] = useState(false);

    React.useEffect(()=>{
        try{
          //setRo(currentTerm.length>0);
          setTerm(currentTerm);
          return ()=>{};
        }catch(e){
          console.log(e);
        }
        //setId(props.match.params.id);
    },[currentTerm]);

    const handleClose = (type) => {
      setAnchorEl(null);
      if(typeof(type)==="number"){
        setType(type);
        ReactGA.event({
          category:'Type',
          action:String(type)
        });
        //history.push('/shopping?type='+String(type));

        let o_url = currentUrl;
        o_url.type = type;
        let paramString = new URLSearchParams(o_url)
        
        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);
      }
    }

    let handler = e => {
      if (e.key==='Enter'){
        //let term=e.target.value;
        ReactGA.event({
          category:'Search',
          action:term
        });
        searchTerm(term);
        //history.push('/shopping');
        //setRo(term.length>0);
        let o_url = currentUrl;
        o_url.term = term;
        let paramString = new URLSearchParams(o_url);
        
        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);
      }
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }

    const handleChange = (e) => {
      setTerm(e.target.value);
    }

    return (
      <div className={classes.grow}>
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <Toolbar className="appbar">
              <img src="/static/dqz.png" onClick={()=>history.push('/shopping')} style={{width:25,marginRight:5,cursor:'pointer'}} title="cl" alt="cl"/>
              <Typography className={classes.title} variant="h6" noWrap onClick={()=>history.push('/shopping')}>
              DeltaQuo
            </Typography>
  
            <div style={{display:'none',marginTop:'5px'}}>
              <ReactFlagsSelect id={s.flagsselect} onSelect={code => console.log(code)} countries={["CL"]} selected={'CL'} selectedSize={10} disabled={false} showSelectedLabel={true} showOptionLabel={true}/>
            </div>
            <div className={classes.root} />

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={currentTerm.length>0?currentTerm:'Search...'}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={(e) => {
                      if (e.key==='Enter'){
                         handler(e);
                      }
                }}
                onChange={handleChange}
                readOnly={ ro }
                value={ term }
              />
            </div>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={()=>handleClose(6)} {...(currentType===6 ? {selected:true} : {})}>Ofertas</MenuItem>
                <MenuItem onClick={()=>handleClose(17)} {...(currentType===17 ? {selected:true} : {})}>Promociones</MenuItem>
                <MenuItem onClick={()=>handleClose(7)} {...(currentType===7 ? {selected:true} : {})}>Remates</MenuItem>
                <MenuItem onClick={()=>handleClose(8)} {...(currentType===8 ? {selected:true} : {})}>Concursos</MenuItem>
                <MenuItem onClick={()=>handleClose(9)} {...(currentType===9 ? {selected:true} : {})}>Eventos</MenuItem>
                <MenuItem onClick={()=>handleClose(2)} {...(currentType===2 ? {selected:true} : {})}>Terrenos</MenuItem>
                <MenuItem onClick={()=>handleClose(3)} {...(currentType===3 ? {selected:true} : {})}>Inmuebles</MenuItem>
                <MenuItem onClick={()=>handleClose(5)} {...(currentType===5 ? {selected:true} : {})}>Productos</MenuItem>
                <MenuItem onClick={()=>handleClose(1)} {...(currentType===1 ? {selected:true} : {})}>Locales</MenuItem>
                <MenuItem onClick={()=>handleClose(10)} {...(currentType===10 ? {selected:true} : {})}>Museos</MenuItem>
                <MenuItem onClick={()=>handleClose(11)} {...(currentType===11 ? {selected:true} : {})}>Templos</MenuItem>
                <MenuItem onClick={()=>handleClose(12)} {...(currentType===12 ? {selected:true} : {})}>Parques</MenuItem>
                <MenuItem onClick={()=>handleClose(13)} {...(currentType===13 ? {selected:true} : {})}>Hoteles</MenuItem>
                <MenuItem onClick={()=>handleClose(14)} {...(currentType===14 ? {selected:true} : {})}>Multitiendas</MenuItem>
                <MenuItem onClick={()=>handleClose(15)} {...(currentType===15 ? {selected:true} : {})}>Teatros</MenuItem>
                <MenuItem onClick={()=>handleClose(16)} {...(currentType===16 ? {selected:true} : {})}>Centros Comerciales</MenuItem>
                
            </Menu>
            
            
            <div className={classes.root} />            

            <div>
              <Link style={{color:'white'}} color="inherit" href="/node/add"><Icon color="inherit" className={s.plus} style={{ fontSize: 40 }} >add_circle</Icon></Link>
            </div>
            

            </Toolbar>
        </AppBar>
        </div>
    );
}
export default withRouter(Page);
