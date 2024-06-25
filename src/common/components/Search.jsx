function Search({ onChange }) {
    const handleInputChange = (e) => { onChange(e.target.value); };
    return (
        <form className="w-75" role="search">
            <input className="search w-100" type="search" placeholder="Поиск" aria-label="Search" onChange={handleInputChange} />
        </form>
    );
}
export default Search;
