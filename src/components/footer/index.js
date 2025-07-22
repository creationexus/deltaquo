import React,{Fragment} from 'react';
import {Grid,Toolbar,Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

import s from './style.module.css';

const Footer = (props) => {


	return (<Grid container spacing={0} justify="center" alignItems="flex-start" className={s.f}> 
    	<Grid item xs={12} sm={4} md={4} className={s.rec}>
			<a href="/node/add" className={s.ll}>Publica tu producto</a>
    	</Grid>

    	<Grid item xs={12} sm={4} md={4} className={s.rec}>
			<Link className={s.ll} to="/legal">Legal</Link>
			<a href="/index/stats" className={s.ll}>Indicadores</a>
    	</Grid>

    	<Grid item xs={12} sm={4} md={4} className={s.rec}>
			<a href="/about/we" className={s.ll}>Quienes somos</a>
			<a href="/kb/tree" className={s.ll}>Que hacemos</a>
			<a href="http://www.ora300.cl/" target="_blank" className={s.ll}>ORA-300</a>
			<p>
			<a href="https://www.instagram.com/deltaqu0" target="_blank"><InstagramIcon color="action"></InstagramIcon></a>
			<a href="https://www.facebook.com/creationexus" target="_blank"><FacebookIcon color="action"></FacebookIcon></a>
			<a href="https://twitter.com/creationexus" target="_blank"><TwitterIcon color="action"></TwitterIcon></a>
			<a href="https://github.com/creationexus" target="_blank"><GitHubIcon color="action"></GitHubIcon></a>
			</p>
		</Grid>

    	<Grid style={{textAlign:'center'}} item xs={12} sm={12} md={12}>
    		<p>
				<img src={`${props.base_url}/static/dqz.png`} style={{width:'50px',height:'50px'}}/>
    			<span className={s.fl1}>DeltaQuo { props.version }</span>
    			<span className={s.fl2}>CreatioNexus 2021 </span>
    		</p>
    	</Grid>
	</Grid>)
};

export default Footer;