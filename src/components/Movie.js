import React from 'react';
import { useSpring, animated } from 'react-spring';

import Button from './Button';

const Movie = (props) => {
    const movieImage = props.movie.poster_path !== null ? "https://image.tmdb.org/t/p/w185" + props.movie.poster_path : './no-image.png';
    const pLength = 100;
    const overview = props.movie.overview.substr(0, pLength);
    const spring = useSpring({transform: 'scale(1)', from: {transform: 'scale(0)'}});
    return (
        <div onClick={props.clickHandler}>
            <animated.div style={spring}>
                <span className="star">{props.movie.vote_average}</span>
                <img src={movieImage} alt={props.movie.title} />
                <h2>{props.movie.title}</h2>
                <p>Released: {props.movie.release_date}</p>
                <p>{overview}...</p>
                <Button label="More"  />
            </animated.div>
        </div>
    )
}

export default Movie