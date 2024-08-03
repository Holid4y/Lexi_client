// LevelList.js
import React from "react";
import LevelItem from "./LevelItem";

function LevelList({ levels, handleIncrementLevel, handleDecrementLevel, handleDeleteLevel }) {
  return (
    <div>
      {levels && levels.map((level, index) => (
        <LevelItem
          key={index}
          level={level}
          index={index}
          handleIncrementLevel={handleIncrementLevel}
          handleDecrementLevel={handleDecrementLevel}
          handleDeleteLevel={handleDeleteLevel}
        />
      ))}
    </div>
  );
}

export default LevelList;
