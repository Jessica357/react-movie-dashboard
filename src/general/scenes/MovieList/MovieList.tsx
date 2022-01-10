import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import type {RootState, Dispatch} from '../../store/rootTypes';
import {MovieListItem} from '../../store/moviesStore/moviesStore-type';

type ActionProps = {
  fetchMovieList: () => void;
};

type StateProps = {
  movieList: Array<MovieListItem>;
};

type Props = ActionProps & StateProps & {};

// type State = {

// };

class MovieList extends Component<Props> {
  componentDidMount() {
    let {fetchMovieList} = this.props;
    fetchMovieList();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to hohoho.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
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
      console.log('Dispatch');
      dispatch({
        type: 'FETCH_MOVIE_LIST_REQUESTED',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
