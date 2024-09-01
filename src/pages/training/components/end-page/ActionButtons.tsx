import React from 'react';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
    countWordToTraining: number;
    type: string;
    handleAction: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ countWordToTraining, type, handleAction }) => {
    
    return (
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            {countWordToTraining !== 0 && countWordToTraining != null ? (
                <Link to={`/training/${type}`}>
                    <button className="btn btn-primary px-4 w-100" onClick={handleAction}>
                        Следующий раунд
                    </button>
                </Link>
            ) : null}
            <Link to="/training" onClick={handleAction}>
                <button className="btn btn-secondary px-4 w-100" onClick={handleAction}>
                    Выйти
                </button>
            </Link>
        </div>
    );
};

export default ActionButtons;