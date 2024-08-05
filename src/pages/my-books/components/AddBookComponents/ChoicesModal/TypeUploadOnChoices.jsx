import React from "react";
import SVG from "../../../../../common/components/Icons/SVG";

function TypeUploadOnChoices({ dataBsTarget, title, description, svgName }) {
    // Функция для обработки клика
    const handleClick = () => {
        console.log(dataBsTarget); // Логируем значение title
    };

    return (
        <li type="button" className="d-flex gap-4 align-items-center btn-card" data-bs-target={dataBsTarget} data-bs-toggle="modal" onClick={handleClick}>
            <div className="icon-40x40">
                <SVG name={svgName} />
            </div>
            <div>
                <h5 className="mb-0">{title}</h5>
                {description}
            </div>
        </li>
    );
}

export default TypeUploadOnChoices;
