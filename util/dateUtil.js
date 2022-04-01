import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT, DATE_FORMAT_DB, TIME_FORMAT, TIME_FORMAT_DB, DATE_TIME_FORMAT_GIT } from '../constant/const';

var yesterday = moment().subtract(1, 'day');

export function setDisplayDate(date) {
    if (date == null)
        return "";

    if (date == "")
        return "";

    if (date == undefined)
        return "";

    return moment(date).format(DATE_FORMAT);
}

export function setDisplayDateTime(date) {
    if (date == null)
        return "";

    if (date == "")
        return "";

    if (date == undefined)
        return "";

    return moment(date).format(DATE_TIME_FORMAT);
}


export function setDisplayDateTimeGit(date) {
    if (date == null)
        return "";

    if (date == "")
        return "";

    if (date == undefined)
        return "";

    var date1 = new Date(date.$date);
    return moment(date1.toString("YYYY-MM-DD HH:MM:SS")).format(DATE_TIME_FORMAT_GIT);
}

export function setDisplayDateTimeGitCode(date) {
    if (date == null)
        return "";

    if (date == "")
        return "";

    if (date == undefined)
        return "";

    return moment(date.toString("YYYY-MM-DD HH:MM:SS")).format(DATE_TIME_FORMAT_GIT);
}

export function setDisplayDateTimeGitFile(date) {
    if (date == null)
        return "";

    if (date == "")
        return "";

    if (date == undefined)
        return "";

    var date1 = new Date(date);
    return moment(date1.toString("YYYY-MM-DDTHH:MM:SSZ")).format(DATE_TIME_FORMAT_GIT);
}

export function setDatabaseDate(date) {
    if (date == null)
        return "";

    if (date == "")
        return "";

    return moment(date).format(DATE_FORMAT_DB);
}

export function validAfterToday(current) {
    return current.isAfter(yesterday);
}

export function setDisplayTime(time) {
    if (time == null)
        return "";

    if (time == "")
        return "";

    return moment(time, "HH:mm:ss").format(TIME_FORMAT);

}

export function setDatabaseTime(time) {
    if (time == null)
        return "";

    if (time == "")
        return "";

    return moment(time, "hh:mm A").format(TIME_FORMAT_DB);

}


export function isDateAfter(a, b) {
    return moment(a).isAfter(b);
}

export function isValidDate(strDate) {
    var myDateStr = new Date(strDate);
    if (!isNaN(myDateStr.getMonth())) {
        return true;
    }
    return false;
}