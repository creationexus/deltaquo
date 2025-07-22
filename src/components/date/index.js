import React from 'react';
const Unix=(props)=>{
	const u2d=u=>{
		const months_arr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
		const date = new Date(u*1000);
		const year = date.getFullYear();
		const month = months_arr[date.getMonth()];
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = "0" + date.getMinutes();
		const seconds = "0" + date.getSeconds();
		return day+' '+month+' '+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}
    return(<p>{u2d(props.unix)}</p>);
};
export default Unix;