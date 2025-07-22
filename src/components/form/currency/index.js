import React,{Fragment} from 'react';
import styles from './style.module.css';
import form from '../style.module.css';
import MenuItem from '@material-ui/core/MenuItem';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

class Currency extends React.Component{

	constructor(props){
    	super(props);
    	this.state={value:''};
		this.currencies = [
			{value: 'CLP',label: 'Peso Chileno (CLP)',},
		  {
		    value: 'UF',
		    label: 'Unidad de fomento (CLF)',
		  },
		  {
		    value: 'USD',
		    label: 'Dolar estadounidense (USD)',
		  }
		];
    }
	
	render(){
		
		return(
			<FormControl margin="normal" fullWidth>
				<TextField
			        select
			        label="Moneda"
			        value={this.state.value}
			        onChange={(e)=>this.setState({value:e.target.value})} 
			        helperText="Selecciona la moneda"
			        margin="normal"
			      >
			        {this.currencies.map(option => (
			          <MenuItem key={option.value} value={option.value}>
			            {option.label}
			          </MenuItem>
			        ))}
			      </TextField>
			</FormControl>
		)
	}
};

export default Currency;