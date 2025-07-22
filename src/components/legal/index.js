import React from 'react';
import styles from './style.module.css';

class Legal extends React.Component{
	/*constructor(props){
    	super(props);
    }*/
	componentDidMount(){
		document.title = "Terminos y condiciones | DeltaQuo"
	}

	render(){
		return(
			<div className={styles.zen}>
				<div className={styles.doc}>
					
					<p>Por el hecho de estar utilizando este sitio, estás aceptando las siguientes condiciones:</p>
					<ol>
						<li>
							<h4>Condiciones generales</h4>
							<ul>
								<li>Las presentes condiciones están relacionadas al sitio web con url deltaquo.com, en adelante 'Deltaquo'.</li>
								<li>DeltaQuo es un producto que pertenece a CreatioNexus E.I.R.L., empresa ubicada en Santiago, Chile.</li>
								<li>DeltaQuo ofrece un servicio de publicación, búsqueda y comparación de elementos.</li>
								<li>DeltaQuo es un medio de difusión y en ningún caso se hace responsable por la disponibilidad o calidad de los artículos aquí publicados.</li>
								<li>DeltaQuo se ajustará a lo que dicten las leyes vigentes.</li>
								<li>DeltaQuo podrá actualizar de forma unilateral y arbitraria las condiciones y términos de uso.</li>
							</ul>
							
						</li>
						<li>
							<h4>Condiciones de uso</h4>
							<ul>
								<li>La información relacionada a los elementos publicados por usuarios registrados debe ser clara, exacta, y fidedigna, además debe contener un vocabulario basado en el respeto mutuo, la moral, y las buenas costumbres. Los usuarios que no cumplan con esto, serán sancionados.</li>
								<li>DeltaQuo podrá hacer uso de cookies para ofrecer un servicio más personalizado.</li>
								<li>DeltaQuo podrá aplicar actualizaciones cuando estime conveniente y/o necesario sobre el sitio web y su contenido de forma unilateral y arbitraria.</li>
								<li>Nos puedes contactar a través del formulario de contacto.</li>
							</ul>
						</li>
					</ol>
				</div>
			</div>
		)
	}
};

export default Legal;