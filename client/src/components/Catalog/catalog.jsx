import s from './catalog.module.css';
import {getOverallRatingOfFiction} from './../../DataBase/Fictions.js'
import FictionElem from './../Elems/FictionElem/fictionElem.jsx';
import UserElem from './../Elems/UserElem/userElem.jsx';

const CatalogPage = (props) =>{

  let elems = []
  switch (props.type) {
    case 'book':
      elems = props.elems.map((bookElem)=>{
        return (<FictionElem iD={bookElem.iD} info={bookElem.info} overallRating={getOverallRatingOfFiction(bookElem.iD)} type={props.type}/>)
      });
      break;
    case 'film':
      elems = props.elems.map((filmElem)=>{
        return (<FictionElem iD={filmElem.iD} info={filmElem.info} overallRating={getOverallRatingOfFiction(filmElem.iD)}type={props.type}/>)
      });
      break;
    case 'user':
      elems = props.elems.map((userElem)=>{
        return (<UserElem id={userElem.iD} info={userElem.usersInfo}/>)
      });
      break;
    default:
      break;
  }

  return (
    <div className={s.catalogPage}>
      <div className={s.searchline}>
        <input type="text" />
        <button>Search</button>
      </div>
      <div className={s.elemList}>
        {elems}
      </div>
    </div>
  );
}

export default CatalogPage;
