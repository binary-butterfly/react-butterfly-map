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
    totalCount?: number,
}

const PointBar = (props: PointBarProps) => {
    const {page, setPage, displayPoints, localStrings, handlePoiClick, userPosition} = props;

    const [entriesPerPage, _setEntriesPerPage] = React.useState<number>(window.innerWidth < 1000 ? 4 : 8);
    const [paginatedPoints, setPaginatedPoints] = React.useState<PointOfInterest[]>([]);

    const setEntriesPerPage = (newEntriesPerPage: number) => {
        _setEntriesPerPage(newEntriesPerPage);
        setPage(1);
    };

    React.useEffect(() => {
        if (props.setEntriesPerPage) {
            setPaginatedPoints(displayPoints);
        } else {
            const newPaginatedPoints = [];
            for (let c = 0; c < entriesPerPage; c++) {
                const point = displayPoints[entriesPerPage * (page - 1) + c];
                if (point === undefined) {
                    break;
                }
                newPaginatedPoints.push(point);
            }
            setPaginatedPoints(newPaginatedPoints);
        }
    }, [page, displayPoints, entriesPerPage]);

    return <>
        <Pagination page={page}
                    setPage={setPage}
                    entriesPerPage={props.entriesPerPage ?? entriesPerPage}
                    setEntriesPerPage={props.setEntriesPerPage ?? setEntriesPerPage}
                    entryCount={props.totalCount ?? displayPoints.length}
                    localStrings={localStrings}
                    c={1}/>
        <CardContainer>
            {paginatedPoints.map((point, index) =>
                <point.CardComponent key={point.uuid} handlePoiClick={handlePoiClick} userPosition={userPosition} selected={index === 0}/>)}
        </CardContainer>
        <Pagination page={page}
                    setPage={setPage}
                    entriesPerPage={props.entriesPerPage ?? entriesPerPage}
                    setEntriesPerPage={props.setEntriesPerPage ?? setEntriesPerPage}
                    entryCount={props.totalCount ?? displayPoints.length}
                    localStrings={localStrings}
                    c={2}/>
    </>;
};

export default PointBar;
