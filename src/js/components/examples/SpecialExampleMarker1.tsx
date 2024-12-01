import React from 'react';
import {PoiIconFunction} from '../../Types/types';

const SpecialExampleMarker1: PoiIconFunction = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 7.68 7.68"
                {...props.style}>
        <defs/>
        <path transform="translate(2.83500017143878, 2.83500017143878)"
              fill="none"
              stroke="#cbff12"
              strokeWidth="7.2"
              strokeLinecap="square"
              strokeLinejoin="bevel" d="M0 0L1.53 0L1.515 1.485L0.18 1.47Z"/>
        <path transform="translate(3.40500020590796, 3.51000021225754)"
              fill="none"
              stroke="#cbff12"
              strokeWidth="7.2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              d="M0.78 0.6L0.78 0.6L0 0Z"/>
        <path transform="translate(3.84, 3.84)"
              fill="none"
              stroke="#cbff12"
              strokeWidth="7.2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              d="M0 1.095L1.29 1.125L1.26 0L0 0Z"/>
        <circle transform="translate(2.4, 1.92)"
                r="0.24"
                cx="0.24"
                cy="0.24"
                fill="none"
                stroke="#3e7bd7"
                strokeWidth="0.7272"
                strokeLinecap="square"
                strokeLinejoin="bevel"/>
        <ellipse transform="translate(5.04, 1.92)"
                 rx="0.24"
                 ry="0.24"
                 cx="0.24"
                 cy="0.24"
                 fill="none"
                 stroke="#3e7bd7"
                 strokeWidth="0.7272"
                 strokeLinecap="square"
                 strokeLinejoin="bevel"/>
    </svg>;
};

export default SpecialExampleMarker1;
