import moment from 'moment';

export const getDate = (type) => {
    let firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let lastDay = new Date(moment(firstDay).add(1, 'month'));
    if (type === '30days') {
        firstDay = new Date(new Date().setDate(new Date().getDate() - 30));
        lastDay = new Date();
    } else if (type === '7days') {
        firstDay = new Date(new Date().setDate(new Date().getDate() - 7));
        lastDay = new Date();
    } else if (type === '3days') {
        firstDay = new Date(new Date().setDate(new Date().getDate() - 7));
        lastDay = new Date();
    } else if (type === 'week') {
        firstDay = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
        lastDay = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6));
    } else if (type === 'day') {
        firstDay = new Date(new Date().setUTCHours(0, 0, 0, 0));
        lastDay = new Date(new Date().setUTCHours(23, 59, 59, 999));
    } else if (type === 'lastweek') {
        firstDay = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7));
        lastDay = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 1));
    } else if (type === 'lastmonth') {
        firstDay = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        lastDay = new Date(moment(firstDay).add(1, 'month'));
    } else if (type === 'All') {
        firstDay = new Date(new Date().getFullYear(), 0, 1);
        lastDay = new Date()
    } else if (type === 'wed') {
        const today = new Date();
        const dayOfWeek = today.getDay();
        let daysUntilWednesday = (3 + 7 - dayOfWeek) % 7;
        lastDay = new Date(today.getTime() + daysUntilWednesday * 24 * 60 * 60 * 1000);
        firstDay = new Date(lastDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (type === 'July') {
        firstDay = new Date(2023, 5, 30);
    }

    let defaultDate = [firstDay, lastDay];
    return defaultDate;
}