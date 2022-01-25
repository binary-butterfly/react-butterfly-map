import React from 'react';
import styled from 'styled-components';
import {checkPointHours} from '../data/helpers';
import Button from './Button';
import OpenHours from './OpenHours';


export const MapSidebar = styled.div`
  width: 1px;
  transition: width ${props => props.theme.reduceMotion ? '0s' : '0.5s'} ease-out;
  overflow: hidden;
  z-index: 10;
  position: absolute;
  height: ${props => props.height}px;
  background-color: ${props => props.theme.backgroundColor};
  box-sizing: border-box;
  overflow-wrap: anywhere;

  & > div {
    margin: 1rem;
    height: 95%;
    overflow: auto;
  }

  & > div > *, & > div > table tbody tr td.special-day, & > div > div > button {
    transition: ${props => props.theme.reduceMotion ? '0s' : 'color 0s 0.5s, border 0s 0.5s'};
  }

  &[data-showing=true] {
    width: 25rem;
  }
  
  @media(max-width: 1000px) {
    &[data-showing=true] {
      width: 90%;
    }
  }

  &[data-showing=false] > div > *, &[data-showing=false] > div > table tbody tr td.special-day, &[data-showing=false] > div > div > button {
    color: ${props => props.theme.backgroundColor} !important;
    border: none;
    transition: color 0s 0s, border 0s 0s;
  }

  &[data-showing=false] > div {
    overflow: hidden;
  }
`;

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

export const SidebarContent = (props) => {
    const {point, userPosition, localStrings, setSidebarShowing} = props;

    return <div>
        <SidebarButtonContainer>
            <CloseSidebarButton
                onClick={() => setSidebarShowing(false)}>{localStrings?.hide_sidebar ?? 'Hide Sidebar'} &times;</CloseSidebarButton>
        </SidebarButtonContainer>
        <SidebarHeading>{point.text ? point.text : point.address}</SidebarHeading>
        {!!point.address && !!point.text && <SidebarType>{point.address}</SidebarType>}
        {!!point.additionalInfo && <SidebarType>{point.additionalInfo}</SidebarType>}
        {!!point.website && <HeadingLink href={point.website}>{props.localStrings?.website ?? 'Website'}</HeadingLink>}
        <HeadingLink
            href={'https://google.com/maps/dir/' + ((userPosition !== null) ? userPosition.latitude + ',' + userPosition.longitude : ' ') + '/' + point.position.latitude + ',' + point.position.longitude}>
            {props.localStrings?.directions ?? 'Directions (Google Maps)'}
        </HeadingLink>
        <SidebarType>{point.type}</SidebarType>
        {checkPointHours(point) &&
        <OpenHours hours={point.hours} until={point.valid?.until} localStrings={localStrings}/>}
    </div>;
};
