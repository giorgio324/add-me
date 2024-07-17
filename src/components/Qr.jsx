import { QRCode } from 'antd';
import ColorInput from './ColorInput';
import { useState } from 'react';

const Qr = ({ iconURL, qrURL }) => {
  const [color, setColor] = useState('#000000');
  const handleChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
  };
  return (
    <div className='container mt-5'>
      <div className='d-flex flex-column gap-4 justify-content-center align-items-start p-4 bg-white rounded text-black'>
        <QRCode
          errorLevel='H'
          value={qrURL}
          icon={iconURL}
          color={color}
          type='svg'
        />
        <ColorInput
          controlId={'qr-color-id'}
          name={'color'}
          label={'Change color'}
          value={color}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Qr;
