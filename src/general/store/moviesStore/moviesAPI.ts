import qs from 'qs';
import {fetchJSON} from '../../helpers';
let apiKey = '7c1d539e';

export function createMoviesAPI(fetch: Function) {
  const moviesAPI = {
    getMovieList: (page: number) => {
      let s = 'inception';
      let query = qs.stringify(
        Object.assign({}, s ? {s} : {}, page ? {page} : {}),
      );
      return fetch(`?${query}&apiKey=${apiKey}`);
    },
    getMovieDetails: (id: string) => {
      return fetch(`?i=${id}&apiKey=${apiKey}`);
    },
  };
  return moviesAPI;
}

export default createMoviesAPI(fetchJSON);
