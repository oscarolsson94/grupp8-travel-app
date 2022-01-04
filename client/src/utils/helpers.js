const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
];

export const formatDate = (dateStr) => {
    const isDateAStr = !isNaN(Date.parse(dateStr));

    if (isDateAStr) {
        const date = new Date(dateStr);

        const month = months[date.getMonth()];
        const slicedMonth = month
            .slice(0, month.length === 4 ? 4 : 3)
            .toLowerCase();

        return `${date.getDate()} ${slicedMonth}`;
    }

    return "";
};

export const formatTime = (dateStr) => {
    const isDateAStr = !isNaN(Date.parse(dateStr));

    if (isDateAStr) {
        const date = new Date(dateStr);

       
        const hoursTime = date.getHours()
        const minTime = date.getMinutes()

        return `${hoursTime}:${minTime}`;
    }

    return "";
};