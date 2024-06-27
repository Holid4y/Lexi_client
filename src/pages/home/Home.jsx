import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "./components/InfoCard";
import BooksLinkCard from "./components/BooksLinkCard";
import WorsHistory from "./components/WorsHistory";
import Headers from "../../common/components/Headers/Header";
import Loading from "../../common/components/Treatment/Loading";
import BtnReadBook from "./components/BtnReadBook";

function Home() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.books);
    const LoadingView = <Loading/>
    const Header = <Headers title="Главная"/>
    const InfoCardView = <InfoCard />
    const BooksLinkCardView = <BooksLinkCard />
    const WordHistoryView = <WorsHistory />
    const BtnReadBookView = <BtnReadBook/>

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
                    {BtnReadBookView}
                </main>
            )}
        </div>
    );
}
export default Home;