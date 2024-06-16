import React from 'react';
import { Link } from 'react-router-dom';

const PaginationButton = ({ page, page_count, slug, setIsNext }) => {
  return (
    <div>

    <nav className='pagination-position d-flex justify-content-center'>
        <Link to={`/book/${slug}/${parseInt(page) - 1}`}>
          {page == 1 ? (
            <button class="btn btn-secondary disabled" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </button>
          ) : (
            <button class="btn btn-primary" onClick={() => setIsNext(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </button>
          )}
        </Link>
        
        <button type="button" class="btn btn-secondary mx-2 px-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
          </svg>
        </button>

        <Link to={`/book/${slug}/${parseInt(page) + 1}`}>
          {page_count == page ? (
            <button class="btn btn-secondary disabled" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </button>
          ) : (
            <button class="btn btn-primary" onClick={() => setIsNext(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </button>
          )}
        </Link>
    </nav>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Выберите страницу</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body row g-3">
            <div className='col-2'><button className='btn btn-primary w-100'>1</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>2</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>3</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>4</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>5</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>1</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>2</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>3</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>4</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>5</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>1</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>2</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>3</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>4</button></div>
            <div className='col-2'><button className='btn btn-primary w-100'>5</button></div>
          </div>
        </div>
      </div>
    </div>


      {/* <Link to={`/book/${slug}/${parseInt(page) - 1}`}>
        {page == 1 ? (
          <button style={{ position: "fixed", bottom: 74 + "px" }} type="button" className="btn btn-primary" disabled >
            Prev
          </button>
        ) : (
          <button style={{ position: "fixed", bottom: 74 + "px" }} type="button" className="btn btn-primary" onClick={() => setIsNext(false)} >
            Prev
          </button>
        )}
      </Link>
      <Link to={`/book/${slug}/${parseInt(page) + 1}`}>
        {page_count == page ? (
          <button style={{ position: "fixed", bottom: 74 + "px", right: 0 + "px" }} type="button" className="btn btn-primary" disabled>
            Next
          </button>
        ) : (
          <button style={{ position: "fixed", bottom: 74 + "px", right: 0 + "px" }} type="button" className="btn btn-primary" onClick={() => setIsNext(true)} >
            Next
          </button>
        )}
      </Link> */}
    </div>
  );
};

export default PaginationButton;
