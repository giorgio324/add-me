import { useState } from 'react';
import EasyCrop from './EasyCrop';
import { Button, Modal } from 'react-bootstrap';

const Profile = () => {
  const [show, setShow] = useState(false);
  const [imageURL, setImageURL] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQ5aULg3WcJm0QJMJ-olk9HagB3s5cD1sMg&s'
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='container d-flex justify-content-center align-items-center mt-5'>
        <Button variant='primary' onClick={handleShow}>
          Edit Profile
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-black'>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EasyCrop fetchedImageURL={imageURL} />
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

export default Profile;
