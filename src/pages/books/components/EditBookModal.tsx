import React, { useState, useEffect } from "react";
import { BookCover } from "../../../common/reducers/booksSlice";


// Определяем интерфейс для пропсов EditBookModal
interface EditBookModalProps {
    show: boolean; // Показывать модальное окно или нет
    onClose: () => void; // Функция для закрытия модального окна
    book: BookCover; // Данные книги
}

const EditBookModal: React.FC<EditBookModalProps> = ({ show, onClose, book }) => {
    const [author, setAuthor] = useState<string>(book.author || "");
    const [title, setTitle] = useState<string>(book.title || "");
    // благодаря типизации, тебе ts подсказывает что свойство "text" не существует в типе "BookCover"
    // у меня back не возвращает на обычный список книг еще и текст для них. это было бы не уместно
    // поэтому надо брасть book.slug и делать запрос на fetchBook чтобы получить собственно текст этой книги 
    const [text, setText] = useState<string>(book.text || "");

    useEffect(() => {
        if (show) {
            // Обновляем состояние, когда модальное окно открыто
            setAuthor(book.author);
            setTitle(book.title);
            setText(book.text || ""); // Убедитесь, что текст не равен undefined
            console.log(book);
        }
    }, [show, book]);

    const handleSave = () => {
        // Здесь должна быть реализация сохранения
        // api для изменения книги я еще не написал.
        console.log("Сохранить изменения", { author, title, text });
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal modal-lg show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Редактировать книгу</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 text-start">
                            <label htmlFor="author" className="form-label pb-0 mb-2">Автор книги</label>
                            <input
                                type="text"
                                className="form-control form-control-lg py-3 mt-0"
                                id="author"
                                placeholder="Автор книги"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="title" className="form-label pb-0 mb-2">Название книги</label>
                            <input
                                type="text"
                                className="form-control form-control-lg py-3 mt-0"
                                id="title"
                                placeholder="Название книги"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="text" className="form-label pb-0 mb-2">Текст книги</label>
                            <textarea
                                className="form-control form-control-lg py-3 mt-0"
                                id="text"
                                rows={10}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Отменить
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBookModal;