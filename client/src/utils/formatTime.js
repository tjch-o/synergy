import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const getFormattedTime = (time) => {
    return dayjs(time).format("DD MMMM YYYY HH:mm:ss");
};

export { getFormattedTime };
