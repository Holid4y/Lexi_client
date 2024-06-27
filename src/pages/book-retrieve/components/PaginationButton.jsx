import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBook } from "../../../common/reducers/bookRetrieveSlice";
import SVG from "../../../common/components/Icons/SVG";


const PaginationButton = ({ page, page_count, slug, setIsNext }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const modalElement = modalRef.current;
        const modalInstance = new window.bootstrap.Modal(modalElement);
        modalRef.current.modalInstance = modalInstance;
    }, []);

    const handlePageClick = (pageNum) => {
        navigate(`/book/${slug}/${pageNum}`);
        dispatch(fetchBook({ slug: slug, page: pageNum }));
        modalRef.current.modalInstance.hide();
    };

    const handleChangePage = (pageNum) => {
        navigate(`/book/${slug}/${pageNum}`);
    };

    const generatePageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= page_count; i++) {
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
                {page == 1 ? (
                    <button className="btn btn-secondary disabled" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => { setIsNext(false); handleChangePage(parseInt(page) - 1); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </button>
                )}

                <button type="button" className="btn btn-secondary bg-second p-0 mx-2 px-4 pb-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <SVG name="pagination"/>
                </button>

                {page_count == page ? (
                    <button className="btn btn-secondary disabled" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => { setIsNext(true); handleChangePage(parseInt(page) + 1);}}>
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
