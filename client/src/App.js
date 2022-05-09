import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ConstantMenu from './components/ConstantMenu/constantMenu.jsx';
import RegistrationPageContainer from './components/RegistrationPage/registrationPageContainer.jsx'
import ProfilePagesContainer from './components/ProfilePage/profilePagesContainer.jsx'
import CatalogPage from './components/Catalog/catalog.jsx'
import ChosenFictionContainer from './components/ChosenFiction/chosenFictionContainer.jsx'
import AddFictionPage from './components/AddFictionPage/addFictionPage.jsx'
import {getAllFilms, getAllBooks} from './DataBase/Fictions.js'
import {getAllUsers} from './DataBase/Users.js'
import {getLoggedInStatus} from './LocalInfo/localInfo.js'
import {useState, useEffect} from 'react'

const App = (props) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let registration = <RegistrationPageContainer dispatch={props.dispatch}/>

  useEffect(()=>{
    let filmsPromise = getAllFilms()
    let booksPromise = getAllBooks()
    let usersPromise = getAllFilms()

    Promise.all([filmsPromise, booksPromise, usersPromise])
    .then((result)=>{
      setIsLoaded(true);
      setItems(result)
    })

  }, [])

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
            <ProfilePagesContainer dispatch={props.dispatch}/>
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
              <Route path='/registration' element={registration}/>
              <Route path='/addFiction' element={<AddFictionPage/>}/>
              <Route path='/filmCatalog' element={<CatalogPage type='film' elems={items[0]}/>}/>
              <Route path='/bookCatalog' element={<CatalogPage type='book' elems={items[1]}/>}/>
              <Route path='/userCatalog' element={<CatalogPage type='film' elems={items[2]}/>}/>
              <Route path='/fiction/:iD' element={<ChosenFictionContainer/>}/>
            </Routes>
            <ProfilePagesContainer dispatch={props.dispatch}/>
            </div>
          </div>
        </Router>
      );
  }

}

export default App;
