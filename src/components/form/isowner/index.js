import React,{Fragment} from 'react';
import styles from './style.module.css';
import form from '../style.module.css';
import MenuItem from '@material-ui/core/MenuItem';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Select,
  OutlinedInput
} from "@material-ui/core";

class Owner extends React.Component{

	constructor(props){
    	super(props);
    	this.state={value:''};
		this.currencies = [
			{value:'0',label:'Informante',},
			{value:'1',label:'Propietario',},
		];
    }
	
	render(){
		
		return(
			<FormControl margin="normal" fullWidth>
				<TextField
			        select
			        label="Propiedad"
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

export default Owner;