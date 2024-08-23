import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchHome } from "../../common/reducers/homeSlice";

import InfoCard from "./components/InfoCard";
import BooksLinkCard from "./components/BooksLinkCard";
import LastReadBook from "./components/LastReadBook";
import Headers from "../../common/components/Headers/Header";

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHome());
    }, [dispatch]);

    return (
        <div className="align-items-center">
            <Headers title="Главная" />
            <main className="container pb-5 mb-3">
                <InfoCard />
                <BooksLinkCard />
                <LastReadBook />
            </main>

        </div>
    );
}

export default Home;
