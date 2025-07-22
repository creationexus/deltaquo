import React,{Fragment} from 'react';
import styles from './style.module.css';
import form from '../style.module.css';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";

class Address extends React.Component{
	constructor(props){
    	super(props);
    	this.state={value:''};
    }
	//componentDidMount(){
		//document.title = "Terminos y condiciones | DeltaQuo"
	//}
	render(){
		return(
			<FormControl margin="normal" fullWidth>
				<input type="hidden" name="lat" />
				<input type="hidden" name="lon" />
	            <InputLabel htmlFor="address">Direcci&oacute;n</InputLabel>
	            <Input 
	           		id="address" 
	            	type="text" 
	            	value={this.state.value}
			        onChange={(e)=>this.setState({value:e.currentTarget.value})} 
			        maxLength="40"
			        placeholder="Ej.: Av Delta 001"
			        required/>
        	</FormControl>
		)
	}
};

export default Address;