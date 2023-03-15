import moment from "moment";

export function getDomainName() {
    const url = document.createElement("a");
    url.setAttribute("href", document.location.href);
    let hostname = url.hostname;
    if (hostname.startsWith("www")) {
        hostname = hostname.replace("www.", "");
    }
    return hostname;
}

export function errorHelper(formik, values) {
    return {
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    };
}

export function capitalizeString(text) {
    return text && typeof (text) === "string" ? text[0].toUpperCase() + text.slice(1) : text;
}

export function downloadContent(url) {
    const link = document.createElement("a");
    link.download = url.substr(url.lastIndexOf("/") + 1);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function dateDif(start, end) {
    let date1 = moment(new Date(end));
    let date2 = moment(new Date(start));
    let years = date1.diff(date2, 'year');
    date2.add(years, 'years');

    let months = date1.diff(date2, 'months');
    date2.add(months, 'months');

    let days = date1.diff(date2, 'days');
    date2.add(days, 'days');

    let hours = date1.diff(date2, 'hours');
    date2.add(hours, 'hours');

    let minutes = date1.diff(date2, 'minutes');
    date2.add(minutes, 'minutes');

    let seconds = date1.diff(date2, 'seconds');
    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

export function groupDataByKey(data, key) {
    const groupedData = {};
    if (Array.isArray(data)) {
        data.forEach((item) => {
            const keyValue = item[key] || "";
            if (!groupedData[keyValue]) {
                groupedData[keyValue] = [];
            }
            groupedData[keyValue].push(item);
        })
    }
    return groupedData;
}

export function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (const element of vars) {
        let pair = element.split("=");
        if (pair[0] === variable) { 
            return pair[1];
        }
    }
    return undefined;
}