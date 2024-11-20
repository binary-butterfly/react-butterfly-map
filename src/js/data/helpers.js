export const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const filterHours = (point, currentDay, currentHour, currentMinute) => {
    if (point.hours) {
        if (typeof point.hours[currentDay] === 'boolean') {
            return point.hours[currentDay];
        } else {
            for (let c = 0; c < point.hours[weekdays[currentDay]].length; c++) {
                const theseHours = point.hours[weekdays[currentDay]][c];
                if (theseHours['from'][0] < currentHour || (theseHours['from'][0] * 1 === currentHour && theseHours['from'][1] <= currentMinute)) {
                    if (theseHours['until'][0] > currentHour || (theseHours['until'][0] * 1 === currentHour && theseHours['until'][1] > currentMinute)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

export const checkPointHours = (point) => {
    if (point.hasHours) {
        return true;
    }

    const pointHours = point.hours;
    if (pointHours) {
        for (const index of weekdays) {
            if (pointHours[index]) {
                point.hasHours = true;
                return true;
            }
        }
    }
    return false;
};
