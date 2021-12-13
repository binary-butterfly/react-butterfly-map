import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {localStringsPropTypes} from '../data/propTypes';

const BarContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.25rem 0 0.25rem 0;
  width: 100%;
  display: flex;
  font-size: 1.5rem;
`;

const BarLi = styled.li`
  display: block;
  position: relative;
  margin: auto 0.5rem auto 0.5rem;
`;

const SearchInput = styled.input`
  margin: auto 0 auto 0.25rem;
  font-size: 1.25rem;
`;

const SearchLi = (props) => {
    const {localStrings} = props;
    return <BarLi>
        <label htmlFor="react-butterfly-map-point-search">{localStrings?.search ?? 'Search'}:</label>
        <SearchInput type="text" id="react-butterfly-map-point-search"/>
    </BarLi>;
};

const BarLiWithPopup = styled(BarLi)`
  cursor: pointer;
  min-width: 15rem;

  a::after {
    transition-duration: 0.5s;
    display: inline-block;
    content: "⮟";
  }

  &:hover a::after, &:focus-within a::after {
    content: "⮝"
  }

  menu {
    visibility: hidden;
  }

  &:hover menu, &:focus menu, &:focus-within menu {
    cursor: pointer;
    visibility: visible;
    display: block;
  }

  &:hover menu li, &focus menu li, &:focus-within menu li {
    transition-duration: 0.5s;
  }
`;

const ShowMenu = styled.menu`
  position: absolute;
  background-color: ${props => props.theme.popupBackgroundColor};
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

const ControlCheck = styled.input`
  margin-right: 0.5rem;
`;

const ShowAnchor = styled.a`
  text-decoration: none;
  color: inherit;

  &visited {
    color: inherit;
  }
`;

const ShowTypesText = React.memo((props) => {
    const {options, localStrings, showAllTypes} = props;
    const selectedTypes = showAllTypes ? 100 : options.filter((option) => option.showing);

    return <ShowAnchor href="#">
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
    } = props;

    return <BarContainer>
        {/*<SearchLi localStrings={localStrings}/>*/}
        <BarLiWithPopup aria-haspopup={true}>
            <ShowTypesText options={options} localStrings={localStrings} showAllTypes={showAllTypes}/>
            <ShowMenu aria-label="submenu">
                <li>
                    <label>
                        <ControlCheck type="checkbox" onChange={handleShowAllClick} checked={showAllTypes}/>
                        {localStrings?.showAll ?? 'Show all'}
                    </label>
                </li>
                <li>
                    <label>
                        <ControlCheck type="checkbox"
                                      onChange={handleShowClosedRightNowClick}
                                      checked={showClosedRightNow}/>
                        {localStrings?.closedRightNow ?? 'Closed right now'}
                    </label>
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
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default ControlBar;
