import React from "react";
import TypeUploadOnChoices from "./TypeUploadOnChoices";

const Choices = () => {
    return (
        <ul className="d-grid gap-4 list-unstyled small">
            <TypeUploadOnChoices dataBsTarget={"#AddBookModalFile"} title={'Файл'} description={'Выберите файл с расширением .epub, .txt, .docx, .fb2'} svgName={"txt_file"}/>
            <TypeUploadOnChoices dataBsTarget={"#AddBookModalText"} title={'Текст'} description={'Скопируйте или напишите текст на английском'} svgName={"txt_text"}/>
            <TypeUploadOnChoices dataBsTarget={"#AddBookModalVideo"} title={'Видео'} description={'Вставьте ссылку с YouTube'} svgName={"film"}/>
            <hr />
            <TypeUploadOnChoices dataBsTarget={"#AddBookModalWord"} title={'Слово'} description={'Напишите слово, которое хотите добавить'} svgName={"words"}/>
        </ul>
    );
};

export default Choices;
