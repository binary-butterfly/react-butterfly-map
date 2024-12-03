import React from 'react';
import {LocalStrings} from '../Types/types';
import PageButton from './Styled/Pagination/PageButton';
import PaginationMeta from './Styled/Pagination/PaginationMeta';
import PaginationButtons from './Styled/Pagination/PaginationButtons';

type PaginationProps = {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>> | (() => void),
    entriesPerPage: number,
    setEntriesPerPage: (page: number) => void,
    entryCount: number,
    localStrings: LocalStrings,
}

const Pagination = React.memo((props: PaginationProps) => {
    const {page, setPage, entriesPerPage, setEntriesPerPage, entryCount, localStrings} = props;
    const mostEntries = entriesPerPage * page;
    let pageCount = Math.floor(entryCount / entriesPerPage);
    if (entryCount % entriesPerPage !== 0 || pageCount === 0) {
        pageCount++;
    }

    let buttons = [<PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>{localStrings.previousPage}</PageButton>];
    for (let c = 0; c < pageCount; c++) {
        buttons.push(<PageButton $active={String(c + 1 === page)} onClick={() => setPage(c + 1)}>{c + 1}</PageButton>);
    }
    buttons.push(<PageButton disabled={page === pageCount} onClick={() => setPage(page + 1)}>
        {localStrings.nextPage}
    </PageButton>);

    return <PaginationMeta>
        <PaginationButtons>
            {buttons.map((Button, index) => <React.Fragment key={index}>{Button}</React.Fragment>)}<br/>
        </PaginationButtons>
        <div>
            <select value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                    id="react-butterfly-map-pagination-entries-per-page">
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            <label htmlFor="react-butterfly-map-pagination-entries-per-page">{localStrings.entriesPerPage}</label>
            <span>{localStrings.showing} {entriesPerPage * (page - 1) + 1}-{mostEntries > entryCount ? entryCount : mostEntries} {localStrings.of} {entryCount}.</span>
        </div>
    </PaginationMeta>;
});

export default Pagination;
