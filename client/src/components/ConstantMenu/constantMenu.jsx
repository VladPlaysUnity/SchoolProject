import s from './constantMenu.module.css';
import {NavLink} from "react-router-dom";
import {getLoggedInStatus, getLoggedUserId} from './../../LocalInfo/localInfo.js'

const CostantMenu = () =>{
  let profile_or_registration_link = getLoggedInStatus() ? '/profile/' + getLoggedUserId() : '/registration'
  return (
    <div className={s.menu}>
      <div><NavLink to={profile_or_registration_link} className={ navData => navData.isActive ? s.active : s.item }>Profile</NavLink></div>
      <div><NavLink to="/filmCatalog" className={ navData => navData.isActive ? s.active : s.item }>Film Catalog</NavLink></div>
      <div><NavLink to="/bookCatalog" className={ navData => navData.isActive ? s.active : s.item }>Book Catalog</NavLink></div>
    </div>
  );
}

export default CostantMenu;
