import React from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';
import {handlePoiClick, LocalStrings, PointOfInterest, Position} from '../Types/types';

const CardContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 1000px) {
        justify-content: space-around;
    }
`;

type PointBarProps = {
    displayPoints: PointOfInterest[],
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    handlePoiClick: handlePoiClick,
    userPosition?: Position,
    localStrings: LocalStrings,
    entriesPerPage?: number,
    setEntriesPerPage?: React.Dispatch<React.SetStateAction<number>>,
}

type PointBarPropsWithPage = PointBarProps & {
    entriesPerPage: number,
    setEntriesPerPage: () => void,
}

const PointBar = (props: PointBarProps | PointBarPropsWithPage) => {
    const [entriesPerPage, _setEntriesPerPage] = React.useState<number>(window.innerWidth < 1000 ? 4 : 8);

    const setEntriesPerPage = (newEntriesPerPage: number) => {
        _setEntriesPerPage(newEntriesPerPage);
        setPage(1);
    };

    const {page, setPage, displayPoints, localStrings, handlePoiClick, userPosition} = props;



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
            {paginatedPoints.map((point, index) =>
                <point.CardComponent key={point.uuid} handlePoiClick={handlePoiClick} userPosition={userPosition} selected={index === 0}/>)}
        </CardContainer>
        <Pagination page={page}
                    setPage={setPage}
                    entriesPerPage={props.entriesPerPage ?? entriesPerPage}
                    setEntriesPerPage={props.setEntriesPerPage ?? setEntriesPerPage}
                    entryCount={displayPoints.length}
                    localStrings={localStrings}
        />
    </>;
};

export default PointBar;
