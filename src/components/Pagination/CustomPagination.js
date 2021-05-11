import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React from 'react'

const CustomPagination = ({setPage , numOfPages = 10 }) => {
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
        }
    });
    const handleChange =(page) =>{
        setPage(page);
        window.scroll(0,0);
    }
    return (
        <ThemeProvider theme={darkTheme}>
        <div style={{width: "100%" , display: "flex" , justifyContent: "center" , marginTop: "10px"}}>
            <Pagination count={numOfPages}  hideNextButton hidePrevButton onChange={(e)=>handleChange(e.target.textContent)}/>
        </div>
        </ThemeProvider>
    )
}

export default CustomPagination;