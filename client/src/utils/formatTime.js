import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat'; // For 'Do' and other advanced formats

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const getFormattedTime = (time) => {
    return dayjs(time).format('DD MMMM YYYY HH:mm:ss');
};

export { getFormattedTime };