import React from 'react'
import './header.css'

const Header = () => {
    return (
        <div className="header">
            <span className="title" onClick={()=>window.scroll(0,0)}> 🎥 Movies & TV Series Hub🎬</span>
        </div>
    )
}

export default Header
