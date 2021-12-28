import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {customFiltersPropTypes, localStringsPropTypes} from '../data/propTypes';

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

const BarUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.25rem 0 0.25rem 0;
  display: flex;
  font-size: 1.25rem;
  width: 50%;
  flex-wrap: wrap;
  align-content: end;

  li {
    /* Make sure font sizes aren't overwritten */

    a {
      font-size: 1.25rem;
    }

    label {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`;

const SecondBarUl = styled(BarUl)`
  justify-content: flex-end;
  @media (max-width: 1300px) {
    justify-content: flex-start;
  }

  label {
    cursor: pointer;
    margin: auto 0 auto 0;
    line-height: initial;

    input {
      margin: auto 0.25rem auto 0;
      vertical-align: middle;
    }

    span {
      vertical-align: text-top;
    }
  }
`;

const BarLi = styled.li`
  display: block;
  position: relative;
  margin: auto 0.5rem auto 0.5rem;
`;

const BarLiWithPopup = styled(BarLi)`
  cursor: pointer;
  min-width: ${props => props.theme.typePopupMinWidth};

  a[data-caret="true"]::after {
    content: " ⬇️";
  }

  &:hover a[data-caret="true"]::after, &:focus-within a[data-caret="true"]::after {
    content: " ⬆️"
  }

  menu {
    visibility: hidden;
  }

  &:hover menu:not(:empty), &:focus menu:not(:empty), &:focus-within menu:not(:empty) {
    cursor: pointer;
    visibility: visible;
    display: block;
  }

  &:hover menu li, &:focus menu li, &:focus-within menu li {
    transition-duration: ${props => props.theme.reduceMotion ? 0 : '0.5s'};
  }
`;

const ShowMenu = styled.menu`
  position: absolute;
  background-color: ${props => props.theme.popupBackgroundColor};
  margin: 0;
  z-index: 1000;
  padding: 0.25rem 0 0.25rem 0;
  list-style: none;
  width: 100%;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;

  li {
    padding: 0 0.25rem 0 0.25rem;

    label {
      width: 100%;
      display: block;
      cursor: pointer;
    }
  }

  li:hover, li:focus-within {
    background-color: ${props => props.theme.highlightOptionColor};
  }
`;

const ShowAnchor = styled.a`
  text-decoration: none;
  color: inherit;

  &visited {
    color: inherit;
  }
`;

const SearchInput = styled.input`
  margin: auto 0 auto 0.25rem;
  font-size: 1.25rem;
`;

const SearchLi = (props) => {
    const {searchBackend, localStrings, doMapMove} = props;
    if (!searchBackend) {
        return <></>;
    }

    const [searchString, setSearchString] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [errorMsg, setErrorMsg] = React.useState('');

    const makeErrorVisible = () => {
        setResults([]);
        setErrorMsg(<li>
            <ShowAnchor href="#" onClick={(e) => e.preventDefault()}>
                {localStrings?.searchError ?? 'An error occurred during searching. Please try again later'}</ShowAnchor>
        </li>);
    };

    const handleChange = (e) => {
        setSearchString(e.target.value);

        if (searchString.length > 2) {
            if (searchBackend === 'testing') {
                setResults([
                    {text: 'Searching is disabled during testing', latitude: 47.79, longitude: 13.0550},
                ]);
            } else {
                fetch(searchBackend, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        searchString: searchString,
                    }),
                }).then(result => {
                    if (result.ok) {
                        result.json().then(json => {
                            setResults(json);
                        });
                    } else {
                        makeErrorVisible();
                    }
                }).catch(() => {
                    makeErrorVisible();
                });
            }
        } else {
            setResults([]);
        }
    };

    const handleResultClick = (e, lat, long) => {
        e.preventDefault();
        doMapMove({latitude: lat, longitude: long});
        setSearchString('');
        setResults([]);
    };

    return <BarLiWithPopup>
        <label htmlFor="react-butterfly-map-point-search">{localStrings?.search ?? 'Search'}:</label>
        <SearchInput value={searchString} onChange={handleChange} type="text" id="react-butterfly-map-point-search"/>
        <ShowMenu>{results.length > 0 && results.map((result, index) => {
            return <li key={index}>
                <ShowAnchor href="#" onClick={(e) => handleResultClick(e, result.latitude, result.longitude)}>
                    {result.text}
                </ShowAnchor>
            </li>;
        }) || errorMsg}</ShowMenu>
    </BarLiWithPopup>;
};

SearchLi.propTypes = {
    doMapMove: PropTypes.func.isRequired,
    localStrings: PropTypes.shape(localStringsPropTypes),
    searchBackend: PropTypes.string,
};

const ControlCheck = styled.input`
  margin-right: 0.5rem;
`;

const ShowTypesText = React.memo((props) => {
    const {options, localStrings, showAllTypes} = props;
    const selectedTypes = showAllTypes ? 100 : options.filter((option) => option.showing);

    return <ShowAnchor data-caret="true" href="#" onClick={(e) => e.preventDefault()}>
        {localStrings?.show ?? 'Show'}:
        {showAllTypes
            ? localStrings?.all ?? ' All'
            : selectedTypes.length === 0
                ? localStrings?.none ?? ' None'
                : selectedTypes.length <= 3
                    ? selectedTypes.map((type, index) => (index > 0 ? ', ' : ' ') + type.name)
                    : localStrings?.some ?? ' Some'
        }
    </ShowAnchor>;
});

ShowTypesText.propTypes = {
    showAllTypes: PropTypes.bool.isRequired,
    options: PropTypes.array.isRequired,
    localStrings: PropTypes.shape(localStringsPropTypes),
};

const ControlBar = (props) => {
    const {
        options,
        handleShowAllClick,
        handleOptionClick,
        showAllTypes,
        handleShowClosedRightNowClick,
        showClosedRightNow,
        localStrings,
        searchBackend,
        doMapMove,
        reduceMotion,
        setReduceMotion,
        hideMap,
        setHideMap,
        hoursSet,
        customFilters,
        customFilterValues,
        updateCustomFilterValue,
    } = props;

    return <BarContainer>
        <BarUl>
            <SearchLi localStrings={localStrings} searchBackend={searchBackend} doMapMove={doMapMove}/>
            <BarLiWithPopup aria-haspopup={true}>
                <ShowTypesText options={options} localStrings={localStrings} showAllTypes={showAllTypes}/>
                <ShowMenu aria-label={localStrings?.typesSubMenu ?? 'POI types submenu'}>
                    <li>
                        <label>
                            <ControlCheck type="checkbox" onChange={handleShowAllClick} checked={showAllTypes}/>
                            {localStrings?.showAll ?? 'Show all'}
                        </label>
                    </li>
                    {hoursSet && <li>
                        <label>
                            <ControlCheck type="checkbox"
                                          onChange={handleShowClosedRightNowClick}
                                          checked={showClosedRightNow}/>
                            {localStrings?.closedRightNow ?? 'Closed right now'}
                        </label>
                    </li>}
                    {customFilters && <>
                        {customFilters.map((element, index) => <li key={'customFilter' + index}>
                            <label>
                                <ControlCheck type="checkbox"
                                              onChange={(e) => updateCustomFilterValue(index, e.target.checked)}
                                              checked={customFilterValues[index]}/>
                                {element.displayText}
                            </label>
                        </li>)}
                    </>}
                    <li>
                        <hr/>
                    </li>
                    {options.map((option, index) => {
                            return <li key={index}>
                                <label>
                                    <ControlCheck type="checkbox"
                                                  checked={option.showing}
                                                  onChange={() => handleOptionClick(index)}/>
                                    {option.name}
                                </label>
                            </li>;
                        },
                    )}
                </ShowMenu>
            </BarLiWithPopup>
        </BarUl>
        <SecondBarUl>
            <BarLi>
                <label>
                    <input type="checkbox" value={reduceMotion} onChange={e => setReduceMotion(e.target.checked)}/>
                    <span>{localStrings?.reduceMotion ?? 'Reduce motion'}</span>
                </label>
            </BarLi>
            <BarLi>
                <label>
                    <input type="checkbox" value={hideMap} onChange={e => setHideMap(!!e.target.checked)}/>
                    <span>{localStrings?.hideMap ?? 'Hide map'}</span>
                </label>
            </BarLi>
        </SecondBarUl>
    </BarContainer>;
};

ControlBar.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        showing: PropTypes.bool.isRequired,
    })).isRequired,
    setOptions: PropTypes.func.isRequired,
    handleShowAllClick: PropTypes.func.isRequired,
    handleOptionClick: PropTypes.func.isRequired,
    handleShowClosedRightNowClick: PropTypes.func.isRequired,
    showClosedRightNow: PropTypes.bool.isRequired,
    showAllTypes: PropTypes.bool.isRequired,
    doMapMove: PropTypes.func.isRequired,
    reduceMotion: PropTypes.bool.isRequired,
    setReduceMotion: PropTypes.func.isRequired,
    hideMap: PropTypes.bool.isRequired,
    setHideMap: PropTypes.func.isRequired,
    hoursSet: PropTypes.bool.isRequired,
    localStrings: PropTypes.shape(localStringsPropTypes),
    searchBackend: PropTypes.string,
    customFilters: customFiltersPropTypes,
    customFilterValues: PropTypes.arrayOf(PropTypes.bool),
    updateCustomFilterValue: PropTypes.func.isRequired,
};

export default ControlBar;
