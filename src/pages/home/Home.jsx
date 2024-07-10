import React, {useEffect} from "react";
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

    const LoadingView = <Loading/>
    const Header = <Headers title="Главная"/>
    const InfoCardView = <InfoCard />
    const BooksLinkCardView = <BooksLinkCard />
    const WordHistoryView = <WorsHistory />
    const BtmRecentlyBookView = <BtmRecentlyBook/>

    return (
        <div className="align-items-center">
            {Header}

            {/* {loading ? ( LoadingView ) : error ? ( ErrorView ) : (
                            <div>
                                
                            </div>
                        )} */}
            {loading ? ( LoadingView ) : (
                <main className="container pb-5">
                    {InfoCardView}
                    {BooksLinkCardView}
                    {WordHistoryView}
                    {BtmRecentlyBookView}
                </main>
            )}
        </div>
    );
}
export default Home;