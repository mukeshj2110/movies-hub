import { Button, createMuiTheme , Tab, Tabs, ThemeProvider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search = () => {

    const [type , setType]=useState(0);
    const [page , setPage] = useState(1);
    const [content , setContent] = useState([]);
    const [numOfPages , setNumOfPages] = useState();
    const [searchText ,setSearchText] = useState("");
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
        },
        primary: {
            main: "#fff",
        }
    });

    const fetchSearch = async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0,0);
        fetchSearch();

    }, [page,type])
    
    return (
        <div> 
        <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex" , margin: "15px 0"}} >
            
            <TextField 
            style={{flex: 1 }}
            className="searchbox"
            label="Search"
            variant="filled"
            onChange={(e)=>setSearchText(e.target.value)}
            />
            <Button variant="contained" style={{marginLeft: 10}} 
            onClick={fetchSearch()}
            > <SearchIcon /> </Button>
        </div>
            <Tabs value={type}indicatorColor="primary" textColor="primary"
           onChange={(e, newValue)=>{
                setType(newValue);
                setPage(1);
            }}
            >
                <Tab style={{width: "50%"}} label="Search Movies"></Tab>
                <Tab style={{width: "50%"}} label="Search TV Series"></Tab>
            </Tabs>
        </ThemeProvider>
        <div className="trending">
        {
            content && content.map((c)=>  <SingleContent  key={c.id} 
            media_type ={type ? "tv":"movie"} date= {c.first_air_date || c.release_date}
            poster ={c.poster_path} title={c.title || c.name} id={c.id}
            vote_average={c.vote_average}
            />)
            // media_type first_air_date poster_path vote_average id name

        }
        {searchText && !content &&
            (type ? <h2>No Series found</h2>: <h2>No Movie Found</h2>)        
        }
       </div>
       {numOfPages >1 && (
           <CustomPagination  setPage={setPage} numOfPages={numOfPages}/>
       )}
        </div>
    )
}

export default Search
