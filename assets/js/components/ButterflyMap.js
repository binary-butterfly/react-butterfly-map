import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';
import ControlBar from './ControlBar';
import PointBar from './PointBar';
import styled, {ThemeProvider} from 'styled-components';
import ReactMapGL, {AttributionControl, FlyToInterpolator, Marker} from 'react-map-gl';
import {localStringsPropTypes, dayPropTypes, hoursPropTypes} from '../data/propTypes';
import {filterHours} from '../data/helpers';

import ownCss from '../../css/ButterflyMap.css'; // NOT unused.
import css from 'maplibre-gl/dist/maplibre-gl.css'; // NOT unused either.

const PointerBox = styled.div`
  cursor: pointer;
`;

const CenterMapButton = styled(Button)`
  margin: 0.5rem 0 0.5rem 0;
`;

const Markers = React.memo((props) => {
    // Use memo to avoid needless re-renders of the markers
    const {displayPointTypes, doMapMove} = props;

    return <>
        {displayPointTypes.map((pointType) => {
            return pointType.points.map((point, index) =>
                <Marker key={index} {...point.position}
                        onClick={() => doMapMove(point.position)}
                        id={'react-butterfly-map-pointer' + pointType.name + index}
                        getCursor={() => 'pointer'}
                >
                    <PointerBox>
                        {!!point.icon &&
                        <point.icon data-banana="fooo" style={{height: '50px', width: '50px'}}/>
                        || <pointType.icon style={{height: '50px', width: '50px'}}/>}
                    </PointerBox>
                </Marker>);
        })}
    </>;
});

Markers.propTypes = {
    doMapMove: PropTypes.func.isRequired,
    displayPointTypes: PropTypes.array.isRequired,
};

export const ButterflyMap = (props) => {
    const [position, setPosition] = React.useState(props.center);

    const [reduceMotion, setReduceMotion] = React.useState(() => {
        // Respect prefers-reduced-motion setting (and falls back to no animations on browsers that don't support this feature)
        const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        return reducedQuery?.matches ?? true;
    });
    const [typeOptions, setTypeOptions] = React.useState([]);
    const [showAllTypes, setShowAllTypes] = React.useState(true);
    const [showClosedRightNow, setShowClosedRightNow] = React.useState(true);
    const [displayPointTypes, setDisplayPointTypes] = React.useState([]);
    const [userPosition, setUserPosition] = React.useState(null);
    const [centerMapDisabled, setCenterMapDisabled] = React.useState(true);
    const [paginationPage, setPaginationPage] = React.useState(1);
    const [hideMap, setHideMap] = React.useState(false);

    const [viewport, setViewport] = React.useState({
        ...props.center,
        zoom: props.zoom ?? 8,
        width: 'fit',
        height: props.height,
    });

    const theme = {
        reduceMotion: reduceMotion,
        error: props.theme?.error ?? 'red',
        success: props.theme?.success ?? 'green',
        buttonBackground: props.theme?.buttonBackground ?? 'transparent',
        buttonActiveBackground: props.theme?.buttonActiveBackground ?? '#ff00ff57',
        buttonFontColor: props.theme?.buttonFontColor ?? 'initial',
        disabledButtonBackground: props.theme?.disabledButtonBackground ?? 'lightgray',
        disabledButtonFontColor: props.theme?.disabledButtonFontColor ?? 'white',
        popupBackgroundColor: props.theme?.popupBackgroundColor ?? 'white',
        highlightOptionColor: props.theme?.highlightOptionColor ?? 'lightgray',
        typePopupMinWidth: props.theme?.typePopupMinWidth ?? '15rem',
    };

    const updateDisplayPointTypes = (proposedTypes, updateTypeOptions = false, showClosed = showClosedRightNow) => {
        const newTypeOptions = [];
        const newDisplayPointTypes = [];
        if (proposedTypes) {
            const now = new Date();
            const day = now.getDay();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            for (let c = 0; c < proposedTypes.length; c++) {
                let points = proposedTypes[c].points.filter((point) => {
                    if (point.valid) {
                        if (point.valid.from) {
                            if (typeof point.valid.from === 'string') {
                                point.valid.from = new Date(point.valid.from);
                            }
                            if (point.valid.from > now) {
                                return false;
                            }
                        } else if (point.valid.until) {
                            if (typeof point.valid.until === 'string') {
                                point.valid.until = new Date(point.valid.until);
                            }
                            if (point.valid.until < now) {
                                return false;
                            }
                        }
                    }
                    return true;
                });

                if (!showClosed) {
                    points = points.filter((point) => filterHours(point, day, hours, minutes));
                }

                if (points.length > 0) {
                    if (updateTypeOptions) {
                        newTypeOptions.push({name: proposedTypes[c].name, showing: true});
                    }
                    newDisplayPointTypes.push({...proposedTypes[c], points: points});
                }
            }
        }

        if (updateTypeOptions) {
            setTypeOptions(newTypeOptions);
        }
        setDisplayPointTypes(newDisplayPointTypes);
    };

    React.useEffect(() => {
        updateDisplayPointTypes(props.pointTypes, true);
    }, [props.pointTypes]);

    React.useEffect(() => {
        if (showAllTypes) {
            updateDisplayPointTypes(props.pointTypes, false, true);
        } else {
            const newDisplayPointTypes = props.pointTypes.filter(pointType => {
                return typeOptions.filter((typeOption) => typeOption.showing && (typeOption.name === pointType.name || (pointType.aliases && pointType.aliases.includes(typeOption.name)))).length > 0;
            });
            updateDisplayPointTypes(newDisplayPointTypes, false);
        }
    }, [typeOptions, showAllTypes]);

    const handleTypeOptionClick = (index, showClosed = showClosedRightNow) => {
        const newOptions = [...typeOptions];
        let newAllShown = true;
        for (let c = 0; c < newOptions.length; c++) {
            if (c === index) {
                if (newOptions[index].showing) {
                    newOptions[index].showing = false;
                    newAllShown = false;
                    break;
                } else {
                    newOptions[index].showing = true;
                }
            } else if (!newOptions[c].showing) {
                newAllShown = false;
            }
        }
        if (newAllShown && !showClosed) {
            newAllShown = false;
        }
        setTypeOptions(newOptions);
        setShowAllTypes(newAllShown);
    };

    const handleShowAllTypesClick = () => {
        const newOptions = [...typeOptions];
        newOptions.map((option) => {
            option.showing = !showAllTypes;
        });
        setTypeOptions(newOptions);
        setShowClosedRightNow(!showAllTypes);
        setShowAllTypes(!showAllTypes);
    };

    const handleShowClosedRightNowClick = () => {
        if (showClosedRightNow) {
            updateDisplayPointTypes(displayPointTypes, false, false);
            setShowAllTypes(false);
            setShowClosedRightNow(false);
        } else {
            updateDisplayPointTypes(displayPointTypes, false, true);
            let allShown = true;
            for (let c = 0; c < typeOptions.length; c++) {
                if (!typeOptions[c].showing) {
                    allShown = false;
                    break;
                }
            }
            setShowAllTypes(allShown);
            setShowClosedRightNow(true);
        }
    };

    React.useEffect(() => {
        doMapMove(position);
    }, [props.center]);

    const doMapMove = (position) => {
        const animation = reduceMotion
            ? {
                transitionInterpolator: undefined,
                transitionDuration: 0,
            }
            : {
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            };
        setViewport({...viewport, ...position, ...animation});
        setPosition(position);
        setPaginationPage(1);
    };

    const moveMapPosition = (e, markerPosition) => {
        e.preventDefault();
        e.stopPropagation();
        doMapMove(markerPosition);
    };

    React.useEffect(() => {
        const updateUserPosition = () => {
            try {
                if (isSecureContext) {
                    if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            setCenterMapDisabled(false);
                            setUserPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
                        });
                        return true;
                    } else {
                        console.info('Geolocation permission not given or feature not available.');
                    }
                } else {
                    console.info('Geolocation is only available in a secure context');
                }
            } catch {
                console.debug('Could not get geolocation. Are you using a somewhat modern browser?');
            }
        };

        let updateUserPositionInterval = false;
        if (updateUserPosition()) {
            updateUserPositionInterval = window.setInterval(updateUserPosition, 30000);
        }

        return () => {
            if (updateUserPositionInterval) {
                clearInterval(updateUserPositionInterval);
            }
        };
    }, []);

    const handleCenterMapClick = () => {
        if (userPosition) {
            doMapMove(userPosition, false);
        }
    };

    return <ThemeProvider theme={theme}>
        <ControlBar
            options={typeOptions}
            setOptions={setTypeOptions}
            showClosedRightNow={showClosedRightNow}
            showAllTypes={showAllTypes}
            handleOptionClick={handleTypeOptionClick}
            handleShowAllClick={handleShowAllTypesClick}
            handleShowClosedRightNowClick={handleShowClosedRightNowClick}
            localStrings={props.localStrings}
            searchBackend={props.searchBackend}
            doMapMove={doMapMove}
            reduceMotion={reduceMotion}
            setReduceMotion={setReduceMotion}
            hideMap={hideMap}
            setHideMap={setHideMap}
        />
        {!hideMap && <>
            <ReactMapGL {...viewport}
                        onViewportChange={(newViewport) => setViewport(newViewport)}
                        mapStyle={props.tileServer}>
                <Markers doMapMove={doMapMove} displayPointTypes={displayPointTypes}/>
                <AttributionControl compact={true}/>
            </ReactMapGL>
            <CenterMapButton
                onClick={handleCenterMapClick}>{props.localStrings?.centerMap ?? 'Center map on current location'}</CenterMapButton>
        </>}
        {typeOptions.length > 0 &&
        <PointBar pointTypes={displayPointTypes}
                  position={position}
                  moveMapPosition={moveMapPosition}
                  userPosition={userPosition}
                  localStrings={props.localStrings}
                  page={paginationPage}
                  setPage={setPaginationPage}
        />}
    </ThemeProvider>;
};

// marker: The React function component that will mark points
// name: The name of the point type
// points: The points that belong to this type
// typeAliases: Allows filtering for other types to also include this type by putting those types' names in here (useful for combination types)
// height: The height of the map in px
ButterflyMap.propTypes = {
    pointTypes: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.func.isRequired,
        name: PropTypes.string,
        points: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                latitude: PropTypes.number,
                longitude: PropTypes.number,
            }).isRequired,
            text: PropTypes.string,
            address: PropTypes.string,
            additionalInfo: PropTypes.string,
            valid: PropTypes.shape({
                from: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
                until: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
            }),
            website: PropTypes.string,
            hours: hoursPropTypes,
        })),
        typeAliases: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
    center: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }).isRequired,
    height: PropTypes.number.isRequired,
    tileServer: PropTypes.string.isRequired,
    zoom: PropTypes.number,
    localStrings: PropTypes.shape(localStringsPropTypes),
    searchBackend: PropTypes.string,
    theme: PropTypes.shape({
        error: PropTypes.string,
        success: PropTypes.string,
        buttonBackground: PropTypes.string,
        buttonActiveBackground: PropTypes.string,
        buttonFontColor: PropTypes.string,
        disabledButtonBackground: PropTypes.string,
        disabledButtonFontColor: PropTypes.string,
        popupBackgroundColor: PropTypes.string,
        highlightOptionColor: PropTypes.string,
        typePopupMinWidth: PropTypes.string,
    }),
};
