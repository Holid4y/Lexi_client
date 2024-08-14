import React from 'react';

const FormTheme = ({ themeState, theme, handleThemeChange }) => (
    <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center animated-block-leftright">
        {themeState === theme ? "" : "*"}
        <select className="form-select ps-0" value={themeState} onChange={handleThemeChange}>
            <option value={theme}>Выбор темы</option>
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
            <option value="green">Зеленая</option>
            <option value="red">Красная</option>
        </select>
        
    </div>
);

export default FormTheme;
