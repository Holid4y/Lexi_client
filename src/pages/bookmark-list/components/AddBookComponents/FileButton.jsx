import React from 'react';

function FileButton() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Здесь вы можете обработать выбранный файл
    console.log(file);
  };

  return (
    <input
      className="form-control form-control-lg"
      id="formFileLg"
      type="file"
      onChange={handleFileChange} // Добавлен обработчик события onChange
    />
  );
}

export default FileButton;
