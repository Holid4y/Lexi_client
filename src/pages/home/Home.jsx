import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../common/reducers/homeSlice";

import InfoCard from "./components/InfoCard";
import TrainingCard from "../training/TrainingCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchHome());
    }, [dispatch]);

    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-2 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <span className="navbar-brand">Главная</span>
                        <Link className="pt-1 color-svg" to="/profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                        </Link>
                    </div>
                </nav>
            </div>

            {/* стили для этого блока */}
            {/* .navbar-blur::before {
            background-color: var(--bs-body-bg);
            content: "";
            position: absolute;
            top: -15px;
            left: 0;
            width: 100%;
            height: 85px;
            z-index: -1; /* Помещаем псевдоэлемент за фоном контента */
            /*filter: blur(5px); } */}
            {/* <div className="container navbar-blur sticky-top mb-4 pt-4">
        <div className="row row-cols-7 g-2">
          <div className="block_week col bg-danger"><span>пн</span></div>
          <div className="block_week col bg-danger"><span>вт</span></div>
          <div className="block_week col"><span>ср</span></div>
          <div className="block_week col"><span>чт</span></div>
          <div className="block_week col bg-success"><span>пт</span></div>
          <div className="block_week col bg-success"><span>сб</span></div>
          <div className="block_week col"><span>вс</span></div>
        </div>
      </div> 
      .block_week {
            background-color: var(--input-color);
            box-shadow: 0px 0px 2px var(--input-color);
            font-size: 16px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            margin: 0px 6px;
        }

        .bg-danger{
            box-shadow: 0px 0px 2px rgb(var(--bs-danger-rgb));
            color: white;
        }
        .bg-success{
            box-shadow: 0px 0px 2px rgb(var(--bs-success-rgb));
            color: white;
        }*/}

            <main className="container">
                <InfoCard />
                {/* <TrainingCard /> */}
                <BooksLinkCard />
                <WorsHistory />

                <nav className="pagination-position d-flex justify-content-center">
                    <button type="button" className="btn btn-primary px-4">
                        Продолжить читать
                    </button>
                </nav>
            </main>
        </div>
    );
}

export default Home;
