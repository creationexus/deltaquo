import React,{Fragment} from 'react';
import style from './style.module.css';
import form from '../style.module.css';
import axios from 'axios';
import { API_URL } from '../config';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Box
} from "@material-ui/core";

class Image extends React.Component{
	constructor(props){
    	super(props);
    	this.state={
	    	selectedFile: null,
       		loaded:0
	    }
    }
	//componentDidMount(){
		//document.title = "Terminos y condiciones | DeltaQuo"
	//}
	onChangeHandler=event=>{
		let e=event.target; // create file object
		if(e.files.length == 1){
			this.setState({
		    	selectedFile:e.files[0],
		    	loaded:0,
		    });
		    const data = new FormData()
			data.append('image',e.files[0])
			axios.post(`${API_URL}/node/addImageID`,data,{
				 onUploadProgress: ProgressEvent => {
		         this.setState({
		           loaded:(ProgressEvent.loaded/ProgressEvent.total*100),
		       })
		   	},	
		  	}).then(res => {
		  		if(res.status==200){
		  			let d=res.data;
		  			document.getElementById(`url_${this.props.id}`).value=d;
		  			document.getElementById(`dimg_${this.props.id}`).style.backgroundImage=`url(${d})`;
		  		}
			});
		}
	}
	onClickHandler=()=>{
		document.getElementById(`img_${this.props.id}`).click();
	}
	//<div id="mi" className={`${style.i} ${form.formInput}`}><span>Imagen Principal</span></div>
	render(){
		return(
			<Box margin="normal" id={`dimg_${this.props.id}`} className={style.i} onClick={this.onClickHandler}>
				<input id={`img_${this.props.id}`} type="file" onChange={this.onChangeHandler} className={style.hide} />
				<span>{this.state.loaded}</span>
				<input type="text" id={`url_${this.props.id}`} maxLength="100" className={style.hide}/>
			</Box>
		)
	}
};

export default Image;