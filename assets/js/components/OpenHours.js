import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {filterHours, weekdays} from '../data/helpers';
import {localStringsPropTypes, dayPropTypes, hoursPropTypes} from '../data/propTypes';
import Button from './Button';
import Small from './Small';

const MoreOrLessButton = styled(Button)`
  width: 100%;
  padding: 0.25rem;
`;

const HoursTable = styled.table`
  width: 100%;
  border: none;
  font-size: 1rem;
  margin: 0;
`;

const Tr = styled.tr`
  border: none;
  padding: initial;
`;

const Th = styled.th`
  text-align: start;
  width: 50%;
  border: none;
  padding: initial;
`;

const Td = styled.td`
  border: none;
  padding: initial;
`;

const OpenDay = styled(Td)`
  color: ${props => props.theme.success};
`;

const ClosedDay = styled(Td)`
  color: ${props => props.theme.error};
`;

const addLeadingZeroIfLessThan10 = (str) => {
    if (str.length === 1) {
        str = '0' + str;
    }
    return str;
};

const convertHoursAndMinutesToTimeString = (time, twelveHours = false) => {
    try {
        let hourString;
        let minuteString = addLeadingZeroIfLessThan10(time[1]);
        let append = '';

        if (twelveHours) {
            if (time[0] > 12) {
                append = ' p.m.';
                hourString = (time[0] - 12).toString();
            } else {
                append = ' a.m.';
                hourString = time[0].toString();
            }
        } else {
            hourString = time[0];
        }

        hourString = addLeadingZeroIfLessThan10(hourString);
        return hourString + ':' + minuteString + append;
    } catch {
        console.log(time);
        return 'error';
    }
};

const DayHoursTd = (props) => {
    const {dayHours, localStrings} = props;
    return dayHours.map((openHours, index) => {
        return <span key={index}>
            {index > 0 && <br/>}
            {convertHoursAndMinutesToTimeString(openHours.from, localStrings?.twelveHours ?? false)} - {convertHoursAndMinutesToTimeString(openHours.until, localStrings?.twelveHours ?? false)}
        </span>;
    });
};

const HoursRow = (props) => {
    const {dayHours, title, localStrings, closed} = props;
    return <Tr>
        <Th scope="row">{title}</Th>
        {typeof dayHours === 'boolean'
            ? dayHours === true ? <OpenDay>{localStrings?.allDay ?? 'All day'}</OpenDay> :
                <ClosedDay>{localStrings?.closed ?? 'Closed'}</ClosedDay>
            : <>
                {!!closed
                    ? <ClosedDay>
                        <DayHoursTd dayHours={dayHours} localStrings={localStrings}/>
                    </ClosedDay>
                    : <Td>
                        <DayHoursTd dayHours={dayHours} localStrings={localStrings}/>
                    </Td>}
            </>}
    </Tr>;
};

HoursRow.propTypes = {
    title: PropTypes.string.isRequired,
    dayHours: dayPropTypes.isRequired,
    localStrings: PropTypes.object,
    closed: PropTypes.bool,
};

const UntilSmall = styled(Small)`
  color: ${props => props.theme.error};
`;

const UntilWarning = (props) => {
    if (props.until) {
        return <UntilSmall>{props.localStrings?.closesOn ?? 'This point closes on'} {props.until.toLocaleDateString()}</UntilSmall>;
    }
    return <></>;
};

const OpenHours = (props) => {
    const {hours, localStrings} = props;
    const [displayMore, setDisplayMore] = React.useState(false);
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();

    if (displayMore) {
        return <>
            <HoursTable>
                <tbody>
                {Object.entries(hours).map(([day, dayHours], index) => {
                    if (typeof dayHours === 'object' || typeof dayHours === 'boolean') {
                        return <HoursRow key={index} title={localStrings?.[day] ?? day}
                                         dayHours={dayHours} localStrings={localStrings}/>;
                    }
                })}
                </tbody>
            </HoursTable>
            <UntilWarning until={props.until} localStrings={localStrings}/>
            {!!hours.text && <Small>{hours.text}</Small>}
            <MoreOrLessButton onClick={() => setDisplayMore(false)}>
                {localStrings?.showLess ?? 'Show less'}
            </MoreOrLessButton>
        </>;
    } else {
        return <>
            <HoursTable>
                <tbody>
                <HoursRow title={localStrings?.today ?? 'Today'} dayHours={hours[weekdays[day]]}
                          localStrings={localStrings}
                          closed={!filterHours({hours: hours}, day, hour, minutes)}/>
                <HoursRow title={localStrings?.tomorrow ?? 'Tomorrow'}
                          dayHours={hours[weekdays[day === 6 ? 0 : day + 1]]}
                          localStrings={localStrings}/>
                </tbody>
            </HoursTable>
            <UntilWarning until={props.until} localStrings={localStrings}/>
            <MoreOrLessButton onClick={() => setDisplayMore(true)}>
                {localStrings?.showMore ?? 'Show more'}
            </MoreOrLessButton>
        </>;
    }
};

// Hours has to be an array with the index 0 containing hours for sunday and counting up from there.
OpenHours.propTypes = {
    hours: hoursPropTypes,
    until: PropTypes.object,
    localStrings: PropTypes.shape(localStringsPropTypes),
};

export default OpenHours;
