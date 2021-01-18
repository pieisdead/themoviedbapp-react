
const Credit = (props) => {
    const imagePath = props.cred.profile_path !== null ? "http://image.tmdb.org/t/p/w92//" + props.cred.profile_path : "./profile.png";
    return (
        <div className="credit">
            <img src={imagePath} width="40" alt={props.cred.name} />
            <div>{props.cred.name}</div>
            <div>{props.cred.character}</div>
        </div>
    )
}

export default Credit;