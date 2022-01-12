import React, {Component} from 'react';
import {connect} from 'react-redux';
// import './FavoriteToggle.css';
import './FavoriteToggle.scss';
import type {RootState} from '../store/rootTypes';

type StateProps = {
  myFavorites: Array<string>;
};

type ActionProps = {
  onSelect?: () => void;
};

type Props = ActionProps &
  StateProps & {
    id: string;
  };

class FavoriteToggle extends Component<Props> {
  render() {
    let {myFavorites, id} = this.props;
    return (
      <div>
        {/* use this for toggle animation, still have bug when activated */}
        {/* <input
          id="toggle-start"
          type="checkbox"
          // onClick={() => onSelect()}
        /> */}
        <label
          // @ts-ignore
          for="toggle-start"
          style={{color: myFavorites.includes(id) ? '#ffdf00' : '#aab8c2'}}
        >
          ★
        </label>
      </div>
    );
  }
}

let mapStateToProps = (state: RootState): StateProps => {
  let {movies} = state;
  let {myFavorites} = movies;
  return {
    myFavorites,
  };
};

export default connect(mapStateToProps)(FavoriteToggle);
