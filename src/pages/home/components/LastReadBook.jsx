import React from "react";
import { Link } from "react-router-dom";

function LastReadBook() {
    return (
        
            <div className="card text-end mb-3 w-100 bg-card-dark p-2 animated-block-rightleft">
                <div className="card-body">
                    <h3 className="card-title text-start">
                        Красная шапочка
                    </h3>
                    <div className="row d-flex align-items-end">
                        <div className="col-8">
                            <div class="progress bg-progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar w-50">50%</div>
                            </div>
                        </div>
                        <div className="col-4" >
                            <Link to="/books">
                                <button type="button" className="btn btn-primary px-4">Продолжить читать</button>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
    );
}

export default LastReadBook;
