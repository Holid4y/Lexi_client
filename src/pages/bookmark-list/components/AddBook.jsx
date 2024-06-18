import React from 'react';

const AddBook = () => {
  return (
    <div>

        <nav className='pagination-position d-flex justify-content-center'>
            <button type="button" class="btn btn-primary mx-2 px-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Добавить книгу
            </button>
        </nav>

        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content rounded-4 shadow">
                    <div class="modal-body p-5">
                        <h2 class="fw-bold mb-4">Выберите файл</h2>
                        <ul class="d-grid gap-4 mb-4 list-unstyled small">
                            <li class="d-flex gap-4 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi text-primary" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                </svg>
                                <div>
                                    <h5 class="mb-0">Книга</h5>
                                    .EPUB .FB2 .MOBI .LRF .KF8 .PDF
                                </div>
                            </li>
                            <li class="d-flex gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi text-warning" viewBox="0 0 16 16">
                                    <path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"/>
                                    <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5z"/>
                                </svg>
                                <div>
                                    <h5 class="mb-0">Текст</h5>
                                    .txt .doc .docx
                                </div>
                            </li>
                            <input class="form-control form-control-lg" id="formFileLg" type="file"/>
                        </ul>

                        <hr className='my-4' />

                        <h2 class="fw-bold mb-4">Напишите текст</h2>

                        <div className='text-center'>
                            <textarea class="form-control w-100" placeholder='Once upon a time there was a dear little girl...' id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <hr className='my-4' />

                        <input class="form-control form-control-lg" type="text" placeholder="Название книги" />

                        <div class="form-check form-switch mt-3">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                            <label class="form-check-label" for="flexSwitchCheckDefault">Приватная книга \ текст</label>
                        </div>

                        <button type="button" class="btn btn-lg btn-primary mt-4 w-100" data-bs-dismiss="modal">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AddBook;
