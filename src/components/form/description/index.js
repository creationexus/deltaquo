import React,{Fragment} from 'react';
import styles from './style.module.css';
import form from '../style.module.css';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  FormHelperText
} from "@material-ui/core";

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class Description extends React.Component{
	constructor(props){
    	super(props);
    }
	//componentDidMount(){
		//document.title = "Terminos y condiciones | DeltaQuo"
	//}
	render(){
		return(
			<FormControl margin="normal" fullWidth>
				<TextareaAutosize id="desc" rows={10} name="desc" maxLength="1000" placeholder="Descripción del aviso"></TextareaAutosize>
				<FormHelperText id="my-helper-text">*Agrega la mayor cantidad de detalles en un m&aacute;ximo de 1.000 caracteres.</FormHelperText>
			</FormControl>
		)
	}
};

export default Description;