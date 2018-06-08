import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RequestListComponent } from './request-list.component';
import { updateList } from '../../actions/request/request.actions';

const mapStateToProps = (state: IState) => (state.request);

export const mapDispatchToProps = {
  updateList,
};

export const RequestListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestListComponent);
