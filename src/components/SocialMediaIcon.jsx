import styles from '../styles/socialMediaIcon.module.css';
const SocialMediaIcon = ({ children, href }) => {
  return (
    <a
      href={href}
      target='_blank'
      className={`d-flex p-2 rounded-circle bg-white text-black ${styles.userIcon}`}
    >
      {children}
    </a>
  );
};

export default SocialMediaIcon;
