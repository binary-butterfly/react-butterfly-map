import styled from 'styled-components';
import Button from '../Styled/Button';
import {ExamplePointOfInterest, PoiSidebarInfoFunction, PoiSidebarInfoProps, Position} from '../../Types/types';
import React from 'react';

const SidebarHeading = styled.p`
    /* TODO: h? */
    font-size: 1.2rem;
    margin: 0.5rem 0 0.5rem 0;
`;

const HeadingLink = styled.a`
    display: block;
    margin: 0.25rem 0 0.25rem 0;
`;

const SidebarType = styled.span`
    margin: 0.25rem 0 0.25rem 0;
    display: block;
`;

const SidebarButtonContainer = styled.div`
    display: flex;
    width: 100%;
`;

const CloseSidebarButton = styled(Button)`
    margin-left: auto;
`;

type ExampleSidebarPointProps = PoiSidebarInfoProps & {
    point: ExamplePointOfInterest,
}

const ExampleSidebarPoint = (props: ExampleSidebarPointProps) => {
    const {point, userPosition, closeSidebar} = props;

    return <div>
        <SidebarButtonContainer>
            <CloseSidebarButton onClick={closeSidebar}>
                {'Hide Sidebar'} &times;
            </CloseSidebarButton>
        </SidebarButtonContainer>
        <SidebarHeading>{point.text ? point.text : point.address}</SidebarHeading>
        {!!point.address && !!point.text && <SidebarType>{point.address}</SidebarType>}
        {!!point.additionalInfo && <SidebarType>{point.additionalInfo}</SidebarType>}
        {!!point.website && <HeadingLink href={point.website}>{'Website'}</HeadingLink>}
        <HeadingLink
            href={'https://google.com/maps/dir/' + ((userPosition !== undefined) ? userPosition.latitude + ',' + userPosition.longitude : ' ') + '/' + point.position.latitude + ',' + point.position.longitude}>
            {'Directions (Google Maps)'}
        </HeadingLink>
    </div>;
};

export default ExampleSidebarPoint;
