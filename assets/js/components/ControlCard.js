import PropTypes from 'prop-types';
import React from 'react';
import {localStringsPropTypes} from '../data/propTypes';
import {Card, CardContent} from './Card';
import styled from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ControlCheck = styled.input`
  margin-right: 0.5rem;
`

const ControlCard = (props) => {
    const {options, handleShowAllClick, handleOptionClick, showAllTypes, handleShowClosedRightNowClick, showClosedRightNow, localStrings} = props;

    // TODO: only show closed right now checkbox if there are open hours, show collapsible
    return <Card control={true}>
        <CardContent>
            <FlexDiv>
                <span>{localStrings?.show ?? 'Show'}:</span>
                <span>
                    <ControlCheck type="checkbox" id="react-butterfly-map-show-all-options" onChange={handleShowAllClick}
                           checked={showAllTypes}/>
                    <label htmlFor="react-butterfly-map-show-all-options">{localStrings?.showAll ?? 'Show all'}</label>
                </span>
                <span>
                    <ControlCheck type="checkbox" id="react-butterfly-map-show-closed-right-now-options" onChange={handleShowClosedRightNowClick}
                           checked={showClosedRightNow}/>
                    <label htmlFor="react-butterfly-map-show-closed-right-now-options">{localStrings?.closedRightNow ?? 'Closed right now'}</label>
                </span>
                {options.map((option, index) => {
                        return <span key={index}>
                        <ControlCheck type="checkbox" id={'react-butterfly-map-show-option-' + index} checked={option.showing}
                               onChange={() => handleOptionClick(index)}/>
                        <label htmlFor={'react-butterfly-map-show-option-' + index}>{option.name}</label>
                    </span>;
                    },
                )}
            </FlexDiv>
        </CardContent>
    </Card>;
};

ControlCard.propTypes = {
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
    localStrings: PropTypes.shape(localStringsPropTypes)
};

export default ControlCard;
