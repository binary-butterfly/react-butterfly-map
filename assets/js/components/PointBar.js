import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {localStringsPropTypes} from '../data/propTypes';
import ControlCard from './ControlCard';
import PointCard from './PointCard';

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;

  @media(max-width: 700px) {
    flex-direction: column;
  }
`;

const PointContainer = styled.div`
  display: flex;
  width: 100%;
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
            <ControlCard options={props.typeOptions}
                         setOptions={props.setTypeOptions}
                         showClosedRightNow={props.showClosedRightNow}
                         showAllTypes={props.showAllTypes}
                         handleOptionClick={props.handleTypeOptionClick}
                         handleShowAllClick={props.handleShowAllTypesClick}
                         handleShowClosedRightNowClick={props.handleShowClosedRightNowClick}
                         localStrings={props.localStrings}
            />
        <PointContainer>
            {points.map((point, index) => <PointCard
                    point={point}
                    key={index}
                    selected={index === 0}
                    handleSidebarMarkerClick={handleSidebarMarkerClick}
                    userPosition={props.userPosition}
                    localStrings={props.localStrings}
                />,
            )}
        </PointContainer>
    </CardContainer>;
};

PointBar.propTypes = {
    pointTypes: PropTypes.array.isRequired, // TODO: arrayOf shape
    typeOptions: PropTypes.array.isRequired, // TODO: arrayOf shape
    showClosedRightNow: PropTypes.bool.isRequired,
    showAllTypes: PropTypes.bool.isRequired,
    handleTypeOptionClick: PropTypes.func.isRequired,
    handleShowAllTypesClick: PropTypes.func.isRequired,
    handleShowClosedRightNowClick: PropTypes.func.isRequired,
    moveMapPosition: PropTypes.func.isRequired,
    position: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}).isRequired,
    userPosition: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}),
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default PointBar;
