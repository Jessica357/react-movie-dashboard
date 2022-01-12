import React from 'react';
import {Image} from 'react-bootstrap';

import {StyleSheet} from '../../../helpers';
import {Modal, Text} from '../../../core-ui';
import type {GetMovieDetails} from '../../../store/moviesStore/moviesStore-type';

type Props = {
  movieDetails: GetMovieDetails | null;
  isModalShow: boolean;
  onCloseModal: () => void;
};

export default function MovieDesc(props: Props) {
  let {movieDetails, isModalShow, onCloseModal} = props;

  if (movieDetails) {
    let {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      Type,
      DVD,
      BoxOffice,
      Production,
      Website,
    } = movieDetails;
    return (
      <Modal
        noHeaderBorder
        isModalShow={isModalShow}
        onCloseModal={() => onCloseModal()}
      >
        <div style={{maxWidth: 737, paddingLeft: 20, paddingRight: 20}}>
          <div style={{width: '100%', textAlign: 'center', marginBottom: 50}}>
            <Image src={Poster} style={{height: 400, maxWidth: '100%'}} />
          </div>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
              fontFamily: 'PT Sans',
            }}
          >
            {Title}
          </Text>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Year</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Year}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Rated</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Rated}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Released</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Released}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Runtime</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Runtime}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Genre</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Genre}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Director</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Director}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Writer</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Writer}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Actors</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Actors}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Plot</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Plot}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Language</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Language}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Country</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Country}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Awards</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Awards}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Type</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Type}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>DVD</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{DVD}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>BoxOffice</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{BoxOffice}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Production</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Production}</Text>
          </div>
          <div style={styles.flexRow}>
            <Text style={styles.contentKey}>Website</Text>
            <Text style={styles.contentColon}>:</Text>
            <Text style={styles.contentValue}>{Website}</Text>
          </div>
        </div>
      </Modal>
    );
  } else {
    return null;
  }
}

const styles: StyleSheet = {
  flexRow: {display: 'flex', width: '100%', flexDirection: 'row'},
  contentKey: {flex: 2, fontSize: '14px', fontFamily: 'PT Sans'},
  contentColon: {flex: 0.2, fontSize: '14px', fontFamily: 'PT Sans'},
  contentValue: {flex: 7, fontSize: '14px', fontFamily: 'PT Sans'},
};
