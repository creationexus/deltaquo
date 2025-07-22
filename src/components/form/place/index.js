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

class Place extends React.Component{

	constructor(props){
    	super(props);
    	this.state={value:''};
    }
	
	render(){
		
		return(
			<FormControl margin="normal" fullWidth>
				<TextField
			        select
			        label="Lugar"
			        value={this.state.value}
			        onChange={(e)=>this.setState({value:e.target.value})} 
			        helperText="Selecciona el lugar"
			        margin="normal"
			      >
			        {this.props.l.map(option => (
			          <MenuItem key={option.value} value={option.value}>
			            {option.label}
			          </MenuItem>
			        ))}
			      </TextField>
			</FormControl>
		)
	}
};

export default Place;