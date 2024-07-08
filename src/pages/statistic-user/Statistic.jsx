import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabularyStats } from "../../common/reducers/vocabularySlice";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Headers from "../../common/components/Headers/Header";
import Loading from "../../common/components/Treatment/Loading";

function Statistic() {
    const dispatch = useDispatch();
    const { recognize, reproduce, loading, error } = useSelector((state) => state.vocabulary);

    useEffect(() => {
        dispatch(fetchVocabularyStats());
    }, [dispatch]);

    var rootStyles = getComputedStyle(document.documentElement);
    var bgFirstCol = rootStyles.getPropertyValue('--bg-first-colum').trim();
    var bgSecondCol = rootStyles.getPropertyValue('--bg-second-colum').trim();

    const barOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { boxPadding: 3 },
        },
    };

    const barDatalvl = {
        labels: recognize.map((_, index) => `L${index + 1}`),
        datasets: [
            {
                label: "Узнаваемость",
                data: recognize,
                backgroundColor: bgFirstCol,
                borderRadius: 8,
            },
            {
                label: "Воспроизведение",
                data: reproduce,
                backgroundColor: bgSecondCol,
                borderRadius: 8,
            },
        ],
    };

    const Header = <Headers title="Статистика" />;
    const LoadingView = <Loading />;

    const BlockWordStatistic = <div className="row mb-4">
        <div className="col-6 col-md-3 hover-text-opacity">
            <span className="ps-2" id="wordsToLearn">
                За день
            </span>
            <div className="card">
                <h4 className="book-text text-center py-2">12</h4>
            </div>
        </div>
        <div className="col-6 col-md-3 hover-text-opacity">
            <span className="ps-2" id="wordsToLearn">
                За неделю
            </span>
            <div className="card">
                <h4 className="book-text text-center py-2">148</h4>
            </div>
        </div>
        <div className="col-6 col-md-3 hover-text-opacity">
            <span className="ps-2" id="wordsToLearn">
                За месяц
            </span>
            <div className="card">
                <h4 className="book-text text-center py-2">862</h4>
            </div>
        </div>
        <div className="col-6 col-md-3 hover-text-opacity">
            <span className="ps-2" id="wordsToLearn">
                За год
            </span>
            <div className="card">
                <h4 className="book-text text-center py-2">3862</h4>
            </div>
        </div>
    </div>

    const CanvaViewLvl = (
        <div className="text-center">
            <h5 className="mt-4 mb-2">Количество слов в уровнях</h5>
            <div className="chart-container" style={{ position: "relative", width: "100%", height: "230px" }}>
                <Bar data={barDatalvl} options={barOptions} />
            </div>
        </div>
    );

    const LinkLVLSettings = (
        <Link to="/lvl-settings" className="form-control mb-3 py-2-5 d-flex justify-content-between">
            <span className="text-start">Настроить уровни словаря</span>
            <span className="text-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                    />
                </svg>
            </span>
        </Link>
    );

    const LinkAllWords = (
        <div className="d-flex justify-content-center my-4">
            <Link to="/word-list" className="btn btn-primary save-btn py-2 w-50">
                <span>Все слова</span>
            </Link>
        </div>
    );

    return (
        <div className="align-items-center">
            {Header}
            {loading ? (
                LoadingView
            ) : (
                <main className="container pb-5">
                    {BlockWordStatistic}
                    {CanvaViewLvl}
                    {/* {LinkLVLSettings}
                    {LinkAllWords} */}
                </main>
            )}
        </div>
    );
}

export default Statistic;
