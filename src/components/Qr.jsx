import { QRCode } from 'antd';
import ColorInput from './ColorInput';
import { useCallback } from 'react';
import TextInput from './TextInput';

const Qr = ({ formData, setFormData, index }) => {
  /* save qrURL iconURL and color in firebase store and load it array of objects */

  const { color, qrURL, iconURL } = formData;

  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = {
          ...updatedFormData[index],
          [name]: value,
        };
        return updatedFormData;
      });
    },
    [setFormData, index]
  );

  return (
    <div className='d-flex justify-content-center gap-4 flex-wrap'>
      {qrURL ? (
        <>
          <QRCode value={qrURL} icon={iconURL} color={color} type='svg' />
          <ColorInput
            controlId={'qr-color'}
            name={'color'}
            label={'Change color'}
            value={color}
            onChange={handleChange}
          />
        </>
      ) : (
        <span>Enter URL to display QR code</span>
      )}

      <div className='w-auto d-flex flex-grow-1 gap-4 flex-wrap'>
        <TextInput
          controlId={'qr-text'}
          name={'qrURL'}
          label={'qrURL'}
          value={qrURL}
          onChange={handleChange}
        />
        <TextInput
          controlId={'qr-icon'}
          name={'iconURL'}
          label={'iconURL'}
          value={iconURL}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Qr;
