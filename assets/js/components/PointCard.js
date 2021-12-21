import PropTypes from 'prop-types';
import React from 'react';
import {localStringsPropTypes} from '../data/propTypes';
import {Card, CardContent} from './Card';
import OpenHours from './OpenHours';
import styled from 'styled-components';
import Small from './Small';

const TypeText = styled.span`
  margin-top: 0.25rem;
  display: block;
  font-size: 0.8rem;
`;

const Link = styled.a`
  display: block;
  font-size: 1.2rem!important;
`

const SmallLink = styled(Link)`
  line-height: 0.8rem;
  font-size: 0.8rem!important;
`

const PointCard = (props) => {
    const {point, handleSidebarMarkerClick, selected} = props;

    return <Card selected={selected}>
        <CardContent selected={selected}>
            <Link href={'#react-butterfly-map-pointer' + point.type + point.index}
               onClick={(e) => handleSidebarMarkerClick(e, point)}>
                {point.text ? point.text : point.address}
            </Link>
            {!!point.address && !!point.text && <Small>{point.address}</Small>}
            {!!point.additionalInfo && <Small>{point.additionalInfo}</Small>}
            {!!point.website && <SmallLink href={point.website}>{props.localStrings?.website ?? 'Website'}</SmallLink>}
            <SmallLink href={'https://google.com/maps/dir/' + ((props.userPosition !== null) ? props.userPosition.latitude + ',' + props.userPosition.longitude : ' ') + '/' + point.position.latitude + ',' + point.position.longitude}>
                {props.localStrings?.directions ?? 'Directions (Google Maps)'}
            </SmallLink>
            <TypeText>{point.type}</TypeText>
            {point.hours && <OpenHours hours={point.hours} until={point.valid?.until} localStrings={props.localStrings}/>}
        </CardContent>
    </Card>;
};

PointCard.propTypes = {
    point: PropTypes.object.isRequired, // TODO: shape
    selected: PropTypes.bool.isRequired,
    handleSidebarMarkerClick: PropTypes.func.isRequired,
    userPosition: PropTypes.object, // TODO: shape
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default PointCard;
