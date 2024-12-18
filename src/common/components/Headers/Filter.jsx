import React, { useState } from "react";
import { useSelector } from "react-redux";

const Filter = ({ setOrder, setDirection, setFilter, setValue }) => {

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedForm, setSelectedForm] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0); // Начальный уровень "Все уровни"
  const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState("");
  const [sortOrder, setSortOrder] = useState("date_added");
  const [sortDirection, setSortDirection] = useState("DESC"); // Начальное значение DESC
  const { levels } = useSelector((state) => state.user);


  // я всегда стараюсь избегать пропсов в компоенте, так как это создает зависимости, понажает читаемость кода и увеличивать кол-во ререндеров (хотя переменные useSelect тоже делают ререндеры)
  // чтобы тут избежать пропсов и вообще не трогать бедный WordList можно тут создавать queryParams и прям тут же предавать их в fetchVocabulary
//   и тут, кстати, нет проблем с преключение страниц, мы уверенны, что применненый фильтр должен отображать список слов с первой стр., а так как по умолчанию page=1 то параметр page вообще можем не применять

//   const nameToApplayFilterAndFetchResult = () => {
//     
    // dispatch(fetchVocabulary()); в fetchVocabulary ничего передовать не надо, он должен сам разобарться есть у него фильтры или нет
//   };



  // все ниже 4 функции можно прям вызывать в onClick, а точнее сеттеры
//   пример: onClick={setSelectedDate(event.target.value)}
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value); // Уровень из range
  };

  const handleFormChange = (event) => {
    setSelectedForm(event.target.checked); // Чекбокс формы
  };

  const handlePartOfSpeechChange = (event) => {
    setSelectedPartOfSpeech(event.target.value); // Часть речи из dropdown
  };

  const handleSortDirectionChange = () => {
    // Меняем направление сортировки
    const newDirection = sortDirection === "DESC" ? "ASC" : "DESC";
    setSortDirection(newDirection);
  };

  const handleApplyFilters = () => {
    // тут надо switch case использовать
    setOrder(sortOrder);
    setDirection(sortDirection);
    if (selectedForm) {
      setFilter("form");
      setValue("true");
    } else if (selectedPartOfSpeech) {
      setFilter("part_of_speech");
      setValue(selectedPartOfSpeech);
    } else if (selectedDate) {
      setFilter("date_added");
      setValue(selectedDate);
    } else if (selectedLevel !== "0") {
      // Если уровень не равен "Все уровни"
      setFilter("lvl_sum");
      setValue(selectedLevel);
    } else {
      // Если выбран "Все уровни"
      setFilter(null);
      setValue("");
    }
  };

  const handleResetFilters = () => {
    // Сбрасываем все фильтры
    setSelectedDate("");
    setSelectedForm(false);
    setSelectedLevel(0);
    setSelectedPartOfSpeech("");
    setOrder("date_added");
    setDirection("DESC");
    setFilter(null);
    setValue("");
  };

//   можно вынести в отдельный файл, типа utils.js или static.js, чтобы глаза не мазолило, но не критично
  const partOfSpeechOptions = [
    { value: "сущ", label: "Существительное" },
    { value: "гл", label: "Глагол" },
    { value: "прил", label: "Прилагательное" },
    { value: "прич", label: "Причастие" },
    { value: "нареч", label: "Наречие" },
    { value: "союз", label: "Союз" },
    { value: "предл", label: "Предлог" },
    { value: "предик", label: "Предикатив" },
    { value: "част", label: "Частица" },
    { value: "неизм", label: "Неизм. слово" },
    { value: "арт/дет", label: "Артикль/Детерминатив" },
    { value: "межд", label: "Междометие" },
    { value: "числ", label: "Числительное" },
    { value: "вводн", label: "Вводное слово" },
    { value: "дееприч", label: "Деепричастие" },
    { value: "мест", label: "Местоимение" },
    { value: "иностр", label: "Заимствованное слово" },
  ];

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
            <h4 className="offcanvas-title" id="offcanvasExampleLabel">Сортировка</h4>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">

            <div className="mb-4">
                <div className="btn-group w-100 mb-2" role="group">
                    <input type="radio" className="btn-check" name="sortOrder" id="sortDate" value="date_added" checked={sortOrder === "date_added"} onChange={() => setSortOrder("date_added")} />
                    <label className="btn btn-outline-primary" htmlFor="sortDate">По дате</label>

                    <input type="radio" className="btn-check" name="sortOrder" id="sortLevel" value="lvl_sum" checked={sortOrder === "lvl_sum"} onChange={() => setSortOrder("lvl_sum")} />
                    <label className="btn btn-outline-primary" htmlFor="sortLevel">По уровню</label>

                    <input type="radio" className="btn-check" name="sortOrder" id="sortAlphabet" value="word_text" checked={sortOrder === "word_text"} onChange={() => setSortOrder("word_text")} />
                    <label className="btn btn-outline-primary" htmlFor="sortAlphabet">По алфавиту</label>
                </div>

                <button className="btn btn-outline-secondary w-100" onClick={handleSortDirectionChange}>
                    {sortDirection === "DESC" ? "По убыванию" : "По возрастанию"}
                </button>
            </div>

            <h4>Фильтры</h4>

            <div className="accordion my-4" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#lvl" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            {selectedLevel === 0 || selectedLevel === "0" ? "Уровень: все" : `Уровень: ${selectedLevel}`}
                        </button>
                    </h2>
                    <div id="lvl" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <input type="range" className="form-range w-100" min="0" max={levels?.length} value={selectedLevel} id="customRange2" onChange={handleLevelChange} />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#form" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Неправильные глаголы
                        </button>
                    </h2>
                    <div id="form" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" value={selectedForm} id="formCheck" onChange={handleFormChange} />
                                <span className="mb-2 ">Неправильные глаголы</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pos" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Части речи
                        </button>
                    </h2>
                    <div id="pos" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <div>
                                <select className="form-select" id="partOfSpeechDropdown" value={selectedPartOfSpeech} onChange={handlePartOfSpeechChange} >
                                <option value="">Выберите часть речи</option>
                                {partOfSpeechOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#date" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Дата добавления
                        </button>
                    </h2>
                    <div id="date" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <input type="date" className="form-control" value={selectedDate} onChange={handleDateChange} />
                        </div>
                    </div>
                </div>
            </div>
        
            <button className="btn btn-primary mb-2 w-100" onClick={handleApplyFilters}> Применить фильтры </button>
            <button className="btn btn-outline-secondary w-100" onClick={handleResetFilters}> Сбросить фильтры </button>
        </div>
    </div>
  );
};

export default Filter;
