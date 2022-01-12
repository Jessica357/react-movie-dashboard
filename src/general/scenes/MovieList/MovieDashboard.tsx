import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap';

import './MovieDashboard.css';
import {MovieList} from './components';
import type {RootState, Dispatch} from '../../store/rootTypes';
import {MovieListItem} from '../../store/moviesStore/moviesStore-type';

type ActionProps = {
  fetchMovieList: () => void;
};

type StateProps = {
  movieList: Array<MovieListItem>;
};

type Props = ActionProps & StateProps & {};

class MovieDashboard extends Component<Props> {
  render() {
    return (
      <Tabs defaultActiveKey="searchMovie">
        <Tab eventKey="searchMovie" title="SEARCH MOVIE">
          <MovieList activeTab={'searchMovie'} isSearchFieldVisible />
        </Tab>
        <Tab eventKey="favorites" title="MY FAVORITES">
          <MovieList activeTab={'favorites'} />
        </Tab>
      </Tabs>
    );
  }
}

let mapStateToProps = (state: RootState): StateProps => {
  let {movies} = state;
  let {movieList} = movies;

  return {
    movieList,
  };
};

let mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    fetchMovieList: () => {
      dispatch({
        type: 'FETCH_MOVIE_LIST_REQUESTED',
        payload: {page: 1},
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDashboard);
