import { useEffect, useState } from 'react';
import UserImage from './components/UserImage';
import { Container } from 'react-bootstrap';
import UserInfo from './components/UserInfo';

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
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
      if (data) {
        setUser(data.data);
      }
    };
    fetchData();
  }, []);
  console.log(user);
  return (
    <Container as='main'>
      <UserImage user={user} />
      <UserInfo user={user} />
    </Container>
  );
};

export default App;
