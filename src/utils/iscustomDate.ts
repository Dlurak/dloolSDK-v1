import { CustomDate } from '../types/types';

export const isCustomDate = (date: CustomDate) => {
    const { day, month, year } = date;
    const isDayValid = day >= 1 && day <= 31;
    const isMonthValid = month >= 1 && month <= 12;
    const isYearValid = year >= 2000 && year <= 2100;
    return isDayValid && isMonthValid && isYearValid;
};
