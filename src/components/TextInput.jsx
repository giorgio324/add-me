import { Form } from 'react-bootstrap';

const TextInput = ({
  label,
  controlId,
  name,
  onChange,
  value,
  type = 'text',
}) => {
  return (
    <Form.Group
      controlId={controlId}
      className='d-flex flex-column w-100 flex-grow-1'
    >
      <Form.Label className='text-capitalize roboto-medium'>{label}</Form.Label>
      <Form.Control type={type} name={name} onChange={onChange} value={value} />
    </Form.Group>
  );
};

export default TextInput;
