export const getDateString = date => new Date(date).toISOString().split('T')[0];

export const getTimeString = date => new Date(date).toISOString().split('T')[1];
