import { useContext } from 'react';
import { DeltaContext } from '../../hooks/DeltaContext';

const useApiSearch = () => {
  const [state, setState] = useContext(DeltaContext);

  function searchTerm(term){
  	setState(state => ({ ...state, term: term }));
  }

  function setType(type){
  	setState(state => ({ ...state, type: type }));
  }

  function setTag(tag){
    setState(state => ({ ...state, tag: tag }));
  }

  function setComm(comm){
    setState(state => ({ ...state, comm: comm }));
  }

  function setUrl(url){
    setState(state => ({ ...state, url: url }));
  }

  function setMinPrice(minPrice){
    setState(state => ({ ...state, minPrice: minPrice }));
  }

  return {
    searchTerm,
    setType,
    setTag,
    setComm,
    setUrl,
    setMinPrice,
    currentTerm: state.term !== null && state.term,
    currentType: state.type !== null && state.type,
    currentTag: state.tag !== null && state.tag,
    currentComm: state.comm !== null && state.comm,
    currentUrl: state.url !== null && state.url,
    currentMinPrice: state.minPrice !== null && state.minPrice
  };
};

export default useApiSearch;
