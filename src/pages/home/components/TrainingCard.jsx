import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

function TrainingCard() {

  return (
    <div className="row g-4">
      <div className="col-12 hover-text-opacity">
          <div className="px-2 text-start">
            <span id="wordsToLearn">Тренировка слов на сегодня</span>
          </div>
          <div className="card text-end bg-card-dark mb-4">
            {/* <div class="card-header border-none text-start">
              Тренировка слов на сегодня
            </div> */}
            <div className="card-body">
              <div className="text-start mb-0 row g-3">
                <div className="col-12 col-md-6">
                  <Link to="/training/recognize">
                    <div className="card card-text-lr card-btn overflow-box bg-card-second">
                        <div className="card-body text-start text-white">
                          <span>Выбор ответа</span>
                        </div>
                        <div className="svg-background">
                          <svg width="35" height="35" viewBox="0 0 45 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M22.733 13.2569C22.8176 13.3382 22.8848 13.4347 22.9306 13.541C22.9764 13.6472 23 13.7611 23 13.8762C23 13.9912 22.9764 14.1051 22.9306 14.2114C22.8848 14.3176 22.8176 14.4142 22.733 14.4954L17.28 19.7431C17.1955 19.8245 17.0952 19.8891 16.9848 19.9332C16.8744 19.9773 16.756 20 16.6365 20C16.517 20 16.3986 19.9773 16.2882 19.9332C16.1778 19.8891 16.0775 19.8245 15.993 19.7431L13.2665 17.1192C13.182 17.0379 13.115 16.9414 13.0693 16.8351C13.0235 16.7289 13 16.615 13 16.5C13 16.385 13.0235 16.2711 13.0693 16.1649C13.115 16.0586 13.182 15.9621 13.2665 15.8808C13.351 15.7995 13.4513 15.735 13.5617 15.6909C13.6722 15.6469 13.7905 15.6243 13.91 15.6243C14.0295 15.6243 14.1478 15.6469 14.2582 15.6909C14.3686 15.735 14.4689 15.7995 14.5534 15.8808L16.6365 17.8871L21.4461 13.2569C21.5305 13.1755 21.6308 13.1109 21.7412 13.0668C21.8516 13.0227 21.97 13 22.0895 13C22.2091 13 22.3274 13.0227 22.4379 13.0668C22.5483 13.1109 22.6486 13.1755 22.733 13.2569Z M8.4375 0H36.5625C38.0543 0 39.4851 0.592632 40.54 1.64752C41.5949 2.70242 42.1875 4.13316 42.1875 5.625V39.375C42.1875 40.8668 41.5949 42.2976 40.54 43.3525C39.4851 44.4074 38.0543 45 36.5625 45H8.4375C6.94566 45 5.51492 44.4074 4.46002 43.3525C3.40513 42.2976 2.8125 40.8668 2.8125 39.375V36.5625H5.625V39.375C5.625 40.1209 5.92132 40.8363 6.44876 41.3637C6.97621 41.8912 7.69158 42.1875 8.4375 42.1875H36.5625C37.3084 42.1875 38.0238 41.8912 38.5512 41.3637C39.0787 40.8363 39.375 40.1209 39.375 39.375V5.625C39.375 4.87908 39.0787 4.16371 38.5512 3.63626C38.0238 3.10882 37.3084 2.8125 36.5625 2.8125H8.4375C7.69158 2.8125 6.97621 3.10882 6.44876 3.63626C5.92132 4.16371 5.625 4.87908 5.625 5.625V8.4375H2.8125V5.625C2.8125 4.13316 3.40513 2.70242 4.46002 1.64752C5.51492 0.592632 6.94566 0 8.4375 0Z M2.8125 14.0625V12.6562C2.8125 12.2833 2.96066 11.9256 3.22438 11.6619C3.4881 11.3982 3.84579 11.25 4.21875 11.25C4.59171 11.25 4.9494 11.3982 5.21312 11.6619C5.47684 11.9256 5.625 12.2833 5.625 12.6562V14.0625H7.03125C7.40421 14.0625 7.7619 14.2107 8.02562 14.4744C8.28934 14.7381 8.4375 15.0958 8.4375 15.4688C8.4375 15.8417 8.28934 16.1994 8.02562 16.4631C7.7619 16.7268 7.40421 16.875 7.03125 16.875H1.40625C1.03329 16.875 0.675604 16.7268 0.411881 16.4631C0.148158 16.1994 0 15.8417 0 15.4688C0 15.0958 0.148158 14.7381 0.411881 14.4744C0.675604 14.2107 1.03329 14.0625 1.40625 14.0625H2.8125ZM2.8125 22.5V21.0938C2.8125 20.7208 2.96066 20.3631 3.22438 20.0994C3.4881 19.8357 3.84579 19.6875 4.21875 19.6875C4.59171 19.6875 4.9494 19.8357 5.21312 20.0994C5.47684 20.3631 5.625 20.7208 5.625 21.0938V22.5H7.03125C7.40421 22.5 7.7619 22.6482 8.02562 22.9119C8.28934 23.1756 8.4375 23.5333 8.4375 23.9062C8.4375 24.2792 8.28934 24.6369 8.02562 24.9006C7.7619 25.1643 7.40421 25.3125 7.03125 25.3125H1.40625C1.03329 25.3125 0.675604 25.1643 0.411881 24.9006C0.148158 24.6369 0 24.2792 0 23.9062C0 23.5333 0.148158 23.1756 0.411881 22.9119C0.675604 22.6482 1.03329 22.5 1.40625 22.5H2.8125ZM2.8125 30.9375V29.5312C2.8125 29.1583 2.96066 28.8006 3.22438 28.5369C3.4881 28.2732 3.84579 28.125 4.21875 28.125C4.59171 28.125 4.9494 28.2732 5.21312 28.5369C5.47684 28.8006 5.625 29.1583 5.625 29.5312V30.9375H7.03125C7.40421 30.9375 7.7619 31.0857 8.02562 31.3494C8.28934 31.6131 8.4375 31.9708 8.4375 32.3438C8.4375 32.7167 8.28934 33.0744 8.02562 33.3381C7.7619 33.6018 7.40421 33.75 7.03125 33.75H1.40625C1.03329 33.75 0.675604 33.6018 0.411881 33.3381C0.148158 33.0744 0 32.7167 0 32.3438C0 31.9708 0.148158 31.6131 0.411881 31.3494C0.675604 31.0857 1.03329 30.9375 1.40625 30.9375H2.8125Z M14.257 24.257C14.3382 24.1755 14.4347 24.1109 14.541 24.0668C14.6473 24.0227 14.7612 24 14.8762 24C14.9913 24 15.1052 24.0227 15.2115 24.0668C15.3177 24.1109 15.4142 24.1755 15.4955 24.257L17.5002 26.2635L19.505 24.257C19.5863 24.1756 19.6828 24.1111 19.7891 24.0671C19.8953 24.0231 20.0092 24.0005 20.1242 24.0005C20.2392 24.0005 20.3531 24.0231 20.4594 24.0671C20.5656 24.1111 20.6622 24.1756 20.7435 24.257C20.8248 24.3383 20.8893 24.4348 20.9333 24.5411C20.9773 24.6473 21 24.7612 21 24.8762C21 24.9912 20.9773 25.1051 20.9333 25.2114C20.8893 25.3176 20.8248 25.4142 20.7435 25.4955L18.737 27.5002L20.7435 29.505C20.9077 29.6692 21 29.892 21 30.1242C21 30.3565 20.9077 30.5793 20.7435 30.7435C20.5793 30.9077 20.3565 31 20.1242 31C19.892 31 19.6692 30.9077 19.505 30.7435L17.5002 28.737L15.4955 30.7435C15.3313 30.9077 15.1085 31 14.8762 31C14.644 31 14.4212 30.9077 14.257 30.7435C14.0927 30.5793 14.0005 30.3565 14.0005 30.1242C14.0005 29.892 14.0927 29.6692 14.257 29.505L16.2635 27.5002L14.257 25.4955C14.1755 25.4142 14.1109 25.3177 14.0668 25.2115C14.0227 25.1052 14 24.9913 14 24.8762C14 24.7612 14.0227 24.6473 14.0668 24.541C14.1109 24.4347 14.1755 24.3382 14.257 24.257Z M26.257 13.257C26.3382 13.1755 26.4347 13.1109 26.541 13.0668C26.6473 13.0227 26.7612 13 26.8762 13C26.9913 13 27.1052 13.0227 27.2115 13.0668C27.3177 13.1109 27.4142 13.1755 27.4955 13.257L29.5002 15.2635L31.505 13.257C31.5863 13.1756 31.6828 13.1111 31.7891 13.0671C31.8953 13.0231 32.0092 13.0005 32.1242 13.0005C32.2392 13.0005 32.3531 13.0231 32.4594 13.0671C32.5656 13.1111 32.6622 13.1756 32.7435 13.257C32.8248 13.3383 32.8893 13.4348 32.9333 13.5411C32.9773 13.6473 33 13.7612 33 13.8762C33 13.9912 32.9773 14.1051 32.9333 14.2114C32.8893 14.3176 32.8248 14.4142 32.7435 14.4955L30.737 16.5002L32.7435 18.505C32.9077 18.6692 33 18.892 33 19.1242C33 19.3565 32.9077 19.5793 32.7435 19.7435C32.5793 19.9077 32.3565 20 32.1242 20C31.892 20 31.6692 19.9077 31.505 19.7435L29.5002 17.737L27.4955 19.7435C27.3313 19.9077 27.1085 20 26.8762 20C26.644 20 26.4212 19.9077 26.257 19.7435C26.0927 19.5793 26.0005 19.3565 26.0005 19.1242C26.0005 18.892 26.0927 18.6692 26.257 18.505L28.2635 16.5002L26.257 14.4955C26.1755 14.4142 26.1109 14.3177 26.0668 14.2115C26.0227 14.1052 26 13.9913 26 13.8762C26 13.7612 26.0227 13.6473 26.0668 13.541C26.1109 13.4347 26.1755 13.3382 26.257 13.257Z M26.257 25.257C26.3382 25.1755 26.4347 25.1109 26.541 25.0668C26.6473 25.0227 26.7612 25 26.8762 25C26.9913 25 27.1052 25.0227 27.2115 25.0668C27.3177 25.1109 27.4142 25.1755 27.4955 25.257L29.5002 27.2635L31.505 25.257C31.5863 25.1756 31.6828 25.1111 31.7891 25.0671C31.8953 25.0231 32.0092 25.0005 32.1242 25.0005C32.2392 25.0005 32.3531 25.0231 32.4594 25.0671C32.5656 25.1111 32.6622 25.1756 32.7435 25.257C32.8248 25.3383 32.8893 25.4348 32.9333 25.5411C32.9773 25.6473 33 25.7612 33 25.8762C33 25.9912 32.9773 26.1051 32.9333 26.2114C32.8893 26.3176 32.8248 26.4142 32.7435 26.4955L30.737 28.5002L32.7435 30.505C32.9077 30.6692 33 30.892 33 31.1242C33 31.3565 32.9077 31.5793 32.7435 31.7435C32.5793 31.9077 32.3565 32 32.1242 32C31.892 32 31.6692 31.9077 31.505 31.7435L29.5002 29.737L27.4955 31.7435C27.3313 31.9077 27.1085 32 26.8762 32C26.644 32 26.4212 31.9077 26.257 31.7435C26.0927 31.5793 26.0005 31.3565 26.0005 31.1242C26.0005 30.892 26.0927 30.6692 26.257 30.505L28.2635 28.5002L26.257 26.4955C26.1755 26.4142 26.1109 26.3177 26.0668 26.2115C26.0227 26.1052 26 25.9913 26 25.8762C26 25.7612 26.0227 25.6473 26.0668 25.541C26.1109 25.4347 26.1755 25.3382 26.257 25.257Z" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                </div>
                <div className="col-12 col-md-6">
                  {/* <span className="book-text ps-4 pe-1">12</span> */}
                  <Link to="/training/reproduce">
                    <div className="card mt-auto card-text-lr card-btn overflow-box bg-card-second">
                      <div className="card-body text-start text-white">
                        <span>Узнаваемость</span>
                      </div>
                      <div className="svg-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-keyboard" viewBox="0 0 16 16" >
                          <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                          <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25z" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default TrainingCard;
