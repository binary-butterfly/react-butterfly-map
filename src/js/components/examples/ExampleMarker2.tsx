import React from 'react';
import {PoiIconFunction} from '../../Types/types';

const ExampleMarker2: PoiIconFunction = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                {...props.style}>
        <defs/>
        <rect transform="translate(2.16, 1.68)"
              fill="none"
              stroke="#75ff0d"
              strokeWidth="9.6"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              width="19.92"
              height="20.64"/>
        <rect transform="translate(1.92, 1.2)"
              fill="none"
              stroke="#df0fff"
              strokeWidth="9.6"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              width="20.64"
              height="21.6"/>
        <rect transform="translate(3.12, 2.88)"
              fill="none"
              stroke="#df0fff"
              strokeWidth="9.6"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              width="17.76"
              height="19.44"/>
    </svg>;
};

export default ExampleMarker2;
