import moment from 'moment';

export const format = durationMillis => {
    const time = moment.duration(durationMillis);
    const minutes = time.get('minutes');
    const seconds = time.get('seconds');
    return `${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
};