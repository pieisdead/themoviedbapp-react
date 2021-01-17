import React from 'react';

const Tabs = (props) => {
    
    return (
        <div className="tabs-nav">
            <ul>
                <li onClick={props.clickHandler} 
                    className={props.current === 'Details' ? 'active' : ''}>Details</li>
                <li onClick={props.clickHandler}
                    className={props.current === 'Cast' ? 'active' : ''}>Cast</li>
                <li onClick={props.clickHandler}
                    className={props.current === 'Video' ? 'active' : ''}>Video</li>
            </ul>
        </div>
    )
}

export default Tabs