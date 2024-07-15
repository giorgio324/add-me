import { Image } from 'react-bootstrap';
import styles from '../styles/userImage.module.css';

const UserImage = ({ user }) => {
  return (
    <section className='d-flex justify-content-center mt-5'>
      <Image
        src={`https://storage.googleapis.com/addmeimages/${user?.cardImage}`}
        alt={`${user?.userName}'s profile photo`}
        roundedCircle
        className={`img-fluid ${styles.userImage}`}
      />
    </section>
  );
};

export default UserImage;
