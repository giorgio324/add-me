import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Feature from './pages/Feature.jsx';
import QrPage from './pages/QrPage.jsx';
import Image from './pages/Image.jsx';
import { ImageCrop } from './pages/ImageCrop.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />}></Route>
      <Route path='/slider' element={<Feature />}></Route>
      <Route path='/qr' element={<QrPage />}></Route>
      <Route path='/image' element={<Image />}></Route>
      <Route path='/image2' element={<ImageCrop />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
