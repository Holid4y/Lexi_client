import React, { useState } from "react";
import Navigation from "../../../common/components/Navigation";

function shuffleText(text) {
  return text.split('').sort(() => Math.random() - 0.5).join('');
}

function Reproduce() {
  const [buttonClasses, setButtonClasses] = useState("form-control py-2 disabled placeholder");
  const [buttonText, setButtonText] = useState("white");
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClasses("form-control py-2");
    setButtonText(shuffleText(buttonText));
    setIsClicked(true);
  };

  return (
    <div className="align-items-center">
      <div className="container navbar-blur sticky-top mb-4 pt-4">
        <span className="block_week py-4">
          <button className="btn btn-primary me-2 px-3">7</button> | <button className="btn btn-primary ms-2 px-3">10</button>
        </span>
      </div>

      <main className="container px-4">
        <div className="card statistic mb-5 pt-3">
          <h4 className="text-center p-2 fs-2">Белый</h4>
          <span className="fs-6">L4</span>
        </div>

        <div className="mb-4">
          <h3 className="text-center mb-3">Напишите ответ</h3>
          <input type="text" className="form-control py-2-5 mb-2"/>
        </div>

        <button className="btn btn-success w-100 py-2 mb-5">
          Ответить
        </button>

        <div className="mb-4">
          <button 
            type="text" 
            className={buttonClasses} 
            onClick={handleButtonClick} 
            disabled={isClicked}
          >
            <h1>{buttonText}</h1>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Reproduce;