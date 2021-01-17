import React from 'react';
import { useSpring, animated } from 'react-spring';

import getRecommendations from '../api/getRecommendations';
import getCast from '../api/getCast';
import getVideo from '../api/getVideo';
import Tabs from './Tabs';
import Recommendation from './Recommendation';
import Credit from './Credit';
import Video from './Video';

const Modal = (props) => {
    
    const spring = useSpring({transform: 'scale(1)', from: {transform: 'scale(0)'}});
    const movieImage = "https://image.tmdb.org/t/p/w185" + props.movie.poster_path;
    
    const [tab, setTab] = React.useState('Details');
    const [recommendations, setRecommendations] = React.useState([]);
    const [cast, setCast] = React.useState([]);
    const [videos, setVideos] = React.useState([]);
    
    const pageHeight = document.body.offsetHeight;
    
     React.useEffect(() => {
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
    
    if (props.show) {
         return (
            <div className="modal-overlay" style={{height: pageHeight + 'px'}}>
                <animated.div className="modal" style={spring}>
                    <i onClick={props.closeHandler}>×</i>
                    <Tabs clickHandler={handleTabsClick} current={tab} />
                    <h2>{props.movie.title}</h2>
                    <div className="tab" style={tab === 'Details' ? {display: 'block'} : {display: 'none'}}>
                        <section>
                            <img src={movieImage} alt={props.movie.title} />
                        </section>
                        <section>
                            <p>{props.movie.overview}</p>
                            <p>Released: {props.movie.release_date}<br />
                                Original title: {props.movie.original_title}<br />
                                Language: {props.movie.original_language}<br />
                                Budget: {props.movie.budget}
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
                </animated.div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
   
}

export default Modal