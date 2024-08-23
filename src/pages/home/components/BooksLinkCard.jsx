import React from "react";
import { Link } from "react-router-dom";

function BooksLinkCard() {
    return (
        
            <div className="card text-end mb-3 w-100 bg-card-dark p-2 animated-block-rightleft">
                <div className="card-body">
                    <h4 className="card-title text-start book-text">
                        Книги и тексты
                    </h4>
                    <h5 className="card-text text-start w-75">
                        Читайте, добавляйте новые слова в свой словарь и <b>повторяйте их</b>
                    </h5>
                    <div className="" >
                        <Link to="/books">
                            <button type="button" className="btn btn-primary px-4">Смотреть все</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
    );
}

export default BooksLinkCard;
