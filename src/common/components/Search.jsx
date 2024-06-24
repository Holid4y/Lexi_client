function Search({ onChange }) {
  // Обработчик изменения значения в поле ввода
  const handleInputChange = (e) => {
    onChange(e.target.value); // Вызываем обработчик onChange и передаем новое значение
  };

  return (
    <div className="container sticky-top mb-4 pt-2">
      <nav className="navbar dark-nav">
        <form className="d-flex w-100" role="search">
          <input className="form-control w-100 box-none" type="search" placeholder="Поиск" aria-label="Search" onChange={handleInputChange}/>
        </form>
      </nav>
    </div>
  );
}

export default Search;
