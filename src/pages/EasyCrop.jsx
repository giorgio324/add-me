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

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation
      );
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {fetchedImageURL && (
        <>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 400,
              background: '#333',
            }}
          >
            <Cropper
              image={fetchedImageURL}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </div>
          <Button onClick={showCroppedImage} color='primary'>
            Show Result
          </Button>
        </>
      )}
    </div>
  );
};

export default EasyCrop;
