import { Col, Row } from 'react-bootstrap';
import UserCard from './UserCard';

const UserCards = ({ user }) => {
  const userInputs = user?.cardItemInputs?.reduce((acc, item) => {
    if (['Phone1', 'Website'].includes(item.name)) {
      acc[item.name.toLowerCase()] = item.value;
    }
    return acc;
  }, {});

  const imageLinks = [
    {
      title: 'website',
      href: userInputs?.website,
      src: 'https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'imdb',
      src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'features & television',
      src: 'https://images.unsplash.com/photo-1589287707312-213624549c88?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'commercials',
      src: 'https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'contact',
      src: 'https://plus.unsplash.com/premium_photo-1714229505704-3f20cc577bda?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      phone: userInputs?.phone1,
    },
  ];

  return (
    <section>
      <Row className='mt-1'>
        {imageLinks.slice(0, 2).map((link, index) => (
          <Col lg={6} key={index}>
            <UserCard href={link.href} imageSrc={link.src} text={link.title} />
          </Col>
        ))}
      </Row>
      <Row className='mt-1'>
        {imageLinks.slice(2, 4).map((link, index) => (
          <Col lg={6} key={index}>
            <UserCard href={link.href} imageSrc={link.src} text={link.title} />
          </Col>
        ))}
      </Row>
      <Row className='mt-1'>
        <Col lg={12}>
          <UserCard
            href={imageLinks[4]?.href}
            imageSrc={imageLinks[4]?.src}
            text={imageLinks[4]?.title}
          />
        </Col>
      </Row>
    </section>
  );
};

export default UserCards;
