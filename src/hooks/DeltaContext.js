import React, { useState } from 'react';

const DeltaContext = React.createContext([{}, () => {}]);

const DeltaProvider = (props) => {
	
	const [state, setState] = useState({ term: '', type: '', tag: '',url: {}, comm: '', minPrice: 0 });

	return (
	<DeltaContext.Provider value={[state, setState]}>
	  {props.children}
	</DeltaContext.Provider>
	);
}

export { DeltaContext, DeltaProvider };