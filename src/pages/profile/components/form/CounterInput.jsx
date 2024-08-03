import React from 'react';
import SVG from '../../../../common/components/Icons/SVG';

const CounterInput = ({ localState, state, handleIncrement, handleDecrement, label }) => {

    return (
        <div>
            <span className="ps-2">{localState === state ? label : `${label} *`}</span>
            <div className="input-group mb-2">
                <input type="number" className="form-control py-2-5" defaultValue={localState} />
                <button className="btn btn-primary-light" onClick={handleIncrement} type="button">
                    <SVG name={'plus'} />
                </button>
                <button className="btn btn-primary-light" onClick={handleDecrement} type="button">
                    <SVG name={'minus'} />
                </button>
            </div>
        </div>
    );
};

export default CounterInput;
