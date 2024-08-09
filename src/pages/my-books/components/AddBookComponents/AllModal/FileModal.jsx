import React from "react";

function FileModal() {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Здесь вы можете обработать выбранный файл
        console.log(file);
    };
    return (
        <>
            <p>Загрузите файл формата <b>.txt</b></p>
            <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
                onChange={handleFileChange}
            />
        </>
    );
}

export default FileModal;
