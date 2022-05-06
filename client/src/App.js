import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ConstantMenu from './components/ConstantMenu/constantMenu.jsx';
import RegistrationPageContainer from './components/RegistrationPage/registrationPageContainer.jsx'
import ProfilePagesContainer from './components/ProfilePage/profilePagesContainer.jsx'
import CatalogPage from './components/Catalog/catalog.jsx'
import ChosenFictionsContainer from './components/ChosenFiction/chosenFictionsContainer.jsx'
import {getAllBooks, getAllFilms} from './DataBase/Fictions.js'
import {getAllUsers} from './DataBase/Users.js'
import {getLoggedInStatus} from './LocalInfo/localInfo.js'

const App = (props) => {

  let registration = <RegistrationPageContainer dispatch={props.dispatch}/>

  return (
    <Router>
      <div className="App">
        <ConstantMenu />
        <div className="app-wrapper-content">
          <Routes>
            <Route path='/registration' element={registration}/>
            <Route path='/filmCatalog' element={<CatalogPage type='film' elems={getAllFilms()}/>}/>
            <Route path='/bookCatalog' element={<CatalogPage type='book' elems={getAllBooks()}/>}/>
            <Route path='/userCatalog' element={<CatalogPage type='user' elems={getAllUsers()}/>}/>
          </Routes>
          <ProfilePagesContainer dispatch={props.dispatch}/>
          <ChosenFictionsContainer dispatch={props.dispatch}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
