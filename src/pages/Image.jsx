import React, { useState } from 'react';
import ReactCrop, { makeAspectCrop, centerCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { CiEdit } from 'react-icons/ci';
import { Container } from 'react-bootstrap';
const Image = () => {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthPercent = (150 / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthPercent,
      },
      1,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <Container>
      <label className='block mb-3 w-fit'>
        <span>choose image</span>
        <input type='file' accept='image/*' onChange={handleChange} />
      </label>
      {imgSrc && (
        <div className='d-flex justify-conent-center align-items-center flex-column gap-4'>
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            aspect={1}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
          >
            <img src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
          <button>confirm</button>
        </div>
      )}
    </Container>
  );
};

export default Image;
