import React, { useState } from "react";
import SVG from "../../../common/components/Icons/SVG";
import Trash from "./Trash";
import EditBookModal from "./EditBookModal"; // Импортируем модальное окно для редактирования
import { BookCover } from "../../../common/reducers/booksSlice";


// Определяем интерфейс для пропсов Dropdown
interface DropdownProps {
    book: BookCover; // Тип книги
    index: number; // Индекс книги
}

const Dropdown: React.FC<DropdownProps> = ({ book, index }) => {
    const [notification, setNotification] = useState<React.ReactNode>(null);
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false); // Состояние для управления модальным окном

    const handleEditClick = () => {
        setEditModalOpen(true); // Открыть модальное окно при клике на "Редактировать"
    };

    return (
        <>
            <div>
                <button className="position-absolute translate-middle mark_settings btn" data-bs-toggle="dropdown" aria-expanded="false">
                    <SVG name="dot_settings" />
                </button>
                <ul className="dropdown-menu text-small shadow p-2">
                    <li>
                        <button className="dropdown-item" onClick={handleEditClick}>
                            Редактировать
                        </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Trash book={book} index={index} setNotification={setNotification} /></li>
                </ul>
            </div>
            {notification}
            <EditBookModal
                show={isEditModalOpen}
                onClose={() => setEditModalOpen(false)} // Закрытие модального окна
                book={book} // Передаем данные книги в модальное окно
            />
        </>
    );
};

export default Dropdown;