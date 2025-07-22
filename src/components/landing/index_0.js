import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Link from '@material-ui/core/Link';
import Elements from './elements.js';
import Title from './title.js';
import s from './style.module.css';
import NodeIDX from '../node/NodeIDX.js';
import useApiRequest from '../../hooks/useApiRequest/';
import { FETCHING, SUCCESS, ERROR } from '../../hooks/useApiRequest/actionTypes';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {Divider, Grid, Typography} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const Landing = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [{ status, response }, makeRequest] = useApiRequest(`${props.base_url}/node/json/list/1?nn=&nt=6&ht=&id_c=&mp=0`);
  const [o, makeRequest2] = useApiRequest(`${props.base_url}/node/json/list/1?nn=&nt=12&ht=&id_c=&mp=0`);
  const ArrowLeft = Arrow({ text: '<', className: s.scrollmenuarrow });
  const ArrowRight = Arrow({ text: '>', className: s.scrollmenuarrow });
  let list = '';
  React.useEffect(() => {
    makeRequest();
    makeRequest2();
    //menuItems = Menu(list, selected);
    },[]);
  
  return (<> 
    {(status === ERROR || o.status === ERROR) && (
      <div className="api-request__error-container">
        <br />
        <div className="api-request__error-response">
          {JSON.stringify(response)}
        </div>
      </div>
    )}
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Title>Ofertas</Title>
                {status === SUCCESS && (
                  <ScrollMenu
                    alignCenter={true}
                    data={response.data.items.map(el => {
                      const {id_n,nn,np,nm,nud,ni,ntn,id_nt,cn,id_c} = el;
                      return <NodeIDX history={props.history} title={nn} comm={cn} comm_id={id_c} price={np} money={nm} image={ni} update={nud} desc="desc" key={id_n} id={id_n} type={ntn} type_id={id_nt}/>;
                    })
                    }
                    dragging={true}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    hideArrows={true}
                    hideSingleArrow={true}
                    transition={+0.5}
                    wheel={false}
                  />)}
              <div className={classes.seeMore}>
                <Link color="primary" href='/shopping?type=6'>
                  Ver m&aacute;s
                </Link>
              </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
                <Elements title='Revisiones por personas' rows={[{id:228,name:'Aceite Merkat 900ml',amount:'12 x 13.800'}]} more='/shopping'/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
                <Elements title='Revisiones por bots' rows={[{id:63019,name:'Consola Soundcraft Signature 16',amount:'1 x 560.000'}]} more='/shopping'/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper className={classes.paper}>
                <Elements title='Elementos m&aacute;s cotizados' rows={[{id:10894,name:'Aceite Merkat 5 litros',amount:'6.430 CLP'}]} more='/shopping?type=5'/>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <Title>Lugares Destacados</Title>
                {o.status === SUCCESS && (
                  <ScrollMenu
                    alignCenter={true}
                    data={o.response.data.items.map(el => {
                      const {id_n,nn,np,nm,nud,ni,ntn,id_nt,cn,id_c} = el;
                      return <NodeIDX history={props.history} title={nn} comm={cn} comm_id={id_c} price={0} money={nm} image={ni} update={nud} desc="desc" key={id_n} id={id_n} type={ntn} type_id={id_nt}/>;
                    })
                    }
                    dragging={true}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    hideArrows={true}
                    hideSingleArrow={true}
                    transition={+0.5}
                    wheel={false}
                  />)}
              <div className={classes.seeMore}>
                <Link color="primary" href='/shopping?type=12'>
                  Ver m&aacute;s
                </Link>
              </div>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </main>
  </>);
}

export default Landing;