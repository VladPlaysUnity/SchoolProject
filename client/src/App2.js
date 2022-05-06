import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ConstantMenu from './components/ConstantMenu/constantMenu.jsx';
import RegistrationPage from './components/RegistrationPage/registrationPage.jsx'
import ProfilePageContainer from './components/ProfilePage/profilePageContainer.jsx';
import ChosenBook from './components/ChosenBook/chosenBook.jsx';
import ChosenFilm from './components/ChosenFilm/chosenFilm.jsx';
import CatalogPage from './components/Catalog/catalog.jsx'

const App = (props) => {

  let filmLinks = props.state.filmsR.films.map((film)=>{
      let link = '/filmCatalog/' + film.info.name.replace(/\s+/g, '_');
     return (<Route path={link} element={<ChosenFilm info={film.info} loggedUser={props.state.loggedUser} rating={film.overallRating} comments={props.state.commentsR.comments} dispatch={props.dispatch}/>}/>)
   });
  let bookLinks = props.state.booksR.books.map((book)=>{
       let link = '/bookCatalog/' + book.info.name.replace(/\s+/g, '_');
      return (<Route path={link} element={<ChosenBook info={book.info} loggedUser={props.state.loggedUser}  rating={book.overallRating} comments={props.state.commentsR.comments} dispatch={props.dispatch}/>}/>)
    });
  let userLinks = props.state.usersR.users.map((user)=>{
    let link = '/userCatalog/' + user.usersInfo.name.replace(/\s+/g, '_');
   return (<Route path={link} element={<ProfilePageContainer dispatch={props.dispatch} user={props.state.usersR}/>}/>)
  })

  let profile_or_registration = <RegistrationPage dispatch={props.dispatch}/>
  if (props.state.usersR.status == '+'){
    profile_or_registration = <ProfilePageContainer dispatch={props.dispatch} state={props.state}/>
  }


  return (
    <Router>
      <div className="App">
        <ConstantMenu />
        <div className="app-wrapper-content">
          <Routes>
            <Route path='/profile' element={profile_or_registration}/>}/>
            <Route path='/filmCatalog' element={<CatalogPage elem_name='film' elemsList={props.state.filmsR}/>}/>
            <Route path='/bookCatalog' element={<CatalogPage elem_name='book' elemsList={props.state.booksR}/>}/>
            {filmLinks}
            {bookLinks}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
