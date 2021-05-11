import axios from 'axios'
import React , {useEffect, useState} from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import './trending.css'

const Trending = () => {
    const [content, setContent] = useState([])
    const [page , setPage] = useState(1);

    const fetchTrending = async ()=>{

      const {data} =  await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
      console.log(data);  
      setContent(data.results);
    }

    

    useEffect(() => {
        window.scroll(0,0);
        fetchTrending();
      // eslint-disable-next-line
    },[page])
    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
            {
                content && content.map((c)=>  <SingleContent  key={c.id} 
                media_type ={c.media_type} date= {c.first_air_date || c.release_date}
                poster ={c.poster_path} title={c.title || c.name} id={c.id}
                vote_average={c.vote_average}
                />)
                // media_type first_air_date poster_path vote_average id name

            }
           </div>
           <CustomPagination  setPage={setPage} />
        </div>
    )
}

export default Trending;
