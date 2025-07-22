import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import s from './style.module.css';
const Map = props => {
	return(
		<>
			{props.lat && props.lon && (<><iframe className={s.m} title="Map" width="100%" height="450" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={'https://www.openstreetmap.org/export/embed.html?bbox='+(parseFloat(props.lon)-0.008)+','+(parseFloat(props.lat)-0.008)+','+(parseFloat(props.lon)+0.008)+','+(parseFloat(props.lat)+0.008)+'&layer=mapnik&zoom=1&marker='+(props.lat)+','+props.lon} ></iframe>
			<p className={s.a}><a href={`https://www.google.com/maps/search/?api=1&query=${props.lat},${props.lon}`} target="_blank" title="Ir al mapa"><RoomIcon/> {props.a}<br/>(Click aqu&iacute; para ver como llegar)</a></p></>)}
		</>
	)
};
export default Map;