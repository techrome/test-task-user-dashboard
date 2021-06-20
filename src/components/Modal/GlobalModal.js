import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';

import { AddUserModal, DeleteUserModal } from './index';
import { modalNames } from 'src/config';
import { modalSelectors, modalActions } from 'src/redux/stores/modal';

const EmptyModal = () => <div />;

const getModalByType = (type) => {
  switch (type) {
    case modalNames.ADD_USER: {
      return AddUserModal;
    }
    case modalNames.DELETE_USER: {
      return DeleteUserModal;
    }
    default: {
      return EmptyModal;
    }
  }
};

const GlobalModal = ({
  type,
  isOpen,
  modalProps,

  setInfo,
  reset,
  ...props
}) => {
  const ModalComponent = getModalByType(type);

  return (
    <Dialog open={isOpen} onClose={reset}>
      <ModalComponent {...modalProps} />
    </Dialog>
  );
};

const mapState = (state) => ({
  type: modalSelectors.type(state),
  isOpen: modalSelectors.isOpen(state),
  modalProps: modalSelectors.props(state),
});

const mapDispatch = {
  setInfo: modalActions.setInfo,
  reset: modalActions.reset,
};

export default connect(mapState, mapDispatch)(GlobalModal);
