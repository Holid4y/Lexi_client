import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import SVG from "../Icons/SVG";

const PaginationButton = ({ currentPage, pageCount, setCurrentPage }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        const modalInstance = new window.bootstrap.Modal(modalElement);
        modalRef.current.modalInstance = modalInstance;
    }, []);


    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        modalRef.current.modalInstance.hide();
    };

    const generatePageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= pageCount; i++) {
            buttons.push(
                <div className="col-2 col-lg-1" key={i}>
                    <button className={`btn w-100 ${i === currentPage ? "btn-primary" : "btn-outline-secondary"}`} onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </div>
            );
        }
        return buttons;
    };

    const LeftButton =
        currentPage === 1 ? (
            <button className="btn btn-secondary disabled" disabled>
                <SVG name="caret_left_fill" />
            </button>
        ) : (
            <button
                className="btn btn-primary"
                onClick={() => {
                    handlePageChange(currentPage - 1);
                }}
            >
                <SVG name="caret_left_fill" />
            </button>
        );
    const RightButton =
        currentPage === pageCount ? (
            <button className="btn btn-secondary disabled" disabled>
                <SVG name="caret_right_fill" />
            </button>
        ) : (
            <button
                className="btn btn-primary"
                onClick={() => {
                    handlePageChange(currentPage + 1);
                }}
            >
                <SVG name="caret_right_fill" />
            </button>
        );
    const ModalListPages = (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header mb-2">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Выберите страницу
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body row g-2">{generatePageButtons()}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {ModalListPages}
            <nav className="pagination-position d-flex justify-content-center">
                {LeftButton}

                <button type="button" className="btn btn-secondary bg-second p-0 mx-2 px-4 pb-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <SVG name="pagination" />
                </button>

                {RightButton}
            </nav>

            
        </div>
    );
};

export default PaginationButton;
