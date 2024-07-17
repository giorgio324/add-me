import { QRCode } from 'antd';
import ColorInput from './ColorInput';
import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Qr = ({ iconURL, qrURL }) => {
  const [color, setColor] = useState('#000000');
  const qrRef = useRef(null);
  const savedSVGRef = useRef(null);

  const handleChange = useCallback((e) => {
    setColor(e.target.value);
  }, []);

  const handleClick = async () => {
    try {
      const svgElement = qrRef.current.querySelector('svg');
      if (svgElement) {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

        // Save SVG path and color to Firestore
        const docRef = doc(db, 'qrCodes', 'qrCodeData');
        await setDoc(docRef, { svgPath: dataUrl, color });

        console.log('SVG and color saved to Firestore');
      }
    } catch (error) {
      console.error('Error saving SVG to Firestore:', error);
    }
  };

  const loadSVGFromFirestore = useCallback(async () => {
    try {
      const docRef = doc(db, 'qrCodes', 'qrCodeData');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { svgPath, color } = docSnap.data();
        setColor(color);

        const svgString = atob(svgPath.split(',')[1]);
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');

        if (svgElement && savedSVGRef.current) {
          savedSVGRef.current.innerHTML = '';
          savedSVGRef.current.appendChild(svgElement);
        }
      } else {
        console.log('No such document in Firestore');
      }
    } catch (error) {
      console.error('Error loading SVG from Firestore:', error);
    }
  }, []);

  useEffect(() => {
    loadSVGFromFirestore();
  }, [loadSVGFromFirestore]);

  return (
    <div className='container mt-5' ref={qrRef}>
      <div className='d-flex flex-column gap-4 justify-content-center align-items-start p-4 bg-white rounded text-black'>
        <QRCode value={qrURL} icon={iconURL} color={color} type='svg' />
        <ColorInput
          controlId={'qr-color-id'}
          name={'color'}
          label={'Change color'}
          value={color}
          onChange={handleChange}
        />

        <button onClick={handleClick}>Save</button>
      </div>
    </div>
  );
};

export default Qr;
