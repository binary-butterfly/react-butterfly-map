import '../../css/ButterflyMap.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import React from 'react';
import ControlBar from './ControlBar';
import PointBar from './PointBar';
import {ThemeProvider} from 'styled-components';
import {Map, ViewState} from 'react-map-gl/maplibre';
import {MapSidebar} from './Sidebar';
import {calculateDistance, updateUserPosition} from '../Helpers/mapHelpers';
import MapAndBarContainer from './Styled/MapAndBarContainer';
import MapContainer from './Styled/MapContainer';
import CenterMapButton from './Styled/CenterMapButton';
import {CustomFilter, handlePoiClick, PartialLocalStrings, PartialTheme, PointOfInterest, Position} from '../Types/types';
import {completeTheme} from '../Helpers/themeHelpers';
import {completeLocalStrings} from '../Helpers/localisationHelpers';
import Markers from './Markers';

const ButterflyMap = (props: ButterflyMapProps) => {
    const localStrings = completeLocalStrings(props.localStrings);
    const [position, setPosition] = React.useState(props.center);
    const [reduceMotion, setReduceMotion] = React.useState<boolean>(() => {
        // Respect prefers-reduced-motion setting (and falls back to no animations on browsers that don't support this feature)
        const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        return reducedQuery?.matches ?? true;
    });

    const [sortedPointsOfInterest, setSortedPointsOfInterest] = React.useState<PointOfInterest[]>([]);
    const [closestPointOfInterest, setClosestPointOfInterest] = React.useState<PointOfInterest | undefined>();
    const [userPosition, setUserPosition] = React.useState<Position>();
    const [positionRetry, setPositionRetry] = React.useState(false);
    const [locationBlocked, setLocationBlocked] = React.useState(false);
    const [centerMapDisabled, setCenterMapDisabled] = React.useState(true);
    const [paginationPage, setPaginationPage] = React.useState(1);
    const [hideMap, setHideMap] = React.useState(false);
    const [sidebarShowing, setSidebarShowing] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);
    const [viewState, setViewState] = React.useState({
        ...props.center,
        zoom: props.zoom ?? 8,
    });
    const updateUserPositionInterval = React.useRef<number>();

    React.useEffect(() => {
        let found = props.paginationPage === undefined;
        for (const serverSideField of [props.setPaginationPage, props.entriesPerPage, props.setEntriesPerPage, props.totalCount]) {
            if ((serverSideField === undefined) !== found) {
                throw new Error('react butterfly map error: When one of the server side pagination props is set, all of them have to be.');
            }
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            setLocationBlocked(false);
        }, {once: true});
    }, []);

    React.useEffect(() => {
        const newPoints: PointOfInterest[] = [];
        props.pointsOfInterest.map((point) => {
            newPoints.push({...point});
        });

        if (newPoints.length !== sortedPointsOfInterest.length) {
            setPaginationPage(1);
        }

        if (props.disableCards) {
            setSortedPointsOfInterest(newPoints);
        } else {
            setSortedPointsOfInterest(
                newPoints.sort((a: PointOfInterest, b: PointOfInterest): number => {
                    return calculateDistance(position, a.position) - calculateDistance(position, b.position);
                }),
            );
            setClosestPointOfInterest(newPoints[0]);
        }
    }, [props.pointsOfInterest, position]);

    const theme = completeTheme(reduceMotion, props.theme);

    const handlePoiClick: handlePoiClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, position: Position) => {
        moveMapPosition(e, position);
        // Browsers have issues rendering too many animations at once, resulting in a buggy sidebar entry animation
        // if it's triggered at the same time as the map is moved.
        // To avoid that we wait for 50ms before showing the sidebar.
        window.setTimeout(() => setSidebarShowing(true), 50);
    };

    const handleMapMarkerClick = (position: Position): void => {
        doMapMove(position);
        window.setTimeout(() => setSidebarShowing(true), 50);
    };

    React.useEffect(() => {
        if (loaded) {
            doMapMove(position);
        }
    }, [props.center]);

    const doMapMove = (position: Position): void => {
        setViewState((oldViewState) => {
            return {
                ...oldViewState,
                ...position,
            };
        });
        setPaginationPage(1);
        setPosition(position);
    };

    const moveMapPosition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, newPosition: Position): void => {
        e.preventDefault();
        e.stopPropagation();
        doMapMove(newPosition);
    };

    React.useEffect(() => {
        if (updateUserPositionInterval.current !== undefined) {
            clearInterval(updateUserPositionInterval.current);
        }

        if (updateUserPosition(setCenterMapDisabled, locationBlocked, setLocationBlocked, setUserPosition)) {
            updateUserPositionInterval.current = window.setInterval(() => updateUserPosition(setCenterMapDisabled, locationBlocked, setLocationBlocked, setUserPosition), 30000);
        }

        return () => {
            if (updateUserPositionInterval.current !== undefined) {
                clearInterval(updateUserPositionInterval.current);
            }
        };
    }, [positionRetry, locationBlocked]);

    const handleCenterMapClick = () => {
        if (window.localStorage.getItem('geolocationBlocked') === 'true') {
            window.localStorage.setItem('geolocationBlocked', 'false');
        }
        if (userPosition) {
            doMapMove(userPosition);
        } else {
            console.log('asking for permission');
            setPositionRetry(!positionRetry);
        }
    };

    const handleMapMoveEnd = (newViewState: ViewState): void => {
        // We only set the pulled out position at the end of the move, to avoid unneeded recalculations of POI distance
        setPosition({latitude: newViewState.latitude, longitude: newViewState.longitude});
    };

    return <ThemeProvider theme={theme}>
        <ControlBar localStrings={localStrings}
                    reduceMotion={reduceMotion}
                    setReduceMotion={setReduceMotion}
                    hideMap={hideMap}
                    setHideMap={setHideMap}
        />
        {!hideMap && <MapAndBarContainer>
            {!props.disableCards &&
                <MapSidebar data-showing={sidebarShowing} height={props.height}>
                    {closestPointOfInterest && <closestPointOfInterest.SidebarComponent closeSidebar={() => setSidebarShowing(false)}
                                                                                        handlePoiClick={handlePoiClick}
                                                                                        userPosition={userPosition}/>}
                </MapSidebar>}
            <MapContainer>
                <Map mapStyle={props.tileServer}
                     {...viewState}
                     onLoad={() => setLoaded(true)}
                     onMove={(e) => setViewState(e.viewState)}
                     onMoveEnd={(e) => handleMapMoveEnd(e.viewState)}
                     style={{
                         width: 'fit',
                         height: props.height,
                     }}>
                    <Markers handleMapMarkerClick={handleMapMarkerClick} pointsOfInterest={sortedPointsOfInterest}/>
                </Map>
                <CenterMapButton title={locationBlocked ? localStrings.location_permission_needed : ''}
                                 disabled={centerMapDisabled}
                                 onClick={handleCenterMapClick}>
                    {localStrings.centerMap}
                </CenterMapButton>
            </MapContainer>
        </MapAndBarContainer>}
        {(!props.disableCards && sortedPointsOfInterest.length > 0) &&
            <PointBar userPosition={userPosition}
                      localStrings={localStrings}
                      page={props.paginationPage ?? paginationPage}
                      setPage={props.setPaginationPage ?? setPaginationPage}
                      displayPoints={sortedPointsOfInterest}
                      handlePoiClick={handlePoiClick}
                      entriesPerPage={props.entriesPerPage}
                      setEntriesPerPage={props.setEntriesPerPage}
                      totalCount={props.totalCount}/>}
    </ThemeProvider>;
};

type ButterflyMapProps = {
    pointsOfInterest: PointOfInterest[],
    center: Position,
    height: number,
    tileServer: string,
    zoom?: number,
    theme?: PartialTheme,
    localStrings?: PartialLocalStrings,
    customFilters?: CustomFilter[],
    entriesPerPage?: number,
    setEntriesPerPage?: React.Dispatch<React.SetStateAction<number>>,
    paginationPage?: number,
    setPaginationPage?: React.Dispatch<React.SetStateAction<number>>,
    totalCount?: number,
    disableCards?: boolean,
}

export default ButterflyMap;
