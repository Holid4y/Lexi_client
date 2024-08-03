import React, { useEffect, useState } from "react";

import AvatarLib from "avataaars";

import OptionsAvatar from "./OptionsAvatar";

function AvatarModal() {
    // State для хранения настроек аватара
    const [avatarOptions, setAvatarOptions] = useState({
        topType: "ShortHairShortWaved",
        accessoriesType: "Prescription02",
        hairColor: "BrownDark",
        facialHairType: "Blank",
        clotheType: "Hoodie",
        clotheColor: "PastelBlue",
        eyeType: "Happy",
        eyebrowType: "Default",
        mouthType: "Smile",
        skinColor: "Light",
        avatarStyle: "Transparent",
    });

    // Рендер аватара
    const renderAvatar = () => {
        return <AvatarLib className="avatar" {...avatarOptions} />;
    };

    // Хэндлеры для изменения аватара
    const handleAvatarChange = (attribute, value) => {
        setAvatarOptions((prevOptions) => ({
            ...prevOptions,
            [attribute]: value,
        }));
    };

    return (
        <div className="modal fade" id="avatarModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Редактирование
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-4">

                            <div className="col-5">
                                {renderAvatar()}
                            </div>

                            <div className="col-7">
                                {<OptionsAvatar handleAvatarChange={handleAvatarChange}/>}
                            </div>
                            
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvatarModal;
