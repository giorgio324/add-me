import { Col, Row } from 'react-bootstrap';

const UserInfo = ({ user }) => {
  const userInputs = user?.cardItemInputs.reduce((acc, item) => {
    if (
      ['Firstname', 'Lastname', 'Adress', 'Company', 'Position'].includes(
        item.name
      )
    ) {
      acc[item.name.toLowerCase()] = item.value;
    }
    return acc;
  }, {});

  return (
    <Row as='section' className='py-1'>
      <Col className='text-center text-uppercase'>
        <h1>
          {userInputs?.firstname} {userInputs?.lastname}
        </h1>
        <h4 className='text-secondary'>{userInputs?.position}</h4>
        <div
          className='d-flex justify-content-center align-items-center'
          style={{ gap: 8 }}
        >
          <p className='text-secondary mt-1'>{userInputs?.adress}</p>
          <p className='text-secondary mt-1'>|</p>
          <p className='text-secondary mt-1'>{`კომპანია: ${userInputs?.company}`}</p>
        </div>
      </Col>
    </Row>
  );
};

export default UserInfo;
