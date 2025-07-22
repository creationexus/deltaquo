import React,{Fragment} from 'react';
import styles from './style.module.css';
import form from '../style.module.css';
import {
  FormControl,
  InputLabel,
  Input,
  TextField
} from "@material-ui/core";

class Price extends React.Component{
	constructor(props){
    	super(props);
    	this.state={value:0};
    }

	//componentDidMount(){
		//document.title = "Terminos y condiciones | DeltaQuo"
	//}
	render(){
		return(
			<FormControl margin="normal" fullWidth>
	            
	            <TextField 
	           		id="price" 
	            	type="number"
	            	label="Precio"
	            	value={this.state.value}
			        onChange={(e) => this.setState({value: e.currentTarget.value})} 
			        maxLength="11"
			        placeholder="Ej: $9990"
			        required
			        margin="normal"/>
          </FormControl>
		)
	}
};

export default Price;