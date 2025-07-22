import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { useLocation, withRouter } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import NodeDQ from '../node/NodeDQ';
import useApiRequest from '../../hooks/useApiRequest/';
import { FETCHING, SUCCESS, ERROR } from '../../hooks/useApiRequest/actionTypes';
import useApiSearch from "../../hooks/useApiSearch";
import s from "./style.module.css";



const InfiniteScroll = (props) => {

  const { history } = props;

  let xx = 0;
  let currentObj = {};

  const [page, setPage] = useState({a:1,b:1});
  const [maxPage, setMaxPage] = useState(1);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const { currentTerm, currentType, currentTag, currentMinPrice, setTag, setType, searchTerm, currentUrl, setUrl, setComm, currentComm } = useApiSearch();

  const [{ status, response }, makeRequest] = useApiRequest(`${props.base_url}${props.api}/${page.a}`,{verb:"get", params:{nn:`${currentTerm}`, nt:`${currentType}`, ht:`${currentTag}`, id_c:`${currentComm}`, mp:`${currentMinPrice}`, ...props.params}});
  const [res, setRes] = useState([]);
  const myList=React.createRef();
  const [bb,setBB]=useState(false);

  const loadMoreElements = () => {
    setPage((page)=>{return {a:page.a+1,b:1}})
  }

  const resetElements = () => {
    setPage((page)=>{return {a:1,b:page.b+1}})
    setRes([]);
    setMaxPage(1);
  }

  const resetScrollEffect =  element  => {
    element.current.scrollTop = 0
  }

  const location = useLocation();
  
  React.useEffect(()=>{
      try{
          resetElements();
          resetScrollEffect(myList);
          
          xx++;
          
        return () => {
          //console.log('will unmount');
        };
      }catch(e){
        console.log(e);
      }
    },[currentTerm,currentType,currentTag,currentComm,currentMinPrice]); //--> final debe quedar solo location , cada vez que se agregue un filtro sera modificando la url

    React.useEffect(() => {
      try{
        //console.log("3",xx);
        if(xx==0){
          
          if(page.a>1){
            if(page.a<=maxPage){
              makeRequest()
              .then(function(r){
                setRes(res.concat(r.data.items))
                setMaxPage(r.data.total_pages);
                setBB(false);
              });

               
            }
          }else{
            if(page.a<=maxPage){
            makeRequest()
              .then(function(r){
                setRes(r.data.items)
                setMaxPage(r.data.total_pages);
                setBB(false);
              });
            }
          }
        }else{
          xx++;
        }
        //setPage(1);
        //setRes([]);
        //console.log("type"+currentType)
        return ()=>{
          //console.log('will unmount');
        };
      }catch(e){
        console.log(e);
      }
    },[page]);

    React.useEffect(() => {
      updateWindowDimensions();
      window.addEventListener('resize',()=>{updateWindowDimensions();});
      
    },[]);

    const updateWindowDimensions = () => {
        setW(window.innerWidth);
        setH(window.innerHeight);
    }

    const handleScroll = e => {
        const o=e.target;
        const isBottom=o.scrollHeight<=o.scrollTop+o.clientHeight+300;
        if(isBottom){
            if(!bb){
              
              setBB(true);
              loadMoreElements();
              
              /*setState(
                { bb: true },
                () => loadMoreElements()
              );*/
              
            }
        }
    }

    return (
        <>
        {status === ERROR && (
            <div className="api-request__error-container">
              <br />
              <div className="api-request__error-response">
                {JSON.stringify(response)}
              </div>
            </div>
          )}
          
        <div style={{width:'100%', display:status===FETCHING?'block':'none'}}>
          <LinearProgress className="" variant="indeterminate" color="primary" />
        </div>
        {props.search_on && status === SUCCESS && maxPage === 0 && currentTerm.length>0 && (
            <p style={{padding:20}}>No es posible establecer comunicación con el objeto buscado, si deseas puedes seguir tu exploración <a href="/shopping">aquí</a></p>
          )}
        <div ref={myList} className={s.ls} style={{height:(h-64)+'px',display:res.length>0?'block':'none'}} onScroll={handleScroll} >
           <div>
              <Grid container spacing={0} justify="flex-start" alignItems="center" direction="row">
                  {res.map(row => <Grid key={row.id_n} item xs={12} sm={6} md={6} lg={4} style={{padding:2}} ><NodeDQ history={history} title={row.nn} comm={row.cn} comm_id={row.id_c} price={row.np} money={row.nm} image={row.ni} update={row.nud} desc="desc" key={row.id_n} id={row.id_n} type={row.ntn} type_id={row.id_nt}/></Grid>)}
              </Grid>
           </div>
          
        </div>
        
        </>
      );
    };
    export default withRouter(InfiniteScroll);