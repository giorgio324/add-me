import SocialMediaIcon from './SocialMediaIcon';
import {
  FaLinkedin,
  FaTwitter,
  FaTiktok,
  FaSkype,
  FaGithub,
} from 'react-icons/fa';

const UserSocialMediaIcons = ({ user }) => {
  const userInputs = user?.cardItemInputs.reduce((acc, item) => {
    if (
      ['Linkedin', 'Twitter', 'Tiktok', 'Skype', 'Github'].includes(item.name)
    ) {
      acc[item.name.toLowerCase()] = item.value;
    }
    return acc;
  }, {});

  const socialMediaIcons = {
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    tiktok: <FaTiktok />,
    skype: <FaSkype />,
    github: <FaGithub />,
  };

  return (
    <section className='d-flex justify-content-center px-2 gap-3 gap-md-5'>
      {Object.entries(userInputs).map(([name, url]) => (
        <SocialMediaIcon key={name} href={url}>
          {socialMediaIcons[name]}
        </SocialMediaIcon>
      ))}
    </section>
  );
};

export default UserSocialMediaIcons;
