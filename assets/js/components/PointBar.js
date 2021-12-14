import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {localStringsPropTypes} from '../data/propTypes';
import Pagination from './Pagination';
import PointCard from './PointCard';

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    justify-content: space-around;
  }
`;

const PointBar = (props) => {
    const [points, setPoints] = React.useState([]);
    const [entriesPerPage, _setEntriesPerPage] = React.useState(window.innerWidth < 1000 ? 2 : 5);
    const {pointTypes, moveMapPosition, position, page, setPage} = props;

    const setEntriesPerPage = (newEntriesPerPage) => {
        _setEntriesPerPage(newEntriesPerPage);
        setPage(1);
    }

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

        if (newPoints.length !== points.length) {
            setPage(1);
        }

        setPoints(newPoints.sort((a, b) => {
            return calculateDistance(a.position) - calculateDistance(b.position);
        }));
    }, [pointTypes, position]);

    let paginatedPoints = [];
    for (let c = 0; c < entriesPerPage; c++) {
        const point = points[entriesPerPage * (page - 1) + c];
        if (point === undefined) {
            break;
        }
        paginatedPoints.push(point);
    }

    return <>
        <CardContainer>
            {paginatedPoints.map((point, index) => <PointCard
                    point={point}
                    key={index}
                    selected={page === 1 && index === 0}
                    handleSidebarMarkerClick={handleSidebarMarkerClick}
                    userPosition={props.userPosition}
                    localStrings={props.localStrings}
                />,
            )}
        </CardContainer>
        <Pagination page={page}
                    setPage={setPage}
                    entriesPerPage={entriesPerPage}
                    setEntriesPerPage={setEntriesPerPage}
                    entryCount={points.length}
                    localStrings={props.localStrings}
        />
    </>;
};

PointBar.propTypes = {
    pointTypes: PropTypes.array.isRequired, // TODO: arrayOf shape
    moveMapPosition: PropTypes.func.isRequired,
    position: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}).isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    userPosition: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}),
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default PointBar;
