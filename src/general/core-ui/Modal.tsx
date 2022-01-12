import React, {ReactElement} from 'react';
import {Modal as ModalComponent} from 'react-bootstrap';

type Props = {
  title?: string;
  children: ReactElement;
  isModalShow: boolean;
  onCloseModal: () => void;
  noHeaderBorder?: boolean;
};

export default function Modal(props: Props) {
  let {title, children, isModalShow, onCloseModal, noHeaderBorder} = props;
  return (
    <ModalComponent show={isModalShow} onHide={() => onCloseModal()} size="xl">
      <ModalComponent.Header
        closeButton
        closeLabel="Close"
        style={noHeaderBorder ? {borderBottom: 'none'} : {}}
      >
        {title && <ModalComponent.Title>title</ModalComponent.Title>}
      </ModalComponent.Header>
      <ModalComponent.Body>{children}</ModalComponent.Body>
    </ModalComponent>
  );
}
