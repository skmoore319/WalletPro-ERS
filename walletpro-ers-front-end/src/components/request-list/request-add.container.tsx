import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { RequestAddComponent } from './request-add.component';
import { updateList, updateYear, updateForm, updateDescription, updateRating, updateTitle } from '../../actions/request/request.actions';

const mapStateToProps = (state: IState) => (state.request);

export const mapDispatchToProps = {
  updateDescription,
  updateForm,
  updateList,
  updateRating,
  updateTitle,  
  updateYear,
};

export const RequestAddContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestAddComponent);
