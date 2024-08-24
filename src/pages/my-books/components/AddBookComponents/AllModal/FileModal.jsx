import React from "react";

function FileModal({ onFileChange }) {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileChange(file); // Передаем файл в локальное состояние `AddButton`
    };

    return (
        <>
            <p>Загрузите файл формата <b>.epub, .txt, .docx, .fb2</b></p>
            <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
                onChange={handleFileChange}
                accept=".epub,.txt,.docx,.fb2" // Ограничиваем типы файлов
            />
        </>
    );
}

export default FileModal;
