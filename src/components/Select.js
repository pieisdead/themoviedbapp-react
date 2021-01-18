const Select = (props) => {
    
    const options = props.genres.map((genre, i) => {
        return <option value={genre.id} key={i}>{genre.name}</option>;
    })
    
    return (
        <select onChange={props.changeHandler}>
            <option value="all">All Genres</option>
            {options}
        </select>
    )
}

export default Select;