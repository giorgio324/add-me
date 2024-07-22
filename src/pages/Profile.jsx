import { useState } from 'react';
import EasyCrop from '../components/EasyCrop';
import { Button, Form, Modal } from 'react-bootstrap';
import defaultUserIcon from '../assets/user.png';
const Profile = () => {
  const [show, setShow] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultUserIcon);
  /* imageSrc is lifet up state */
  const [imageSrc, setImageSrc] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='container d-flex justify-content-center align-items-center mt-5'>
        <Button variant='primary' onClick={handleShow}>
          Edit Profile
        </Button>
      </div>
      <Modal size='xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-black'>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EasyCrop
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          {!imageSrc && (
            <>
              <Form.Group
                className='mb-3'
                controlId='formname'
                style={{ flexGrow: '1', width: '100%' }}
              >
                <Form.Label>name</Form.Label>
                <Form.Control type='name' placeholder='test' />
                <Form.Text className='text-muted'>testing for the ui</Form.Text>
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='formBasicEmail'
                style={{ flexGrow: '1', width: '100%' }}
              >
                <Form.Label>lastname</Form.Label>
                <Form.Control type='email' placeholder='test' />
                <Form.Text className='text-muted'>testing for the ui</Form.Text>
              </Form.Group>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
