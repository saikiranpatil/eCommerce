import React from 'react';
import './Loader.css'

const Loader = () => {
    return (
        <div id="preloader">
            <div className="sk-chase">
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
                <div className="sk-chase-dot" />
            </div>
        </div>
    )
}

export default Loader
