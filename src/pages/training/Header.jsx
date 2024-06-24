import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const { training, round } = useSelector((state) => state.training);

  return (
    <div className="container navbar-blur sticky-top mb-4 pt-4">
      <span className="block_week py-4">
        <button className="btn btn-primary me-2 px-3">{round + 1}</button> |{" "}
        <button className="btn btn-primary ms-2 px-3">
          {training ? training.length : 0}
        </button>
      </span>
    </div>
  );
}

export default Header;
