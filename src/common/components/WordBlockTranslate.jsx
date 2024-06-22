import React, {useEffect} from "react";

function BlockContent() {

  return (
    <div id="my-block" className="toggle-block">
        <div className="px-3 py-2">
            <div>
                <span className="fs-2 pe-3"><b>White</b></span>
                <span>[waɪt] прил </span>
            </div>
            <span>
                <b>Белый</b>
                <input className="form-check-input" type="checkbox" value="" />
            </span>
            <hr />
            <span>следить, увидеть, видеть, понаблюдать, смотреть, рассматривать, пронаблюдать, соблюдать, придерживаться, соблюсти, следовать, прослеживать, проследить, блюсти</span>
            <hr />
            <span>watch, see, keep watch, notice, note, follow, adhere, keep, trace</span>
        </div>
    </div>
  );
}

export default BlockContent;
