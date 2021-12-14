import PropTypes from 'prop-types';

export const localStringsPropTypes = {
    sunday: PropTypes.string.isRequired,
    monday: PropTypes.string.isRequired,
    tuesday: PropTypes.string.isRequired,
    wednesday: PropTypes.string.isRequired,
    thursday: PropTypes.string.isRequired,
    friday: PropTypes.string.isRequired,
    saturday: PropTypes.string.isRequired,
    today: PropTypes.string.isRequired,
    tomorrow: PropTypes.string.isRequired,
    showMore: PropTypes.string.isRequired,
    showLess: PropTypes.string.isRequired,
    allDay: PropTypes.string.isRequired,
    closed: PropTypes.string.isRequired,
    twelveHours: PropTypes.bool.isRequired,
    directions: PropTypes.string.isRequired,
    centerMap: PropTypes.string.isRequired,
    closesOn: PropTypes.string.isRequired,
    reduceMotion: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    showAll: PropTypes.string.isRequired,
    showing: PropTypes.string.isRequired,
    closedRightNow: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    all: PropTypes.string.isRequired,
    some: PropTypes.string.isRequired,
    none: PropTypes.string.isRequired,
    of: PropTypes.string.isRequired,
    entriesPerPage: PropTypes.string.isRequired,
    nextPage: PropTypes.string.isRequired,
    previousPage: PropTypes.string.isRequired,
};

export const dayPropTypes = PropTypes.oneOfType(
    [
        PropTypes.arrayOf(
            PropTypes.shape({
                from: PropTypes.arrayOf(PropTypes.string),
                until: PropTypes.arrayOf(PropTypes.string),
            })),
        PropTypes.bool,
    ],
);

export const hoursPropTypes = PropTypes.shape({
    sunday: dayPropTypes,
    monday: dayPropTypes,
    tuesday: dayPropTypes,
    wednesday: dayPropTypes,
    thursday: dayPropTypes,
    friday: dayPropTypes,
    saturday: dayPropTypes,
    text: PropTypes.string,
});
