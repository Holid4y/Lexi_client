import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchHome } from "../../common/reducers/homeSlice";

import InfoCard from "./components/InfoCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";
import Headers from "../../common/components/Headers/Header";
import Loading from "../../common/components/Treatment/Loading";
import BtmRecentlyBook from "./components/BtmRecentlyBook";

function Home() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(fetchHome());
    }, [dispatch]);

    return (
        <div className="align-items-center">
            <Headers title="Главная" />

            {loading ? (
                <Loading />
            ) : (
                <main className="container pb-5">
                    <InfoCard />
                    <BooksLinkCard />
                    <WorsHistory />
                    <BtmRecentlyBook />
                </main>
            )}
        </div>
    );
}

export default Home;
