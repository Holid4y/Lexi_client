import { useState } from 'react';
import SVG from '../../Icons/SVG';

import AddBookModal from "./components/AddBookModal";
import BaseModal from "./components/AddBookComponents/AllModal/BaseModal";

import FileModal from "./components/AddBookComponents/AllModal/FileModal";
import TextModal from "./components/AddBookComponents/AllModal/TextModal";
import WordModal from "./components/AddBookComponents/AllModal/WordModal";
import VideoModal from "./components/AddBookComponents/AllModal/VideoModal";

import { myBooks as myBooksPath } from "../../../../../public/urls";

const FloatingButtons = () => {
  const [file, setFile] = useState(null);

  return (
    <div>
          <div className="floating-buttons-container">
              <button className="btn button-main" data-bs-toggle="modal" data-bs-target="#AddBookModal">
                  <SVG name="plus" />
              </button>
          </div>

          <div>
            <AddBookModal />
            <BaseModal
                  idName={"AddBookModalFile"}
                  childComponent={<FileModal file={file} setFile={setFile} />}
                  ariaLabelledby={"AddBookModalFileSelected"}
                  title={"Файл"}
              />
              <BaseModal
                  idName={"AddBookModalText"}
                  childComponent={<TextModal />}
                  ariaLabelledby={"AddBookModalTextSelected"}
                  title={"Текст"}
              />
              <BaseModal
                  idName={"AddBookModalWord"}
                  childComponent={<WordModal />}
                  ariaLabelledby={"AddBookModalTextSelected"}
                  title={"Слово"}
              />
              <BaseModal
                  idName={"AddBookModalVideo"}
                  childComponent={<VideoModal />}
                  ariaLabelledby={"AddBookModalVideoSelected"}
                  title={"Видео"}
              />
          </div>
    </div>
  );
};

export default FloatingButtons;
