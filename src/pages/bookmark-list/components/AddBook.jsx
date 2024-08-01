import React, { useState } from "react";
import SVG from "../../../common/components/Icons/SVG";

import Head from "./AddBookComponents/Head";
import Choices from './AddBookComponents/Choices';
import FileButton from './AddBookComponents/FileButton';
import TextArea from './AddBookComponents/TextArea';
import NameBookInput from './AddBookComponents/NameBookInput';
import AuthorBookInput from './AddBookComponents/AuthorBookInput';
import IsPrivetButton from './AddBookComponents/IsPrivetButton';
import AddButton from './AddBookComponents/AddButton';

const AddBook = () => {
    const [choice, setChoise] = useState(null);

    const handleChoiceSelect = (value) => {
        setChoise(value);
    };
    const handleClose = (value) => {
        setChoise(value);
    };
    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow">

                    <Head doClose={handleClose}/>

                    <div className="modal-body p-5">
                        <Choices onChoiceSelect={handleChoiceSelect} />

                        {choice === "file" && <FileButton />}
                        {choice === "text" && <TextArea />}

                        {choice &&
                            <>
                                <hr className="my-4" />
                                <NameBookInput />
                                <AuthorBookInput />
                                {/* В разработке */}
                                {/* <IsPrivetButton /> */}
                                {/* В разработке */}
                                <AddButton />
                            </>   
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
