import s from './catalog.module.css';
import CatalogPage from './catalog.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllBooks, getAllFilms, getFictionById } from './../../DataBase/Fictions.js'
import { getAllUsers, getUserById } from './../../DataBase/Users.js'


const CatalogPageContainer = (props) =>{
  const [elems, setElems] = useState([]);
  const [type, setType] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let params = useParams()

  useEffect(()=>{
    setIsLoaded(false)
    setElems([])
    switch (params.type) {
      case 'allBooks':
        setType('book')
        getAllBooks()
        .then((result)=>{
            setIsLoaded(true);
            setElems(result)
        })
        break;

      case 'allFilms':
        setType('film')
          getAllFilms()
          .then((result)=>{
              setIsLoaded(true);
              setElems(result)
          })
          break;

      case 'allUsers':
      setType('user')
        getAllUsers()
        .then((result)=>{
          setIsLoaded(true);
          setElems(result)
        })
        break;

      case 'read_books':
      setType('book')
        getUserById(params.userID)
        .then((user)=>{
          let rb = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if ((user.markedFictions[i].type == 'book')&&(user.markedFictions[i].status == 'completed')){
              f = getFictionById(user.markedFictions[i])
              .then((fic)=>{
                rb.push(fic)
              })
            }
          }
          Promise.all(rb)
          .then((d)=>{
            setElems(d)
            setIsLoaded(true)
          })
        })
        break;

      case 'planned_books':
      setType('book')
        getUserById(params.userID)
        .then((user)=>{
          let pb = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if ((user.markedFictions[i].type == 'book')&&(user.markedFictions[i].status == 'planned')){
              f = getFictionById(user.markedFictions[i])
              .then((fic)=>{
                pb.push(fic)
              })
            }
          }
          Promise.all(pb)
          .then((d)=>{
            setElems(d)
            setIsLoaded(true)
          })
        })
        break;

      case 'watched_films':
      setType('film')
        getUserById(params.userID)
        .then((user)=>{
          let wf = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if ((user.markedFictions[i].type == 'film')&&(user.markedFictions[i].status == 'completed')){
              f = getFictionById(user.markedFictions[i])
              .then((fic)=>{
                wf.push(fic)
              })
            }
          }
          Promise.all(wf)
          .then((d)=>{
            setElems(d)
            setIsLoaded(true)
          })
        })
        break;

      case 'planned_films':
      setType('film')
        getUserById(params.userID)
        .then((user)=>{
          let pf = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if ((user.markedFictions[i].type == 'film')&&(user.markedFictions[i].status == 'planned')){
              f = getFictionById(user.markedFictions[i])
              .then((fic)=>{
                pf.push(fic)
              })
            }
          }
          Promise.all(pf)
          .then((d)=>{
            setElems(d)
            setIsLoaded(true)
          })
        })
        break;

      default:
        setElems([])
    }
  }, [params])


  if(error){
    return <div>Error: {error.message}</div>
  } else if(!isLoaded){
    return (
      <div>
        Loading...
      </div>
      );
  } else if(isLoaded){
    return (
      <div>
        <CatalogPage type={type} elems={elems} />
      </div>
      );
  }
}

export default CatalogPageContainer;
