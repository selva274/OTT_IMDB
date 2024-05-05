const SearchBox=(props)=>{
    return (
        <div className="col col-sm-4">
            <input 
            value={props.searchValue}
            onChange={(event)=>props.setSearchValue(event.target.value)}
            placeholder="Favorite Movie"
            className="form-control"/>
        </div>
    )
}

export default SearchBox;