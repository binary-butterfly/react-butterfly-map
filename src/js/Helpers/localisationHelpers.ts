import {LocalStrings, PartialLocalStrings} from '../Types/types';

export const completeLocalStrings = (strings?: PartialLocalStrings): LocalStrings => {
    return {
        showMore: strings?.showMore ?? 'Show more',
        showLess: strings?.showLess ?? 'Show less',
        centerMap: strings?.centerMap ?? 'Center map on current location',
        reduceMotion: strings?.reduceMotion ?? 'Reduce Motion',
        showAll: strings?.showAll ?? 'Show all',
        showing: strings?.showing ?? 'Showing',
        of: strings?.of ?? 'of',
        entriesPerPage: strings?.entriesPerPage ?? 'Entries per page',
        nextPage: strings?.nextPage ?? 'Next',
        previousPage: strings?.previousPage ?? 'Previous',
        hideMap: strings?.hideMap ?? 'Hide map',
        hide_sidebar: strings?.hide_sidebar ?? 'Hide sidebar',
        location_permission_needed: strings?.location_permission_needed ?? 'In order to center the map, you have to allow this website to use your current position',
    }
}
