import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const EasyCrop = ({ fetchedImageURL }) => {
  const [imageSrc, setImageSrc] = useState(fetchedImageURL || null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState('');

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      console.log(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('Please select a file.');
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSizeInBytes) {
      setError('File size must not exceed 2 MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      setImageSrc(e.target.result);
    };
  };

  return (
    <div className='text-black'>
      {error}
      {imageSrc ? (
        <>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 400,
              background: '#fff',
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              cropShape='round'
            />
          </div>
          <Button onClick={showCroppedImage} color='primary'>
            Edit the image and save to firebase
          </Button>
          {croppedImage && (
            <div>
              <img src={croppedImage} className='img-fluid' alt='' />
            </div>
          )}
        </>
      ) : (
        <input type='file' onChange={onFileChange} accept='image/*' />
      )}
    </div>
  );
};

export default EasyCrop;
