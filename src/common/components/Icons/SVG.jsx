import React from 'react';
import icons from './Icons';

function SVG({ name }) {
    return icons[name] || null;
}

export default SVG;
