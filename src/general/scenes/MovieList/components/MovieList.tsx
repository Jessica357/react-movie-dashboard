import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import debounce from 'lodash.debounce';

import './MovieList.css';
import ModalDesc from './MovieDesc';
import {Text} from '../../../core-ui';
import {LIGHTEST_GREY, WHITE} from '../../../constants/colors';
import type {RootState, Dispatch} from '../../../store/rootTypes';
import {
  GetMovieDetails,
  MovieListItem,
} from '../../../store/moviesStore/moviesStore-type';
import FavoriteToggle from '../../../components/FavoriteToggle';

type ActionProps = {
  fetchMovieList: (page: number) => void;
  getMovieDetails: (id: string) => void;
  getMyFavorites: (myNewFavorites: Array<string>) => void;
  updateMyFavorites: (prevFav: Array<string>, id: string) => void;
};

type StateProps = {
  page: number;
  isLoading: boolean;
  movieList: Array<MovieListItem>;
  movieDetails: GetMovieDetails | null;
  myFavorites: Array<string>;
};

type Props = ActionProps &
  StateProps & {
    activeTab: 'searchMovie' | 'favorites';
    isSearchFieldVisible?: boolean;
  };

type State = {
  searchText: string;
  isShowMovieDesc: boolean;
  selectedMovie: string;
  myNewFavorites: Array<string>;
};

let arraySearchResult: Array<MovieListItem> = [];

class MovieList extends Component<Props> {
  state = {
    searchText: '',
    isShowMovieDesc: false,
    myNewFavorites: this.props.myFavorites,
  };

  componentDidMount() {
    this.onChangeDebounced = debounce(this.onChangeDebounced, 1000);
    let {fetchMovieList, getMyFavorites} = this.props;
    fetchMovieList(1);
    getMyFavorites(this.state.myNewFavorites);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    let data = this.props.movieList;
    let {searchText} = this.state;
    // @ts-ignore
    if ((prevState.searchText !== searchText) | searchText) {
      //update movie data array, when user search
      arraySearchResult = [];
      let movieArray = data;
      movieArray.map((prevent, index) => {
        if (
          movieArray[index].Title.toLowerCase().includes(
            searchText.toLowerCase(),
          )
        ) {
          let result = (arraySearchResult = [
            ...arraySearchResult,
            movieArray[index],
          ]);
          return result;
        }
        return null;
      });
    }
  }

  onChangeDebounced = (e: Event) => {
    this.setState({searchText: this.state.searchText});
  };

  render() {
    let {isLoading, movieDetails, isSearchFieldVisible} = this.props;
    let {isShowMovieDesc} = this.state;
    let onChangeSearchText = (event: any) => {
      this.setState({searchText: event.target.value});
      event && this.onChangeDebounced(event);
    };
    return (
      <div className="App">
        <body style={{display: 'flex', flexDirection: 'row'}}>
          <div style={styles.shared.rootContainer}>
            {isSearchFieldVisible && (
              <div style={styles.desktop.titleBoxContainer}>
                <input
                  type="text"
                  value={this.state.searchText}
                  onChange={onChangeSearchText}
                  placeholder={'Enter movie title here ...'}
                  style={styles.desktop.searchBox}
                />
              </div>
            )}

            {this._renderMovieListHeader()}
            {!isLoading && this._renderMovieListContent()}
            {!isLoading && movieDetails && (
              <ModalDesc
                movieDetails={movieDetails}
                isModalShow={isShowMovieDesc}
                onCloseModal={() => this.setState({isShowMovieDesc: false})}
              />
            )}
          </div>
        </body>
      </div>
    );
  }

  _renderMovieListHeader = () => {
    return (
      <div style={styles.shared.root}>
        <div
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            display: 'grid',
            gridTemplate: '1fr / 2fr 0.5fr 0.5fr 0.5fr',
            gridGap: 20,
            marginBottom: 0,
            paddingTop: 10,
          }}
        >
          <Text>TITLE</Text>
          <Text>YEAR</Text>
          {this.props.activeTab === 'searchMovie' ? (
            <Text>imDB ID</Text>
          ) : (
            <Text>LANGUAGE</Text>
          )}
        </div>
      </div>
    );
  };

  _renderMovieListContent = () => {
    let {
      fetchMovieList,
      movieList,
      page,
      getMovieDetails,
      updateMyFavorites,
      myFavorites,
      activeTab,
    } = this.props;
    let {searchText} = this.state;
    let movies = searchText ? arraySearchResult : movieList;
    let onSelectMovie = (id: string) => {
      getMovieDetails(id);
      this.setState({isShowMovieDesc: true});
    };
    let onChangeFavorite = (
      event: React.SyntheticEvent,
      myFavorites: Array<string>,
      id: string,
    ) => {
      updateMyFavorites(myFavorites, id);
      event.stopPropagation();
    };
    return (
      <div style={styles.shared.contentRoot}>
        {movies.map((movie, index) => {
          let delayTime = index + 1 * 100;
          if (
            activeTab === 'searchMovie' ||
            myFavorites.includes(movie.imdbID)
          ) {
            return (
              <CSSTransition
                in={true}
                appear={true}
                timeout={2000}
                classNames="list"
                unmountOnExit
                onExited={() => fetchMovieList(page + 1)}
              >
                <div
                  style={{
                    minHeight: 50,
                    backgroundColor: WHITE,
                    borderRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'grid',
                    gridTemplate: '1fr / 2fr 0.5fr 0.5fr 0.5fr',
                    gridGap: 20,
                    marginTop: 5,
                    // marginBottom: 0,
                    // paddingTop: 10,
                    paddingLeft: 30,
                    transitionDelay: `${delayTime}ms`,
                  }}
                  onClick={() => onSelectMovie(movie.imdbID)}
                >
                  <Text>{movie.Title}</Text>
                  <Text>{movie.Year}</Text>
                  {activeTab === 'searchMovie' ? (
                    <Text>{movie.imdbID}</Text>
                  ) : (
                    <Text>English</Text>
                  )}
                  <div
                    style={{width: 'fit-content'}}
                    onClick={(event) =>
                      onChangeFavorite(event, myFavorites, movie.imdbID)
                    }
                  >
                    <FavoriteToggle
                      id={movie.imdbID}
                      // onSelect={(event) =>
                      //   onChangeFavorite(event, myFavorites, movie.imdbID)
                      // }
                    />
                  </div>
                </div>
              </CSSTransition>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };
}

let mapStateToProps = (state: RootState): StateProps => {
  let {movies} = state;
  let {page, isLoading, movieList, movieDetails, myFavorites} = movies;
  return {
    page,
    isLoading,
    movieList,
    movieDetails,
    myFavorites,
  };
};

let mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    fetchMovieList: (page: number) => {
      dispatch({
        type: 'REFETCH_MOVIE_LIST_REQUESTED',
        payload: {page},
      });
    },
    getMovieDetails: (id: string) => {
      dispatch({
        type: 'GET_MOVIE_DETAILS_REQUESTED',
        payload: {id},
      });
    },
    getMyFavorites: (myNewFavorites: Array<string>) => {
      dispatch({
        type: 'GET_MY_FAVORITES_REQUESTED',
        payload: {myNewFavorites},
      });
    },
    updateMyFavorites: (prevFav: Array<string>, id: string) => {
      let myFavorites = [...prevFav, id];
      let newRecentSearch = [];
      if (prevFav.includes(id)) {
        newRecentSearch = myFavorites.filter(
          (myFavorites) => myFavorites !== id,
        );
      } else {
        newRecentSearch = myFavorites;
      }

      dispatch({
        type: 'UPDATE_MY_FAVORITES_REQUESTED',
        payload: {myNewFavorites: newRecentSearch},
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);

const styles: {[key: string]: {[key: string]: React.CSSProperties}} = {
  shared: {
    rootContainer: {
      backgroundColor: LIGHTEST_GREY,
      width: '100%',
      minHeight: '90vh',
      paddingBottom: 50,
    },
    root: {
      marginTop: 50,
      marginLeft: 80,
      marginRight: 50,
    },
    contentRoot: {
      marginTop: 5,
      marginLeft: 50,
      marginRight: 50,
    },
  },
  desktop: {
    titleBoxContainer: {
      backgroundColor: WHITE,
      margin: 40,
      height: 50,
      // paddingRight: 20,
      // paddingLeft: 20,
      paddingTop: 20,
      paddingBottom: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    searchBox: {
      width: '100%',
      padding: 10,
      borderRadius: 5,
      fontFamily: 'PT Sans',
    },
  },
};
