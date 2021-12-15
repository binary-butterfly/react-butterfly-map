import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {localStringsPropTypes} from '../data/propTypes';

const PageButton = styled.button`
  background-color: ${props => props.active ? props.theme.buttonActiveBackground : props.theme.buttonBackground};
  transition: ${props => props.theme.reduceMotion ? '' : '0.5s'};
  border-radius: 0.25rem;
  margin: 0.1rem;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  cursor: pointer;

  &:hover:not(:disabled) &:focus:not(:disabled) {
    background-color: ${props => props.theme.buttonActiveBackground};
  }
  
  &:disabled {
    cursor: default;
  }
`;

const PaginationMeta = styled.span`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 1rem;

  div {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    
    label {
      margin-top: auto;
    }

    select {
      background-color: transparent;
      border: 1px solid;
      border-radius: 0.25rem;
      margin-right: 0.5rem;
      cursor: pointer;
      padding: 0.25rem;
    }

    span {
      margin: auto 0 auto auto;
    }

  }
`;

const PaginationButtons = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 0.75rem;
`;

const Pagination = React.memo((props) => {
    const {page, setPage, entriesPerPage, setEntriesPerPage, entryCount, localStrings} = props;
    const mostEntries = entriesPerPage * page;
    let pageCount = Math.floor(entryCount / entriesPerPage);
    if (entryCount % entriesPerPage !== 0 || pageCount === 0) {
        pageCount++;
    }

    let buttons = [<PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>{localStrings?.previousPage ?? 'Back'}</PageButton>];
    for (let c = 0; c < pageCount; c++) {
        buttons.push(<PageButton active={c + 1 === page} onClick={() => setPage(c + 1)}>{c + 1}</PageButton>);
    }
    buttons.push(<PageButton disabled={page === pageCount} onClick={() => setPage(page + 1)}>{localStrings?.nextPage ?? 'Next'}</PageButton>);

    return <PaginationMeta>
        <PaginationButtons>
            {buttons.map((Button, index) => <React.Fragment key={index}>{Button}</React.Fragment>)}<br/>
        </PaginationButtons>
        <div>
            <select value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(e.target.value * 1)}
                    id="react-butterfly-map-pagination-entries-per-page">
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
            <label htmlFor="react-butterfly-map-pagination-entries-per-page">{localStrings?.entriesPerPage ?? 'Entries per Page'}</label>
            <span>{localStrings?.showing ?? 'Showing'} {entriesPerPage * (page - 1) + 1}-{mostEntries > entryCount ? entryCount : mostEntries} {localStrings?.of ?? 'of'} {entryCount}.</span>
        </div>
    </PaginationMeta>;
});

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    entriesPerPage: PropTypes.number.isRequired,
    setEntriesPerPage: PropTypes.func.isRequired,
    entryCount: PropTypes.number.isRequired,
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default Pagination;
