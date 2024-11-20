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
    const [entriesPerPage, _setEntriesPerPage] = React.useState(window.innerWidth < 1000 ? 4 : 8);
    const {page, setPage, displayPoints, userPosition, localStrings, handlePointBarMarkerClick} = props;

    const setEntriesPerPage = (newEntriesPerPage) => {
        _setEntriesPerPage(newEntriesPerPage);
        setPage(1);
    }

    let paginatedPoints = [];
    for (let c = 0; c < entriesPerPage; c++) {
        const point = displayPoints[entriesPerPage * (page - 1) + c];
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
                    handlePointBarMarkerClick={handlePointBarMarkerClick}
                    userPosition={userPosition}
                    localStrings={localStrings}
                />,
            )}
        </CardContainer>
        <Pagination page={page}
                    setPage={setPage}
                    entriesPerPage={entriesPerPage}
                    setEntriesPerPage={setEntriesPerPage}
                    entryCount={displayPoints.length}
                    localStrings={localStrings}
        />
    </>;
};

PointBar.propTypes = {
    displayPoints: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    handlePointBarMarkerClick: PropTypes.func.isRequired,
    userPosition: PropTypes.shape({latitude: PropTypes.number, longitude: PropTypes.number}),
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default PointBar;
