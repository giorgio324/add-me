import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from '../styles/easyCrop.module.css';
import { CiEdit } from 'react-icons/ci';
import { Slider } from 'antd';

const EasyCrop = ({ profileImage, setProfileImage, imageSrc, setImageSrc }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cancelCrop = () => {
    setImageSrc(null);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    setError(null);
  };

  const saveCroppedImage = async () => {
    try {
      // Get the cropped image as a blob
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      // Create a file from the blob to upload it in firebase
      const file = new File([croppedImageBlob.file], 'croppedImage.png', {
        type: 'image/png',
      });

      const storageRef = ref(
        storage,
        `testUser/croppedImage_${Date.now()}.png`
      );

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // fetch uploaded image and update state
      const newImageURL = await getDownloadURL(storageRef);
      setProfileImage(newImageURL);
      cancelCrop();
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
              background: '#fff',
            }}
            className={`${styles.cropWrapper}`}
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
          <div>
            <div className='d-flex justify-content-center align-items-center gap-3'>
              <CiEdit />
              <Slider
                min={1}
                max={3}
                step={0.2}
                value={zoom}
                onChange={(value) => setZoom(value)}
                style={{ flexGrow: '1' }}
              />
            </div>
            <div className='d-flex justify-content-center align-items-center gap-3'>
              <CiEdit />
              <Slider
                min={0}
                max={360}
                step={1}
                value={rotation}
                onChange={(value) => setRotation(value)}
                style={{ flexGrow: '1' }}
              />
            </div>
          </div>
          <div className={`mt-4 ${styles.buttonContainer}`}>
            <Button onClick={saveCroppedImage} color='primary'>
              Crop Image
            </Button>
            <Button onClick={cancelCrop} variant='danger'>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <label className='position-relative'>
            {profileImage && (
              <>
                <Image
                  src={profileImage}
                  roundedCircle
                  className={`${styles.profileImage}`}
                />
                <CiEdit className={`${styles.profileImageIcon}`} />
              </>
            )}
            <input
              type='file'
              onChange={onFileChange}
              accept='image/*'
              style={{ display: 'none' }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default EasyCrop;
