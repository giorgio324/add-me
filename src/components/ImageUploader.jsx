import { Form } from 'react-bootstrap';

const ImageUploader = ({ label, name, setValue }) => {
  const handleImageChange = (e) => {
    const imageFileList = e.target.files;
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const localImageUrl = window.URL.createObjectURL(file);
      setValue(localImageUrl);
    }
  };

  return (
    <Form.Group
      controlId={`form${name}Image`}
      className='mt-3 text-capitalize roboto-bold'
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control type='file' name={name} onChange={handleImageChange} />
    </Form.Group>
  );
};

export default ImageUploader;
