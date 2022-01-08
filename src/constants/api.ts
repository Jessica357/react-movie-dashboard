export const runLocalAPI = false;

export const API_LOCAL = 'http://localhost:3030';
export const API_SERVER = 'https://www.omdbapi.com/';

export const API_DEFAULT = runLocalAPI ? API_LOCAL : API_SERVER;
