import React, { useState, useEffect } from "react";
import SVG from "../Icons/SVG";
import Loading from "../Treatment/Loading";

function Audio({ word }) {
    const [loading, setLoading] = useState(true); // Начальное состояние - загрузка
    const [audioUrls, setAudioUrls] = useState(null); // Состояние для хранения объекта с URL аудио

    useEffect(() => {
        async function fetchDictionaryapi() {
            setLoading(true);
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const data = await response.json();
                const audioUrls = getAudio(data);
                setAudioUrls(audioUrls); // Сохраняем объект с URL аудио
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        fetchDictionaryapi(); // Вызов функции при монтировании компонента
    }, [word]); // Зависимость от слова, чтобы повторно вызывать при изменении

    function getAudio(data) {
        if (data && data.length > 0) {
            const phonetics = data[0].phonetics;

            let audioUrlUk = '';
            let audioUrlUs = '';

            for (const phonetic of phonetics) {
                if (phonetic.audio) {
                    // Проверяем окончание аудио файла и сохраняем в соответствующие переменные
                    if (phonetic.audio.endsWith("uk.mp3")) {
                        audioUrlUk = phonetic.audio;
                    } else if (phonetic.audio.endsWith("us.mp3")) {
                        audioUrlUs = phonetic.audio;
                    }
                }
            }

            // Если ни одна запись не содержит .mp3 в конце, делаем неактивной
            if (!audioUrlUk && !audioUrlUs) {
                return null; // Возвращаем null, если нет доступных аудио
            }

            // Возвращаем объект с URL для дальнейшего использования
            return { audioUrlUk, audioUrlUs };
        }
        return null;
    }

    function PlayAudio(audio) {
        if (audio) {
            const audioElement = new window.Audio(audio); // Используем window.Audio
            audioElement.play();
        }
    }

    const handleClick = (audioUrl) => {
        if (audioUrl) {
            PlayAudio(audioUrl);
        } 
    };

    const AudioButton = () => (
        <>
            <button
                className={`btn btn-sm ${audioUrls?.audioUrlUk ? "" : "audio-disable"}`}
                style={{ opacity: audioUrls?.audioUrlUk ? 1 : 0.2 }}
                onClick={() => handleClick(audioUrls.audioUrlUk)}>
                <SVG name="uk" />
            </button>
            <button
                className={`btn btn-sm ${audioUrls?.audioUrlUs ? "" : "audio-disable"}`}
                style={{ opacity: audioUrls?.audioUrlUs ? 1 : 0.2 }}
                onClick={() => handleClick(audioUrls.audioUrlUs)}>
                <SVG name="us" />
            </button>
        </>
    );

    return <div>{loading ? <Loading /> : <AudioButton />}</div>;
}

export default Audio;