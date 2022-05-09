import s from './addFictionPage.module.css'
import React, { useState } from "react";

const AddFictionPage = (props) =>{
  const [form, setForm] = useState({
    photoUrl: "",
    name: "",
    maker: "",
    genre: "",
    date: "",
    description: "",
    type: ""
 });

 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newFiction = { ...form };
    await fetch("http://localhost:5000/fiction/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newFiction),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
  }

  return(
    <div className={s.main}>
    <form className={s.form} onSubmit={onSubmit}>
           <div className={s.form_group}>
              <label htmlFor="photoUrl">Photo url</label>
              <input type="text" className="form-control" value={form.photoUrl} onChange={(e) => updateForm({ photoUrl: e.target.value })} id="photoUrl"/>
           </div>
           <div className={s.form_group}>
             <label htmlFor="name">Name</label>
             <input type="text" className="form-control" value={form.name} onChange={(e) => updateForm({ name: e.target.value })} id="name"/>
           </div>
           <div className={s.form_group}>
             <label htmlFor="maker">Maker</label>
             <input type="text" className="form-control" value={form.maker} onChange={(e) => updateForm({ maker: e.target.value })} id="maker"/>
           </div>
           <div className={s.form_group}>
             <label htmlFor="genre">Genre</label>
             <input type="text" className="form-control" value={form.genre} onChange={(e) => updateForm({ genre: e.target.value })} id="genre"/>
           </div>
           <div className={s.form_group}>
             <label htmlFor="date">Release date</label>
             <input type="text" className="form-control" value={form.date} onChange={(e) => updateForm({ date: e.target.value })} id="date"/>
           </div>
           <div className={s.form_group}>
             <label htmlFor="description">Description</label>
             <input type="text" className="form-control" value={form.description} onChange={(e) => updateForm({ description: e.target.value })} id="description"/>
           </div>
           <div className={s.form_group}>
             <label htmlFor="type">Type</label>
             <input type="text" className="form-control" value={form.type} onChange={(e) => updateForm({ type: e.target.value })} id="type"/>
           </div>
           <div className={s.form_group}>
             <input type="submit" value="Add fiction" className="btn btn-primary"/>
           </div>
      </form>
      <div className={s.photoPlace}><img src={form.photoUrl} /></div>
    </div>
  )
}

export default AddFictionPage;
