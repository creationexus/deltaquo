import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CategoryIcon from '@material-ui/icons/Category';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Link from '@material-ui/core/Link';
import { Link as Href } from 'react-router-dom';
import ReactGA from 'react-ga';
//import AdComponent from '../googleads';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import useApiRequest from '../../hooks/useApiRequest/';
import { FETCHING, SUCCESS, ERROR } from '../../hooks/useApiRequest/actionTypes';
import s from './style.module.css';
import Image from '../image';
import InfiniteScroll from '../infiniteScroll';
import Map from '../map';
import useApiSearch from '../../hooks/useApiSearch';


const Page = (props) => {
    
    //const [id, setId] = useState(0);
    const [{status,response}, makeRequest] = useApiRequest(`${props.base_url}/node/json/id/${props.match.params.id}`,{verb:"get", params:{}});
    const [o, makeRequest2] = useApiRequest(`${props.base_url}/node/json/owner/${props.match.params.id}`,{verb:"get", params:{}});
    const [o3, makeRequest3] = useApiRequest(`${props.base_url}/node/json/tags/${props.match.params.id}`,{verb:"get", params:{}});
    const [o4, makeRequest4] = useApiRequest(`${props.base_url}/node/json/reviews/${props.match.params.id}`,{verb:"get", params:{}});
    const [l, setL] = React.useState([]);

    const { searchTerm, setType, currentType, currentTerm, setUrl, currentUrl } = useApiSearch();
    const [open, setOpen] = React.useState(false);
    const [img, setImg] = React.useState('');

    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
        padding:20
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      table: {
      },
      card: {
        minWidth: 275,
      },
      link: {
          display:'flex'
      },
      lk:{
        fontWeight:'bolder',
        margin:5,
        borderRadius:'8px',
        padding:'5px',
        fontSize:'0.8em',
        border:'1px solid #285',
        color:'#285',
        fontFamily: '"Titillium Web","Roboto",-apple-system, BlinkMacSystemFont, "Segoe UI","Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        backgroundColor:'white',
        '&:hover':{backgroundColor:'#285',color:'white'}
      },
      cell:{
          display:'block',
          [theme.breakpoints.up('sm')]: {
              display:'table-cell'    
          }
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalpaper: {
        width:'100%',
        height:'100%',
        backgroundPosition: 'center',
        backgroundColor: theme.palette.background.paper,
        backgroundRepeat: 'no-repeat',
        border: '3px solid #0f0',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundSize: 'contain'
      },
      button:{
          marginTop:'10px',
          fontSize:'0.7em'
      }
    }));

    const classes = useStyles();

    const err = e => {
        e.target.style.display='none';
    };

    const toC = number => {
      const formatter = new Intl.NumberFormat("de-DE", {
       
      });
      return formatter.format(number.replace('.0000',''));
    }

    const toYN = s => {
        return s==='0'?'No':'Si';
    }

    const u2d=u=>{
        const months_arr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const date = new Date(u*1000);
        const year = date.getFullYear();
        const month = months_arr[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        return day+' '+month+' '+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }


    const s2l=s=>{
        return (<a href={s} target="_blank" rel="noopener noreferrer">{s}</a>);
    }

    const s2e=s=>{
        return (<a href={"mailto:"+s}>{s}</a>);
    }

    const s2t=s=>{
        return (<a href={"tel:"+s}>{s}</a>);
    }

    const { setTag, currentTag} = useApiSearch();

    const goType = (type) => {
        //setAnchorEl(null);
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

    const handleOpen = (e) => {
        setOpen(true);
        setImg(e.target.src);
        console.log(e.target.src);
    };

    const handleClose = ()=>{
        setOpen(false);
    };

    const handleReview = () => {
        //history.push(`/node/report/price/${props.match.params.id}`);
        // Simulate a mouse click:
        window.location.href = `/node/report/price/${props.match.params.id}`;
    }

    React.useEffect(()=>{
        //object
        try{
            makeRequest().then(function(r){
              document.title = r.data.n.nn + " | DeltaQuo";
              const un = ['i1','i2','i3','i4','i5','i6','a','lat','lon','v'];
              const dl = {'id_n':'Identificador','ode':'Expira en','l':'Web','opn':'Precio normal','u':'Actualizado el','o':'Administrado','lwh':'Horario','t':'Telefono','id_lt':'Tipo Local','tst':'Cantidad','tus':'Unidad de medida','ind':'Dormitorios','io':'Operacion','ip':'Estacionamiento','im':'Modalidad','rd':'Fecha de remate','ef':'Desde el','et':'Hasta el','e':'Correo Electronico','twh':'Horario','lrut':'Rut','ldv':'Digito verificador','ps':'Estado','pst':'Stock','hu':'Ultimo minimo el','pbm':'Minimo anterior','pm':'Minimo actual','pmin':'Mínimo Reciente','pmax':'Máximo Reciente'};
              
              const ll=[]
              for (var prop in r.data.o) {
                    if (Object.prototype.hasOwnProperty.call(r.data.o, prop) && un.indexOf(prop)<0 && r.data.o[prop] !== null) {
                        //console.log(prop+" "+r.data.o[prop]);
                        if(prop==='u')r.data.o[prop]=u2d(r.data.o[prop]);
                        if(prop==='opn')r.data.o[prop]=toC(r.data.o[prop]);
                        if(prop==='ode')r.data.o[prop]=u2d(r.data.o[prop]);
                        if(prop==='l')r.data.o[prop]=s2l(r.data.o[prop]);
                        if(prop==='e')r.data.o[prop]=s2e(r.data.o[prop]);
                        if(prop==='t')r.data.o[prop]=s2t(r.data.o[prop]);
                        if(prop==='hu')r.data.o[prop]=u2d(r.data.o[prop]);
                        if(prop==='pbm')r.data.o[prop]=toC(r.data.o[prop]);
                        if(prop==='pm')r.data.o[prop]=toC(r.data.o[prop]);
                        if(prop==='pmin')r.data.o[prop]=toC(r.data.o[prop]);
                        if(prop==='pmax')r.data.o[prop]=toC(r.data.o[prop]);
                        if(prop==='o')r.data.o[prop]=toYN(r.data.o[prop]);
                        ll.push([dl[prop],r.data.o[prop]]);
                    }
                }
                setL(ll);
                if(r.data.n.id_nt==1) makeRequest2();
                ReactGA.pageview(window.location.pathname + window.location.search);
                (window.adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "ca-pub-3682427172881464"
                });
            });



            return ()=>{};


        }catch(e){
          console.log(e);
        }
    },[]);

    React.useEffect(()=>{
        try{
            //makeRequest2();
            makeRequest3();
            makeRequest4();
            return ()=>{};
        }catch(e){
          console.log(e);
        }
    },[]);

    const { history } = props;

    const handleTag = e => {
        e.preventDefault();
        let tag = e.target.value;
        ReactGA.event({
          category:'Tag',
          action:String(tag)
        });
        setTag(tag);

        let o_url = currentUrl;
        o_url.tag = tag;
        let paramString = new URLSearchParams(o_url)
        
        setUrl(o_url);

        history.push(`/shopping?${paramString.toString()}`);
    }

    return (
        <React.Fragment>
            <div style={{width:'100%', display:status===FETCHING?'block':'none'}}>
              <LinearProgress className="" variant="indeterminate" color="primary" />
            </div>
            <div className={classes.root}>
                 <Grid container className={classes.root} spacing={2} justify="center" alignItems="flex-start"> 
                    <Grid item xs={12} sm={12} md={8} >
                            <div style={{textAlign:'center'}}>
                            <Grid container spacing={2} alignItems="flex-start"> 
                            
                                    {status === SUCCESS && (<>
                                        
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Paper elevation={0} className={classes.paper}>
                                                <Breadcrumbs aria-label="breadcrumb" style={{fontFamily: 'Titillium Web'}} separator={<NavigateNextIcon fontSize="small" />}>
                                                    <Link color="inherit" href="/" className={classes.link}><DashboardIcon className={classes.icon} />Home</Link>
                                                    <Link color="inherit" href="#" onClick={()=>goType(parseInt(response.data.n.id_nt))} className={classes.link}><CategoryIcon className={classes.icon} />{response.data.n.ntn}</Link>
                                                </Breadcrumbs>
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12}>
                                            <Paper className={classes.root}>
                                                <h1 className={s.t}>{response.data.n.nn}</h1>
                                                <h1 className={s.np}>{response.data.n.np > 0 && toC(response.data.n.np)}</h1>
                                                <h1 className={s.np}>{response.data.n.np > 0 && response.data.n.nm}</h1>
                                            </Paper>
                                        </Grid>

                                        
                                                
                                                    {response.data.o.v && (<Grid item xs={12} sm={12} md={12}>
                                            <Paper className={classes.root}><iframe src={response.data.o.v} title="Video" style={{width:'100%'}} width="560" height="315" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></Paper>
                                        </Grid>)}
                                                    
                                                
                                        {response.data.o.i1 && (<Grid item xs={12} sm={12} md={12}>
                                            <Paper className={classes.root}>
                                                
                                                    <div style={{display:'block'}}>
                                                        {response.data.o.i1 && (<Image onClick={handleOpen} src={response.data.o.i1} title="Primera Imagen"></Image>)}
                                                        {response.data.o.i2 && (<Image onClick={handleOpen} src={response.data.o.i2} title="Segunda Imagen"></Image>)}
                                                        {response.data.o.i3 && (<Image onClick={handleOpen} src={response.data.o.i3} title="Cuarta Imagen"></Image>)}
                                                        {response.data.o.i4 && (<Image onClick={handleOpen} src={response.data.o.i4} title="Quinta Imagen"></Image>)}
                                                        {response.data.o.i5 && (<Image onClick={handleOpen} src={response.data.o.i5} title="Sexta Imagen"></Image>)}
                                                        {response.data.o.i6 && (<Image onClick={handleOpen} src={response.data.o.i6} title="Septima Imagen"></Image>)}
                                                    </div>
                                            </Paper>
                                        </Grid>)}
                                        

                                        <Grid item xs={12} sm={12} md={12}>
                                            <Paper className={classes.root}><p className={s.nd}>{response.data.n.nd}</p></Paper>
                                        </Grid>
                                    </>)}
                                    {o3.status === SUCCESS && (
                                        <Grid style={{display:o3.response.data.e.length>0?'block':'none'}} item xs={12} sm={12} md={12}>
                                            <Paper className={classes.root}>
                                                {o3.response.data.e.map((v,k) => <Link to="/shopping" className={classes.lk} key={k} underline="none" color="secondary" component="button" onClick={handleTag} value={v.id_e}>#{v.id_e}</Link>)}
                                            </Paper>
                                        </Grid>
                                    )}
                                    {status === SUCCESS && (<>
                                        <Grid item xs={12} sm={12} md={12}>
                                             <Paper className={classes.root}>
                                                <img onError={err} style={{width:'100%'}} src={`/static/graph/${response.data.n.id_n}.png`} alt="Graph" title="Graph" />
                                                
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow className={s.rr}>
                                                            <TableCell className={classes.cell}></TableCell>
                                                            <TableCell className={classes.cell}></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {l.map((v,k) => (
                                                            <TableRow className={s.rr} key={k}>
                                                                <TableCell className={classes.cell} align="left" component="th" scope="row">
                                                                    <span style={{fontWeight:'bold'}}>{v[0]}</span>
                                                                </TableCell>
                                                                <TableCell className={classes.cell} align="left">{v[1]}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                              </Table>
                                              
                                              
                                            </Paper>
                                        </Grid>

                                        
                                        {response.data.o.lat && response.data.o.lon && response.data.o.a && (<Grid item xs={12} sm={12} md={12}><Paper className={classes.root}><Map lat={response.data.o.lat} lon={response.data.o.lon} a={response.data.o.a}></Map></Paper></Grid>)}
                                        

                                        <Grid item xs={12} sm={12} md={12}>
                                            {<InfiniteScroll search_on={false} base_url={`${props.base_url}`} api={`/node/json/conex`} params={{'to':props.match.params.id}} />}
                                        </Grid>
                                    </>)}
                            
                        
                    </Grid>
                    </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        
                        <ins className='adsbygoogle'
                          style={{ display: 'block' }}
                          data-ad-client='ca-pub-3682427172881464'
                          data-ad-slot='6510124681'
                          data-ad-format='auto'
                          data-full-width-responsive="false" />

                        {o.status === SUCCESS && (
                           <div style={{backgroundColor:'white',textAlign:'center',borderTop:'1px solid #DDD'}}>

                                {o.response.data.n && (<Href to={"/position/"+o.response.data.n.id_n}><img style={{width:'200px',borderRadius:'50%',marginTop:20}} src={o.response.data.n.ni} alt={o.response.data.n.nn} title={o.response.data.n.nn}/></Href>)}
                                {o.response.data.n && (<h2>{o.response.data.n.nn}</h2>)}
                                <div id="conex">
                                    <p className="ztt"></p>
                                
                                    { o.response.data.o && (<Map lat={o.response.data.o.lat} lon={o.response.data.o.lon} a={o.response.data.o.a}></Map>)}

                                    <Card className={classes.card}>
                                        {o.response.data.o && o.response.data.o.lwh && (<><p className={s.t}>Horario</p><p>{o.response.data.o.lwh}</p></>)}

                                        {o.response.data.u && o.response.data.u.ut > 0 && (<><p className={s.t}>Telefono</p><a href={"https://api.whatsapp.com/send?phone="+o.response.data.u.ut}><img alt="wsp" title="wsp" src="https://res.cloudinary.com/cnx/image/upload/v1560698679/wsp.png" style={{width:50}}/></a><br/>{s2t(o.response.data.u.ut)}</>)}
                                        
                                        {o.response.data.o && o.response.data.o.e && (<><p className={s.t}>Correo electronico</p><p>{s2e(o.response.data.o.e)}</p></>)}
                                        
                                        {o.response.data.o && o.response.data.o.l && (<><p className={s.t}>Web</p><p>{s2l(o.response.data.o.l)}</p></>)}
                                        {o.response.data.u && o.response.data.u.id_u !== '18' && (<h2 id="uidn">por {o.response.data.u.uidn}</h2>)}
                                    </Card>
                                </div>
                            </div>
                        )}

                        {o4.status === SUCCESS && (<>
                            <Paper className={classes.root}><h2>Revisiones</h2>
                            {o4.response.data.items.length>0 && (<>
                                {o4.response.data.items.map((row,id) => <Grid key={row.idx} item className={`${s.gni}`} >
                                
                                    <Href to={`/${row.id_n}`} style={{float:'left'}}>
                                        <img className={s.ni} src={row.ni} />
                                    </Href>

                                    <Href to={`/${row.id_n}`} style={{float:'left'}} className={s.dc}>
                                        <span style={{display:'block',fontSize:'0.9em'}}>{row.nn}</span>
                                        <span style={{display:'block',color:'black',fontSize:'0.8em'}}>{u2d(row.rlu)}</span>
                                        <span style={{color:'black'}}>@{row.uidn}</span>
                                    </Href>

                                    <a href={row.l?row.l:`#`} target={row.l?`_blank`:`_self`} rel="noopener noreferrer" style={{float:'left'}} className={s.dv}>
                                        <span className={row.l?s.spp:s.spn}>{row.n} en ${toC(row.rp)}</span>
                                    </a>

                                    <div className={s.do}> 
                                        {row.i&&(<img onClick={handleOpen} className={s.nio} title="Ver revision" src={row.i} />)}
                                    </div>

                                    <div style={{clear:'both'}}></div>
                                    </Grid>)}
                            </>)}
                                
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon/>}
                                onClick={handleReview}
                              >Comparte tu revisi&oacute;n</Button>
                              </Paper>
                        </>)}
                        
                    
                    </Grid>
                </Grid>
            </div>
            
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
              >
                <Fade in={open}>
                  <div onClick={handleClose} className={classes.modalpaper} style={{backgroundImage:`url(${img})`}}></div>
                </Fade>
              </Modal>
        </React.Fragment>
    );
};

export default withRouter(Page);