import React from 'react';
import { useSelector } from 'react-redux';

function FormList() {
    const { form } = useSelector((state) => state.word);

    // Проверка на существование и непустоту поля form
    if (!form || form.trim() === '') {
        return null;
    }

    return (
        <div>
            <b>Формы слова:</b>
            <br />
            <span className="pe-2 text-break">
                {form}
            </span>
            <hr />
        </div>
    );
}

export default FormList;
