import React from 'react';
import Loading from '../../../common/components/Treatment/Loading';

const SubmitButton = ({ text, handle, disabled, loading }) => (
    <button 
        type="button" 
        className="btn-main mt-4" 
        onClick={handle} 
        disabled={disabled}
        style={{
            padding: '0px 45px',
            height: '40px',
            minWidth: '145px',
        }}
    >
        {loading ? <Loading /> : <span className='fw-bold'>{text}</span>}
    </button>
);

export default SubmitButton;
