import React from "react";

function FileModal({ file, setFile }) {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <>
            <p>Загрузите файл формата <b>.epub, .txt, .docx, .fb2</b></p>
            <input
                className="form-control form-control-lg"
                id="formFileLg"
                name="file"
                type="file"
                onChange={handleFileChange}
                accept=".epub,.txt,.docx,.fb2"
                required
            />
        </>
    );
}

export default FileModal;
