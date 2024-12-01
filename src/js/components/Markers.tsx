import React from 'react';
import {Marker} from 'react-map-gl/maplibre';
import {PointOfInterest, Position} from '../Types/types';
import styled from 'styled-components';

type MarkersProps = {
    pointsOfInterest: PointOfInterest[],
    handleMapMarkerClick: (position: Position) => void,
}

const Markers = React.memo((props: MarkersProps): React.JSX.Element => {
    const {pointsOfInterest, handleMapMarkerClick} = props;

    return <>
        {pointsOfInterest.map((point) =>
            <PointerDiv id={'react-butterfly-map-pointer-' + point.uuid} key={point.uuid}>
                <Marker onClick={() => handleMapMarkerClick(point.position)} {...point.position}>
                        <point.MarkerComponent style={{height: '50px', width: '50px'}}/>
                </Marker>
            </PointerDiv>,
        )}
    </>;
});

const PointerDiv = styled.div`
    cursor: pointer;
`;

export default Markers;
