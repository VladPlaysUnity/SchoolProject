import s from './catalog.module.css';
import CatalogPage from './catalog.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllBooks, getAllFilms, getFictionById } from './../../DataBase/Fictions.js'
import { getAllUsers, getUserById } from './../../DataBase/Users.js'


const CatalogPageContainer = (props) =>{
  const [elems, setElems] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [type, setType] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let catalog = ''
  let params = useParams()

  useEffect(()=>{
    setIsLoaded(false)
    setElems([])
    switch (params.type) {
      case 'allBooks':
        setType('fiction')
        getAllBooks()
        .then((result)=>{
            setIsLoaded(true);
            setAllBooks(result)
        })
        break;

      case 'allFilms':
        setType('fiction')
          getAllFilms()
          .then((result)=>{
              setIsLoaded(true);
              setAllFilms(result)
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
      setType('fiction')
        getUserById(params.userID)
        .then((user)=>{
          let rb = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if (user.markedFictions[i].status == 'completed'){
              f = getFictionById(user.markedFictions[i].fiction_id)
              rb.push(f)
            }
          }
          Promise.all(rb)
          .then((d)=>{
            let k = []
            for (let i = 0; i < d.length; i++) {
              if(d[i].type == 'book'){
                k.push(d[i])
              }
            }
            setElems(k)
            setIsLoaded(true)
          })
        })
        break;

      case 'planned_books':
      setType('fiction')
        getUserById(params.userID)
        .then((user)=>{
          let pb = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if (user.markedFictions[i].status == 'planned'){
              f = getFictionById(user.markedFictions[i].fiction_id)
              pb.push(f)
            }
          }
          Promise.all(pb)
          .then((d)=>{
            let k = []
            for (let i = 0; i < d.length; i++) {
              if(d[i].type == 'book'){
                k.push(d[i])
              }
            }
            setElems(k)
            setIsLoaded(true)
          })
        })
        break;

      case 'watched_films':
      setType('fiction')
        getUserById(params.userID)
        .then((user)=>{
          let wf = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if (user.markedFictions[i].status == 'completed'){
              f = getFictionById(user.markedFictions[i].fiction_id)
              wf.push(f)
            }
          }
          Promise.all(wf)
          .then((d)=>{
            let k = []
            for (let i = 0; i < d.length; i++) {
              if(d[i].type == 'film'){
                k.push(d[i])
              }
            }
            setElems(k)
            setIsLoaded(true)
          })
        })
        break;

      case 'planned_films':
      setType('fiction')
        getUserById(params.userID)
        .then((user)=>{
          let pf = []
          let f = ''
          for (let i = 0; i < user.markedFictions.length; i++){
            if (user.markedFictions[i].status == 'planned'){
              f = getFictionById(user.markedFictions[i].fiction_id)
              pf.push(f)
            }
          }
          Promise.all(pf)
          .then((d)=>{
            let k = []
            for (let i = 0; i < d.length; i++) {
              if(d[i].type == 'film'){
                k.push(d[i])
              }
            }
            setElems(k)
            setIsLoaded(true)
          })
        })
        break;

      default:
        return
    }
  }, [params])

  if (params.type=='allBooks'){
    catalog = <CatalogPage type={type} elems={allBooks} />
  }else if (params.type=='allFilms') {
    catalog = <CatalogPage type={type} elems={allFilms} />
  } else{
    catalog = <CatalogPage type={type} elems={elems} />
  }


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
        {catalog}
      </div>
      );
  }
}

export default CatalogPageContainer;
