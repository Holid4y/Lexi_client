import React from "react";

const Skeleton = () => {
    return (
        <div>
            <div>
                <div className="card text-end mb-4 w-100 bg-card-dark">
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3 author w-100"></h5>
                        <div className="card-text card-text-lr">
                            <span className="author w-50"></span>
                        </div>
                    </div>
                </div>
                <div className="card text-end mb-4 w-100 bg-card-dark">
                    <div className="card-body">
                        <h5 className="card-title text-start mb-3 author w-100"></h5>
                        <div className="card-text card-text-lr">
                            <span className="author w-50"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
