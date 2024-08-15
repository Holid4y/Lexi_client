import { useState } from 'react';
import SVG from '../components/Icons/SVG';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-buttons-container">
        <button className="btn main-button" onClick={toggleButtons}>
            <SVG name="plus" />
        </button>
        <button className={`btn floating-button left-button ${isOpen ? 'open' : ''}`} >
            <SVG name="words_m" />
        </button>
        <button className={`btn floating-button right-button ${isOpen ? 'open' : ''}`}>
            <SVG name="book_m" />
        </button>
    </div>
  );
};

export default FloatingButtons;
