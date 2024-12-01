import React from 'react';
import {Card, CardContent} from '../Styled/Card';
import Small from '../Styled/Small';
import {ExamplePointOfInterest, handlePoiClick, Position} from '../../Types/types';
import Link from '../Styled/Link';
import SmallLink from '../Styled/SmallLink';

type PointCardSharedProps = {
    point: ExamplePointOfInterest,
    handlePoiClick: handlePoiClick,
    userPosition?: Position,
}

type PointCardProps = PointCardSharedProps & {
    selected: boolean,
}


const ExamplePointCard = (props: PointCardProps): React.JSX.Element => {
    const {point, handlePoiClick, selected, userPosition} = props;

    return <Card selected={selected}>
        <CardContent selected={selected}>
            <PointCardContent point={point}
                              handlePoiClick={handlePoiClick}
                              userPosition={userPosition}/>
        </CardContent>
    </Card>;
};

export const PointCardContent = (props: PointCardSharedProps) => {
    const {point, handlePoiClick, userPosition} = props;

    return <>
        {<Link href={'#react-butterfly-map-pointer-' + point.uuid}
               onClick={(e) => handlePoiClick(e, point.position)}>
            {point.text ? point.text : point.address}
        </Link>}

        {Boolean(point.address) && Boolean(point.text) && <Small>{point.address}</Small>}
        {Boolean(point.additionalInfo) && <Small>{point.additionalInfo}</Small>}
        {Boolean(point.website) && <SmallLink href={point.website}>{'Website'}</SmallLink>}
        <SmallLink
            href={'https://google.com/maps/dir/' + ((userPosition !== undefined) ? userPosition.latitude + ',' + userPosition.longitude : ' ') + '/' + point.position.latitude + ',' + point.position.longitude}>
            {'Directions (Google Maps)'}
        </SmallLink>
    </>;
};

export default ExamplePointCard;
