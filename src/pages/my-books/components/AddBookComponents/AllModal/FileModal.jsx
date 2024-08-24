import React from "react";
import { useDispatch } from "react-redux";
import { setFile } from "../../../../../common/reducers/addBookModalSlice";

function FileModal() {
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        dispatch(setFile(file));
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
                required // Ограничиваем типы файлов
            />
        </>
    );
}

export default FileModal;
