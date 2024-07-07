import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import SVG from "../Icons/SVG";

const PaginationButton = ({ currentPage, pageCount, onPageChange, setIsNext }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        const modalInstance = new window.bootstrap.Modal(modalElement);
        modalRef.current.modalInstance = modalInstance;
    }, []);

    const handlePageClick = (pageNum) => {
        onPageChange(pageNum);
        modalRef.current.modalInstance.hide();
    };

    const generatePageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= pageCount; i++) {
            buttons.push(
                <div className="col-2 col-lg-1" key={i}>
                    <button className="btn btn-primary w-100" onClick={() => handlePageClick(i)}>{i}</button>
                </div>
            );
        }
        return buttons;
    };

    return (
        <div>
            <nav className="pagination-position d-flex justify-content-center">
                {currentPage === 1 ? (
                    <button className="btn btn-secondary disabled" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => { setIsNext(false); onPageChange(currentPage - 1); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                )}

                <button type="button" className="btn btn-secondary bg-second p-0 mx-2 px-4 pb-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <SVG name="pagination"/>
                </button>

                {currentPage === pageCount ? (
                    <button className="btn btn-secondary disabled" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => { setIsNext(true); onPageChange(currentPage + 1); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </button>
                )}
            </nav>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header mb-2">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Выберите страницу</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body row g-2">{generatePageButtons()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginationButton;
