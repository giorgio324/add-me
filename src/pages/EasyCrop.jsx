import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const EasyCrop = ({ fetchedImageURL }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState('');

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    try {
      // Get the cropped image as a blob
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      // Create a file from the blob
      const file = new File([croppedImageBlob.file], 'croppedImage.png', {
        type: 'image/png',
      });

      // Create a reference to the storage location
      const storageRef = ref(
        storage,
        `testUser/croppedImage_${Date.now()}.png`
      );

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL
      const newImageURL = await getDownloadURL(storageRef);
      setCroppedImage(newImageURL);
    } catch (e) {
      console.error('Error saving cropped image:', e);
      setError('Failed to save the cropped image. Please try again.');
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const maxSizeInBytes = 4 * 1024 * 1024; // 2 MB
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
          <Button onClick={saveCroppedImage} color='primary'>
            Edit the image and save to firebase
          </Button>
          {croppedImage && (
            <div>
              <img src={croppedImage} className='img-fluid' alt='' />
            </div>
          )}
        </>
      ) : (
        <label className='d-flex justify-content-center'>
          <Image src={fetchedImageURL} roundedCircle className='img-fluid' />
          <input
            type='file'
            onChange={onFileChange}
            accept='image/*'
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
};

export default EasyCrop;
