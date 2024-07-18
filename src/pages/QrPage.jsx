import { Button } from 'react-bootstrap';
import Qr from '../components/Qr';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Spinner } from 'react-bootstrap';

const QrPage = () => {
  const initialStates = [
    {
      color: '#000000',
      qrURL: 'https://addme.ge/',
      iconURL:
        'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    },
  ];

  const [formData, setFormData] = useState(initialStates);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = () => {
    setFormData((prevFormData) => [
      ...prevFormData,
      {
        color: '#000000',
        qrURL: 'https://addme.ge/',
        iconURL:
          'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    setFormData((prevFormData) => prevFormData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchQrData = async () => {
      try {
        setIsLoading(true);
        const qrCollection = collection(db, 'qr-codes');
        const docRef = doc(qrCollection, 'DAAaCXWoq8w0fVeQ9voO'); // TODO: SECOND ARGUMENT IS HARDCODED FOR NOW
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const qrData = docSnapshot.data().qrData;
          setFormData(qrData);
        } else {
          console.log('No document found, using hardcoded initial state');
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        setFormData(initialStates);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQrData();
  }, []);

  const handleClick = async () => {
    try {
      const qrCollection = collection(db, 'qr-codes');
      const docRef = doc(qrCollection, 'DAAaCXWoq8w0fVeQ9voO'); // TODO: SECOND ARGUMENT IS HARDCODED FOR NOW
      await setDoc(docRef, { qrData: formData });
      console.log('Data saved to Firebase');
    } catch (error) {
      console.error('Error saving data to Firebase:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='d-flex flex-column gap-4 justify-content-center align-items-center p-4 bg-white rounded text-black'>
        {isLoading ? (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '300px' }}
          >
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        ) : (
          formData.map((item, index) => {
            return (
              <div
                key={index}
                className='d-flex flex-column gap-1 align-items-end'
              >
                <Button
                  variant='danger'
                  onClick={() => handleRemoveItem(index)}
                >
                  <IoCloseSharp size={24} />
                </Button>
                <Qr formData={item} setFormData={setFormData} index={index} />
              </div>
            );
          })
        )}
        <Button onClick={handleAddItem}>Add QR</Button>
        <Button onClick={handleClick}>Save to firebase</Button>
      </div>
    </div>
  );
};

export default QrPage;
