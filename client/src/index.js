import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import store from './redux/reduxStore.js';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
        <App dispatch={store.dispatch.bind(store)}/>
    </React.StrictMode>
  )
};


store.subscribe(()=>{
  rerenderEntireTree(store);
})

rerenderEntireTree(store);

reportWebVitals();
