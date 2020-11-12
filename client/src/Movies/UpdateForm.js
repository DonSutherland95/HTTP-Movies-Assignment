import React,{useState, useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title:"",
    director: "",
    metascore: "",
    stars:[]
}

export default function UpdateForm(props) {
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();
    const { push } = useHistory();

      useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          // .get(`http://localhost:5000/api/movies/`)
          .then(res => {
            // console.log(res.data)
            // setItem(res.data);
            // setItem({
            //   ...item, title: res.data.title,
            //            director:res.data.director,
            //            metascore:res.data.metascore,
            //            stars:[...res.data.stars]
            // })
            setItem(res.data)

          })
          .catch(err=>{
            console.log(err);
          })
      }, [id]);

    const changeHandler = (e) => {
        e.preventDefault();
        setItem({ ...item, [e.target.name]: e.target.value });
    };
    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
       
        axios
        .put(`http://localhost:5000/api/movies/${id}`, item)
        .then((res)=>{
          // console.log(res)
            props.setMovieList([...props.movieList, res.data]);
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
          value={item.title}
        />
      

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Enter director name"
          value={item.director}
        />
        

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Enter score"
          value={item.metascore}
        />
      

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars name"
          value={item.stars}
        />
    

        <button>Submit</button>
      </form>
    )
}
