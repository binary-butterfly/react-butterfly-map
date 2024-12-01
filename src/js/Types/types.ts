import React from 'react';

export type Position = {
    latitude: number,
    longitude: number,
}

export type handlePoiClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, position: Position) => void;
export type PoiIconFunction = (props: {style: {width: string, height: string}}) => React.JSX.Element;
export type PoiCardProps = {
    handlePoiClick: handlePoiClick,
    selected: boolean,
    userPosition?: Position,
}
export type PoiSidebarInfoProps = {
    handlePoiClick: handlePoiClick,
    closeSidebar: () => void,
    userPosition?: Position,
}
export type PoiCardFunction = (props: PoiCardProps) => React.JSX.Element;
export type PoiSidebarInfoFunction = (props: PoiSidebarInfoProps) => React.JSX.Element;

export type ExamplePointOfInterest = {
    position: Position,
    uuid: string,
    text?: string,
    address?: string,
    additionalInfo?: string,
    website?: string,
    customFields?: {
        [key: string]: boolean,
    }
}

export type PointOfInterest = {
    position: Position,
    uuid: string,
    CardComponent: PoiCardFunction,
    MarkerComponent: PoiIconFunction,
    SidebarComponent: PoiSidebarInfoFunction,
}

export type CustomFilter = {
    displayText: string,
    fieldName: string,
    defaultValue: boolean,
    compareWith: boolean,
}

export type Theme = {
    error: string,
    success: string,
    buttonBackground: string,
    buttonActiveBackground: string,
    buttonFontColor: string,
    disabledButtonBackground: string,
    disabledButtonFontColor: string,
    popupBackgroundColor: string,
    highlightOptionColor: string,
    typePopupMinWidth: string,
    backgroundColor: string,
}

export type PartialTheme = Partial<Theme>;

export type LocalStrings = {
    showMore: string,
    showLess: string,
    centerMap: string,
    reduceMotion: string,
    showAll: string,
    showing: string,
    of: string,
    entriesPerPage: string,
    nextPage: string,
    previousPage: string,
    hideMap: string,
    hide_sidebar: string,
    location_permission_needed: string,
}

export type PartialLocalStrings = Partial<LocalStrings>;
