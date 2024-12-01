import React from 'react';
import {PoiIconFunction} from '../../Types/types';

const ExampleMarker1: PoiIconFunction = (props): React.JSX.Element => {
    return <svg xmlns="http://www.w3.org/2000/svg"
                {...props.style}
                viewBox="0 0 24 24">
        <defs/>
        <rect transform="translate(2.16, 1.68)"
              fill="none"
              stroke="#75ff0d"
              strokeWidth="9.6"
              strokeLinecap="square"
              strokeLinejoin="bevel"
              width="19.92"
              height="20.64"/>
    </svg>;
};

export default ExampleMarker1;
