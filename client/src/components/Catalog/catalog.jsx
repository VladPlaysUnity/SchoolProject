import s from './catalog.module.css';
import FictionElem from './../Elems/FictionElem/fictionElem.jsx';
import UserElem from './../Elems/UserElem/userElem.jsx';
import React from 'react'
import { useEffect, useState } from 'react';

const CatalogPage = (props) =>{
  const [elems, setElems] = useState([])
  const [searchline, setSearchline] = useState('')


  useEffect(()=>{
    console.log('here');
    let els = []
    for (let i = 0; i < props.elems.length; i++) {
      if (props.type == 'fiction'){
        if(props.elems[i].info.name.includes(searchline)){
          els.push(props.elems[i])
        }
      } else if (props.type == 'user'){
        if(props.elems[i].usersInfo.name.includes(searchline)){
          els.push(props.elems[i])
        }
      }

    }
    switch (props.type) {
      case 'fiction':
        setElems(els.map((fictionElem)=>{
          return (<FictionElem iD={fictionElem.iD} info={fictionElem.info} type={fictionElem.type}/>)
        }));
        break;
      case 'user':
        setElems(els.map((userElem)=>{
          return (<UserElem iD={userElem.iD} info={userElem.usersInfo}/>)
        }));
        break;
      default:
        break;
    }
  }, [searchline])

  return (
    <div className={s.catalogPage}>
      <div className={s.searchline}>
        <input onChange={(e)=>setSearchline(e.target.value)} placeholder='Type in your search request here...' value={searchline} type="text" />

      </div>
      <div className={s.elemList}>
        {elems}
      </div>
    </div>
  );
}

export default CatalogPage;
