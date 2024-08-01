import React from 'react';

const TextArea = () => (
  <>
    <h2 className="fw-bold mb-4">Напишите текст</h2>
    <div className="text-center">
      <textarea
        className="form-control w-100"
        placeholder="Once upon a time there was a dear little girl..."
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
  </>
);

export default TextArea;
