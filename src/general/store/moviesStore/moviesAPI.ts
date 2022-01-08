import qs from 'qs';
import {fetchJSON} from '../../helpers';
let apiKey = '7c1d539e';

export function createMoviesAPI(fetch: Function) {
  const moviesAPI = {
    getMovieList: () => {
      let s = 'inception';
      let page = 3;
      let query = qs.stringify(
        Object.assign({}, s ? {s} : {}, page ? {page} : {}),
      );
      return fetch(`?${query}&apiKey=${apiKey}`);
    },
  };
  return moviesAPI;
}

export default createMoviesAPI(fetchJSON);
