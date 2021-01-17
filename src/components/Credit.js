
const Credit = (props) => {
    const imagePath = "http://image.tmdb.org/t/p/w92//" + props.cred.profile_path;
    return (
        <div className="credit">
            <img src={imagePath} width="40" />
            <div>{props.cred.name}</div>
            <div>{props.cred.character}</div>
        </div>
    )
}

export default Credit;