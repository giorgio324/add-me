import { useState } from 'react';
import EasyCrop from './EasyCrop';
import { Button, Modal } from 'react-bootstrap';

export const ImageCrop = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        edit profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EasyCrop />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
