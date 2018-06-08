import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RequestListComponent } from './request-list.component';
// import { updateMovies, updateYear } from '../../actions/movie/movie.actions';

const mapStateToProps = (state: IState) => (state.clicker);

export const mapDispatchToProps = {
//   updateList,
};

export const MoviesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestListComponent);
