import React from 'react';

const Pagination = (props) => {
    
    return (
        <ul className="pagination">
            <li onClick={props.clickHandler}>First page</li>
            <li onClick={props.clickHandler}>Prev</li>
            <li>{props.page}</li>
            <li onClick={props.clickHandler}>Next</li>
            <li onClick={props.clickHandler}>Last page</li>
        </ul>
    )
}

export default Pagination