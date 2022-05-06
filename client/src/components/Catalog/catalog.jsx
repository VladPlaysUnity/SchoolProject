import s from './catalog.module.css';
import {getOverallRatingOfFiction} from './../../DataBase/Fictions.js'
import FictionElem from './../Elems/FictionElem/fictionElem.jsx';
import UserElem from './../Elems/UserElem/userElem.jsx';

const CatalogPage = (props) =>{

  let elems = []
  switch (props.type) {
    case 'book':
      elems = props.elems.map((bookElem)=>{
        return (<FictionElem id={bookElem.id} info={bookElem.info} overallRating={getOverallRatingOfFiction(bookElem.id)} type={props.type}/>)
      });
      break;
    case 'film':
      elems = props.elems.map((filmElem)=>{
        return (<FictionElem id={filmElem.id} info={filmElem.info} overallRating={getOverallRatingOfFiction(filmElem.id)}type={props.type}/>)
      });
      break;
    case 'user':
      elems = props.elems.map((userElem)=>{
        return (<UserElem id={userElem.id} info={userElem.usersInfo}/>)
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
