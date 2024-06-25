import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabularyStats } from "../../common/reducers/vocabularySlice";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Block from "./components/Block";

function Statistic() {
    const dispatch = useDispatch();
    const { recognize, reproduce, loading, error } = useSelector((state) => state.vocabulary);

    useEffect(() => {
        dispatch(fetchVocabularyStats());
    }, [dispatch]);

    var rootStyles = getComputedStyle(document.documentElement);
    var bgFirstCol = rootStyles.getPropertyValue('--bg-first-colum').trim();
    var bgSecondCol = rootStyles.getPropertyValue('--bg-second-colum').trim();

    const data = {
        labels: ["01", "02", "03", "04", "05", "06", "07"],
        datasets: [
            {
                label: "Узнаваемость",
                data: [4, 11, 9, 7, 8, 3, 6],
                backgroundColor: bgFirstCol,
                borderRadius: 8,
            },
            {
                label: "Воспроизведение",
                data: [6, 3, 8, 7, 9, 11, 4],
                backgroundColor: bgSecondCol,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { boxPadding: 3 },
        },
    };

    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-3 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                    <span className="navbar-brand">Статистика</span>
                        <Link className="pt-1 color-svg" to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                            </svg>
                        </Link>
                    </div>
                </nav>
            </div>

            <main className="container">
                <div className="chart-container" style={{ position: "relative", width: "100%", height: "250px" }}>
                    <Bar data={data} options={options} />
                </div>

                <h5 className="mt-4 mb-2">Уровни узнаваемости</h5>
                <div className="row row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 g-3">
                    {recognize.length > 0 ? (
                        recognize.map((countWords, index) => <Block countWords={countWords} index={index} key={index} />)
                    ) : loading ? (
                        "loading..."
                    ) : (
                        <p>Error: {error}</p>
                    )}
                </div>

                <h5 className="mt-4 mb-2">Уровни воспроизведения</h5>
                <div className="row row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 g-3 mb-4">
                    {reproduce.length > 0 ? (
                        reproduce.map((countWords, index) => <Block countWords={countWords} index={index} key={index} />)
                    ) : loading ? (
                        "loading..."
                    ) : (
                        <p>Error: {error}</p>
                    )}
                </div>

                <Link to="/lvl-settings" className="form-control mb-3 py-2-5 d-flex justify-content-between">
                    <span className="text-start">Настроить уровни словаря</span>
                    <span className="text-end">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </span>
                </Link>

                <div className="d-flex justify-content-center my-4">
                    <Link to="/word-list" className="btn btn-primary save-btn py-2 w-50">
                        <span>Все слова</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Statistic;
