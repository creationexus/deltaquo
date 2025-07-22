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

class Name extends React.Component{
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
	            <InputLabel htmlFor="name">Name</InputLabel>
	            <Input 
	           		id="name"
	           		name="name"
	            	type="text" 
	            	value={this.state.value}
			        onChange={(e)=>this.setState({value:e.currentTarget.value})} 
			        maxLength="40"
			        placeholder="Ej: Silla mecedora"
			        required/>
        	</FormControl>
		)
	}
};

export default Name;