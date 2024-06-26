import React from "react";
import { Link } from "react-router-dom";

function BooksLinkCard() {
    return (
        <Link to="/books">
            <div className="card text-end mb-3 w-100 bg-card-dark card-btn p-2">
                <div className="card-body">
                    <h4 className="card-title w-75 text-start">
                        <b>Книги и тексты</b>
                    </h4>
                    <p className="card-text w-75 text-start">
                        Читайте книги и тексты. <br /> Добавляйте новые слова в свой словарь.
                    </p>
                    <p className="card-text">Читать больше</p>
                </div>
            </div>
        </Link>
    );
}

export default BooksLinkCard;
