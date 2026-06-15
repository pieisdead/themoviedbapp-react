import React from 'react';
import { useSpring, animated } from 'react-spring';

const Recommendation = (props) => {
    
    const movieImage = "https://image.tmdb.org/t/p/w185" + props.movie.poster_path;
    const spring = useSpring({transform: 'scale(1)', from: {transform: 'scale(0)'}});
    const voteFloor = Math.floor(props.movie.vote_average);
    
    return (
        <animated.div className="poster" style={spring}>
            <span className="star">{voteFloor}</span>
            <img src={movieImage} alt={props.movie.title} />
        </animated.div>
    )
}

export default Recommendation;