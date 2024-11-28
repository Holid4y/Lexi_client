import React from "react";


import AuthorBookInput from "../common/AuthorBookInput";
import NameBookInput from "../common/NameBookInput";
import IsPrivet from "../common/IsPrivetButton";
import AddButton from "../common/AddButton";

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
                <AuthorBookInput />
                <NameBookInput  />
                <IsPrivet />

                <AddButton file={file} />
        </>
    );
}

export default FileModal;
