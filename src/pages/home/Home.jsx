import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../../common/reducers/homeSlice";

import InfoCard from "./components/InfoCard";
import TrainingCard from "./components/TrainingCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";


function Home() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchHome()); }, [dispatch]);

  return (
    <div className="align-items-center">
      <div className="container navbar-blur sticky-top mb-4 pt-4">
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

      <main className="container">
        <InfoCard />
        <TrainingCard />
        <BooksLinkCard />
        <WorsHistory />
      </main>
    </div>
  );
  }

export default Home;
