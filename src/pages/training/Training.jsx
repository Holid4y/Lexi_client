import { Link } from "react-router-dom";
import TrainingCard from "../home/components/TrainingCard";

function Tests() {
    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-4 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <span className="navbar-brand">Тесты</span>
                    </div>
                </nav>
            </div>
            <main className="container">
                <div className="mb-3">
                    <TrainingCard />
                </div>
            </main>
        </div>
    );
}

export default Tests;
