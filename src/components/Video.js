
const Video = (props) => {
    const videoUrl = "https://www.youtube.com/embed/" + props.vid.key + "?autoplay=0";
    return (
        <div className="video">
            <iframe id="ytplayer" title="ytVideo" type="text/html" width="420" height="280" src={videoUrl} frameBorder="0"></iframe>
        </div>
    )
}

export default Video;