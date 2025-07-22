import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppBar from '../appBar';
import Footer from '../footer';

const LayoutDefault = (props) => (
	<Fragment>
	   {props.appBarOn && <AppBar {...props} />}
	      <div>
	      	<Route {...props}/>
	      	{props.footerOn && <Footer {...props}/>}
	      </div>
	</Fragment>
);

export default LayoutDefault;
