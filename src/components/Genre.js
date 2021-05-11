import { Chip } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect } from 'react'

const Genre = ({genres,setGenres, selectedgenres,setSelectedgenres,setPage ,type}) => {
    
   const handleRemove=(genre) =>{
       setSelectedgenres(selectedgenres.filter((selected)=>selected.id!== genre.id))
       setGenres([...genres,genre])
       setPage(1);
   }
   
    const handleAdd = (genre)=>{
       setSelectedgenres([...selectedgenres,genre])
       setGenres(genres.filter((g)=>g.id!==genre.id));
       setPage(1);
   }
   
   
    const fetchGenres = async() =>{
       const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
       setGenres(data.genres)
      
    };
    console.log(genres);
    useEffect(() => {
        fetchGenres();
        return()=>{
            setGenres({});
        };

        // eslint-disable-next-line
    }, [])
    return (
        <div>
            {
               selectedgenres && 
               selectedgenres.map((genre)=>
               <Chip  label={genre.name} 
               style={{margin: 2}} 
               size="small" clickable
               onDelete={()=>handleRemove(genre)}
               color="primary"
               />)
           }
           {
               genres && 
               genres.map((genre)=>
               <Chip  label={genre.name} 
               style={{margin: "2px"}} 
               key={genre.id}
               size="small"  clickable 
               onClick={()=>handleAdd(genre)}
               />)
           }
        </div>
    )
}

export default Genre
