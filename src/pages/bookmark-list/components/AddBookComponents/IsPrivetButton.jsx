import React from 'react';

const IsPrivetButton = () => (
  <div className="form-check form-switch mt-3">
    <input
      className="form-check-input"
      type="checkbox"
      role="switch"
      id="flexSwitchCheckDefault"
    />
    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
      Приватная книга \ текст
    </label>
  </div>
);

export default IsPrivetButton;
