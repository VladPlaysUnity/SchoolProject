import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ConstantMenu from './components/ConstantMenu/constantMenu.jsx';
import RegistrationPageContainer from './components/RegistrationPage/registrationPageContainer.jsx'
import ProfilePageContainer from './components/ProfilePage/profilePageContainer.jsx'
import CatalogPageContainer from './components/Catalog/catalogPageContainer.jsx'
import ChosenFictionContainer from './components/ChosenFiction/chosenFictionContainer.jsx'
import AddFictionPage from './components/AddFictionPage/addFictionPage.jsx'
import {getAllFilms, getAllBooks} from './DataBase/Fictions.js'
import {getAllUsers} from './DataBase/Users.js'
import {getLoggedInStatus, getLoggedUserId} from './LocalInfo/localInfo.js'
import {useState, useEffect} from 'react'

const App = (props) => {
  const [error, setError] = useState(null);
  const [loggedUser, setLoggedUser] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);

  let registration = <RegistrationPageContainer setLoggedUser={setLoggedUser} dispatch={props.dispatch}/>

  useEffect(()=>{
    console.log(getLoggedUserId())
    setIsLoaded(true)

    console.log('lol');
  }, [loggedUser])

  if(error){
    return <div>Error: {error.message}</div>
  } else if(!isLoaded){
    return (
      <Router>
        <div className="App">
          <ConstantMenu />
          <div className="app-wrapper-content">
            <Routes>
              <Route path='/registration' element={registration}/>
              <Route path='/addFiction' element={<AddFictionPage/>}/>
            </Routes>
            </div>
          </div>
        </Router>
      );
  } else if(isLoaded){
    return (
      <Router>
        <div className="App">
          <ConstantMenu />
          <div className="app-wrapper-content">
            <Routes>
              <Route path='/registration' element={getLoggedInStatus() ? <Navigate to={'/profile/' + getLoggedUserId()}/>:registration}/>
              <Route path='/addFiction' element={<AddFictionPage/>}/>
              <Route exact path='/catalog/:type' element={<CatalogPageContainer/>}/>
              <Route exact path='/user/:userID/:type' element={<CatalogPageContainer/>}/>
              <Route path='/fiction/:iD' element={<ChosenFictionContainer loggedUser={loggedUser} dispatch={props.dispatch}/>}/>
              <Route path='/profile/:iD' element={<ProfilePageContainer loggedUser={loggedUser} dispatch={props.dispatch}/>}/>
            </Routes>
            </div>
          </div>
        </Router>
      );
  }

}

export default App;
