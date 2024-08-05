import React from "react";
import { Link } from "react-router-dom";

import BtmRecentlyBook from "./BtmRecentlyBook"

function BooksLinkCard() {
    return (
        
            <div className="card text-end mb-3 w-100 bg-card-dark p-2">
                <div className="card-body">
                    <h4 className="card-title w-75 text-start">
                        <b>Книги и тексты</b>
                    </h4>
                    <p className="card-text text-start">
                        Читайте, добавляйте новые слова в свой словарь и <b>повторяйте их</b>
                    </p>
                    <div className="" >
                        <BtmRecentlyBook />
                        <Link to="/books">
                            <button type="button" className="btn btn-primary px-4">Смотреть все</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
    );
}

export default BooksLinkCard;
