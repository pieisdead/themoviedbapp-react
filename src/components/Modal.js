import React from 'react';

import getRecommendations from '../api/getRecommendations';
import getCast from '../api/getCast';
import getVideo from '../api/getVideo';
import Tabs from './Tabs';
import Recommendation from './Recommendation';
import Credit from './Credit';
import Video from './Video';
import Spinner from './Spinner';

const Modal = (props) => {
    
    const movieImage = "https://image.tmdb.org/t/p/w185" + props.movie.poster_path;
    
    const [tab, setTab] = React.useState('Details');
    const [recommendations, setRecommendations] = React.useState([]);
    const [cast, setCast] = React.useState([]);
    const [videos, setVideos] = React.useState([]);
    
    const pageHeight = document.body.offsetHeight;
    
     React.useEffect(() => {
         setRecommendations([]);
       getRecommendations(props.movie.id).then((recommendations) => {
          setRecommendations(recommendations.splice(0, 5));
       })
    }, [props.movie.id]);
    
    React.useEffect(() => {
       getCast(props.movie.id).then((cast) => {
          setCast(cast);
       })
    }, [props.movie.id]);
    
    React.useEffect(() => {
       getVideo(props.movie.id).then((videos) => {
          setVideos(videos);
       })
    }, [props.movie.id]);
    
    const recs = recommendations.map((recommendation, i) => {
        return <Recommendation key={i} movie={recommendation} />;
    });
    
    const credits = cast.map((credit, i) => {
        return <Credit key={i} cred={credit} />;
    });
    
    const vids = videos.map((video, i) => {
        return <Video key={i} vid={video} />;
    });
    
    function handleTabsClick(e) {
        setTab(e.target.innerHTML);
    }
    
    
    const imdbLink = 'https://www.imdb.com/title/' + props.movie.imdb_id;
    
    if (props.show && !props.movieLoading) {
         return (
            <div className="modal-overlay" style={{height: pageHeight + 'px'}}>
                <div className="modal">
                    <i onClick={props.closeHandler}>×</i>
                    <Tabs clickHandler={handleTabsClick} current={tab} />
                    <h2>{props.movie.title}</h2>
                    <div className="tab" style={tab === 'Details' ? {display: 'block'} : {display: 'none'}}>
                        <section>
                            <img src={movieImage} alt={props.movie.title} />
                            <span className="star">{props.movie.vote_average}</span>
                        </section>
                        <section>
                            <p className="overview">{props.movie.overview}</p>
                            <p><strong>Released:</strong> {props.movie.release_date}<br />
                                <strong>Original title:</strong> {props.movie.original_title}<br />
                                <strong>Tagline:</strong> {props.movie.tagline}<br />
                                <strong>Language:</strong> {props.movie.original_language}<br />
                                <strong>Budget:</strong> {props.movie.budget}<br />
                                <strong>Votes:</strong> {props.movie.vote_count}<br />
                                <strong>IMDB:</strong> <a href={imdbLink} target="_blank">{props.movie.imdb_id} <img src="./link.svg" width="14" alt="Link" /></a>
                            </p>
                        </section>
                        <h3>More movies like this</h3>
                        {recs}
                    </div>
                    <div className="tab" style={tab === 'Cast' ? {display: 'block'} : {display: 'none'}}>
                        {credits}
                    </div>
                    <div className="tab" style={tab === 'Video' ? {display: 'block'} : {display: 'none'}}>
                        {vids}
                    </div>
                </div>
            </div>
        )
    } else if (props.show && props.movieLoading) {
        return (
            <div className="modal-overlay" style={{height: pageHeight + 'px'}}>
                <div className="modal">
                    <Spinner />
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
   
}

export default Modal;