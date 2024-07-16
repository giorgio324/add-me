import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import UserImage from '../components/UserImage';
import UserInfo from '../components/UserInfo';
import UserSocialMediaIcons from '../components/UserSocialMediaIcons';
import UserCards from '../components/UserCards';

const Home = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://testing.api.addme.ge/api/card/getcard/Guro',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container as='main'>
      <section className='my-5'>
        <UserImage user={user} />
        <UserInfo user={user} />
        <UserSocialMediaIcons user={user} />
        <UserCards user={user} />
      </section>
    </Container>
  );
};

export default Home;
