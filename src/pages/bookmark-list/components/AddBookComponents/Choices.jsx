import React from 'react';
import SVG from '../../../../common/components/Icons/SVG';

const Choices = ({ onChoiceSelect }) => (
  <ul className="d-grid gap-4 mb-4 list-unstyled small">
    <li 
        className="d-flex gap-4"  
        style={{ padding: '10px', cursor: 'pointer' }} 
        onClick={() => onChoiceSelect('file')}
    >
      <SVG name="txt_file" />
      <div>
        <h5 className="mb-0">Загрузить файл</h5>
        .txt
      </div>
    </li>
    <h1>Или</h1>
    <li 
        className="d-flex gap-4" 
        style={{ padding: '10px', cursor: 'pointer' }} 
        onClick={() => onChoiceSelect('text')}
    >
      <SVG name="input_cursor_text" />
      <div>
        <h5 className="mb-0">Текст</h5>
        Напишите или вставьте свой текст
      </div>
    </li>
  </ul>
);

export default Choices;
