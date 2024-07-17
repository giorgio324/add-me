import { Form } from 'react-bootstrap';

const ColorInput = ({ label, controlId, name, onChange, value }) => {
  return (
    <Form.Group controlId={controlId} className='d-flex flex-column'>
      <Form.Label className='text-capitalize roboto-medium'>{label}</Form.Label>
      <Form.Control
        type='color'
        name={name}
        onChange={onChange}
        value={value}
      />
    </Form.Group>
  );
};

export default ColorInput;
