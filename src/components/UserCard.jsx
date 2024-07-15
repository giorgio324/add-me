import styles from '../styles/userCard.module.css';
const UserCard = ({ imageSrc, text, href }) => {
  return (
    <a
      href={href}
      target='_blank'
      className={`d-flex justify-content-center align-items-center mt-4 ${styles.userInfoImage} text-white`}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h3 className='text-uppercase'>{text}</h3>
    </a>
  );
};

export default UserCard;
