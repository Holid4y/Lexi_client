import "./assets/Landing.css";
import MainBlock from "./components/MainBlock";
import TranslateBlock from "./components/TranslateBlock";
import WordBlock from "./components/WordBlock";
import TestFitst from "./components/TestFitst";
import TestSecondary from "./components/TestSecondary";
import LastBlock from "./components/LastBlock";

const Landing = () => {

    return (
        <div>
            <MainBlock />
            <div class="b-example-divider"></div>

            <TranslateBlock />
            <div class="b-example-divider"></div>

            <WordBlock />
            <div class="b-example-divider"></div>

            <TestFitst />
            <div class="b-example-divider"></div>

            {/* <TestSecondary />
            <div class="b-example-divider"></div> */}

            <LastBlock />
        </div>
    );
};

export default Landing;
