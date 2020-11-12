import React,{useState} from 'react'
import {  useHistory } from "react-router-dom";
import axios from "axios";


const initialForm={
    title:"",
    director: "",
    metascore: "",
    stars:[]
}
export default function AddMovie() {
    const [formValues, setFormValues] = useState(initialForm);
    const { push } = useHistory();

    const changeHandler = (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();
         const newMovie = {
            ...formValues,
            stars: formValues.stars.split(","),
         };
        //  console.log(newMovie)
       
        axios
        .post(`http://localhost:5000/api/movies`, newMovie)
        .then((res)=>{
          console.log(res)
            // props.setMovieList([...props.movieList, res.data]);
            push(`/`);
        })
        .catch(err=>{
            console.log(err);
        });
  };
    return (
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Enter title"
          value={formValues.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Enter director name"
          value={formValues.director}
        />
        
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Enter score"
          value={formValues.metascore}
        />
      
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars name"
          value={formValues.stars}
        />
    
        <button>Submit</button>
      </form>
    )
}
