import React from 'react';
import s from './style.module.css';

const Image = (props) => {
	return (
		<div className={s.apr} style={{backgroundImage:`url(${props.src})`}}>
			<div style={{backgroundColor: 'rgba(255,255,255,0.8)'}}>
			<img onClick={props.onClick} className={s.pr} src={props.src} alt={props.title} title={props.title} />
			</div>
		</div>
	);
}

export default Image;