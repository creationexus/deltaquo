import React from 'react';
import styles from './style.module.css';
import Name from './name';
import Address from './address';
import Description from './description';
import Price from './price';
import Image from './image';
import Currency from './currency';
//import Footer from './footer';
import Locality from './locality';
import Place from './place';
import Owner from './isowner';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Form extends React.Component{
	constructor(props){
    	super(props);
    	this.comm=[
			{value: '375',label: 'Santiago',},
		];
		this.places=[
			{value: '123',label: 'Lider Maipu',},
		];
    }
	componentDidMount(){
		document.title = "Crear un nuevo nodo | DeltaQuo"
	}

	handleSubmit(e){
		e.preventDefault();
	}

	handleChange(e){

	}

	onClickHandler(e){
		const form=document.getElementById("form");
		//console.log(this.props.url);
		form.action="https://cnx.com/node/add";
		form.submit();
	}
	
	render(){
		return(
			<form id="form" method="POST" encType="application/x-www-form-urlencoded" onSubmit={this.handleSubmit} onChange={this.handleChange}>
				<Name />
				<Description />
				<Image id={1}/>
				<Image id={2}/>
				<Image id={3}/>
				<Price />
				<Currency />
				<Locality l={this.comm}/>
				<Address />
				<Place l={this.places}/>
				<Owner/>
				<Button variant="contained" color="primary" onClick={this.onClickHandler}>
			        Enviar
			        <Icon>send</Icon>
			    </Button>
			</form>
		)
	}
};

export default Form;