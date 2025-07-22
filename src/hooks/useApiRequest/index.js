import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { initialState } from "./reducer";
import { fetching, success, error } from "./actionCreators";

const useApiRequest = (endpoint, { verb = "get", params = {} } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  /*useEffect(() => {
    //makeRequest();
    return () => {
        //source.cancel('Effect cleared');
    }
  }, [endpoint,params]);*/


  const makeRequest = async () => {
    dispatch(fetching());
    try {
      const response = await axios[verb](endpoint, {params});
      dispatch(success(response));
      return response;
    } catch (e) {
      dispatch(error(e));
    }
  };

  //el retorno de state no esta suscrita a dispatcher, por lo que se envia null la primera vez ya que el dispatch de axios es asincronico
  return [state, makeRequest];
};

export default useApiRequest;