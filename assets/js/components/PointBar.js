import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {localStringsPropTypes} from '../data/propTypes';
import PointCard from './PointCard';

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const PointBar = (props) => {
    const [points, setPoints] = React.useState([]);
    const {pointTypes, moveMapPosition, position} = props;

    const handleSidebarMarkerClick = (e, point) => {
        moveMapPosition(e, point.position);
    };

    const calculateDistance = (to) => {
        return Math.abs(position.latitude - to.latitude) + Math.abs(position.longitude - to.longitude);
    };

    React.useEffect(() => {
        const newPoints = [];
        pointTypes.map((pointType) => {
            pointType.points.map((point, index) => {
                newPoints.push({...point, type: pointType.name, index: index});
            });
        });
        setPoints(newPoints.sort((a, b) => {
            return calculateDistance(a.position) - calculateDistance(b.position);
        }));
    }, [pointTypes, position]);

    return <CardContainer>
            {points.map((point, index) => <PointCard
                    point={point}
                    key={index}
                    selected={index === 0}
                    handleSidebarMarkerClick={handleSidebarMarkerClick}
                    userPosition={props.userPosition}
                    localStrings={props.localStrings}
                />,
            )}
    </CardContainer>;
};

PointBar.propTypes = {
    pointTypes: PropTypes.array.isRequired, // TODO: arrayOf shape
    moveMapPosition: PropTypes.func.isRequired,
    position: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}).isRequired,
    userPosition: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}),
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default PointBar;
