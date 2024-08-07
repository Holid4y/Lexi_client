import React from 'react';
import { useSelector } from 'react-redux';

import SmallTranslationWord from './SmallTranslationWord';

function TranslationsList() {
    const { pk, related_pk, translations } = useSelector((state) => state.word);

    const TranslationsView = <div>
        <b>Переводы:</b>
        <br />
        {translations.map(
            (translation, index) => index !== 0 && <SmallTranslationWord wordPk={pk} related_pk={related_pk} translation={translation} key={index} />
        )}
    </div>

    function isExist() {
        return translations.length > 1
    }

    return <>{isExist() && TranslationsView}</>
}

export default TranslationsList;
