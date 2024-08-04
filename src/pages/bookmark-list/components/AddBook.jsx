import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { fetchBookPost } from "../../../common/reducers/bookRetrieveSlice";
import { fetchMyBooks } from "../../../common/reducers/booksSlice";

import Head from "./AddBookComponents/Head";
import Choices from './AddBookComponents/Choices';
import FileButton from './AddBookComponents/FileButton';
import TextArea from './AddBookComponents/TextArea';
import NameBookInput from './AddBookComponents/NameBookInput';
import AuthorBookInput from './AddBookComponents/AuthorBookInput';
import IsPrivetButton from './AddBookComponents/IsPrivetButton';
import AddButton from './AddBookComponents/AddButton';

const AddBook = () => {
    const dispatch = useDispatch()

    const [choice, setChoise] = useState(null);
    
    const [text, setText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [bookName, setBookName] = useState('');

    const [isCorrectUpload, setIsCorrectUpload] = useState(null)

    const handleChoiceSelect = (value) => {
        setChoise(value);
    };
    const handleClose = () => {
        setChoise(null);
        setIsCorrectUpload(null)
        if (isCorrectUpload) {
            dispatch(fetchMyBooks())
        }
    };

    function handleSubmit() {
        const data = {
            "title": bookName, 
            "author": authorName, 
            "book": text
        }
        dispatch(fetchBookPost(data))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    setIsCorrectUpload(true)
                    setChoise(null);
                } else if (response.meta.requestStatus === "rejected") {
                    console.log("Что-то не верно");
                }
            })
            .catch((error) => {
                console.error("Ошибка при выполнении запроса:", error);
            });      
    };

    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow">
                    <Head doClose={handleClose}/>
                    <div className="modal-body p-5">
                        <Choices onChoiceSelect={handleChoiceSelect} />
                        {choice === "file" && <FileButton />}
                        {choice === "text" && <TextArea onTextChange={setText} />}
                        {choice &&
                            <>
                                <hr className="my-4" />
                                <NameBookInput onTextChange={setBookName}/>
                                <AuthorBookInput onTextChange={setAuthorName}/>

                                {/* В разработке */}
                                {/* <IsPrivetButton /> */}
                                {/* В разработке */}

                                <AddButton onSubmit={handleSubmit}/>
                            </>   
                        }
                        {isCorrectUpload && 'OK'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
