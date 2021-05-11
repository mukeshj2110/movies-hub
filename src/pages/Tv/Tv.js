import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Genre from '../../components/Genre'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import useGenre from '../../hooks/useGenre'

const Movies = () => {

    const [content, setContent] = useState([])
    const [page ,setPage] = useState(1)
    const [numOfPages , setNumOfPages] = useState()
    const [genres,setGenres] = useState([]);
    const [selectedgenres,setSelectedgenres] = useState([]);

    const genreforURL = useGenre(selectedgenres);


    const fetchMovie = async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setContent(data.results)
        setNumOfPages(data.total_pages);
        console.log(data)
   
    }

    useEffect(() => {
        window.scroll(0,0)
        fetchMovie();

        // eslint-disable-next-line
    }, [ genreforURL ,page])
    return (
        <div>
        <span className="pageTitle">TV Series</span>
        <Genre type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedgenres={selectedgenres}
        setSelectedgenres={setSelectedgenres}
        setPage={setPage}
        />
        <div className="trending">
        {
            content && content.map((c)=>  <SingleContent  key={c.id} 
            media_type ="tv" date= {c.first_air_date || c.release_date}
            poster ={c.poster_path} title={c.title || c.name} id={c.id}
            vote_average={c.vote_average}
            />)
            // media_type first_air_date poster_path vote_average id name

        }
       </div>
       {numOfPages >1 && (
           <CustomPagination  setPage={setPage} numOfPages={numOfPages}/>
       )}
       
    </div>
    )
}

export default Movies
