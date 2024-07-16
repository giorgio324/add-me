import { Carousel, Container } from 'react-bootstrap';
import firstImage from '../assets/1.svg';
import secondImage from '../assets/2.svg';
import thirdImage from '../assets/3.svg';
import styles from '../styles/slider.module.css';
const Slider = () => {
  return (
    <Container className='d-flex justify-content-center'>
      <div className={`${styles.carouselContainer}`}>
        <Carousel>
          <Carousel.Item>
            <img src={firstImage} className='d-block w-100' />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={secondImage} className='d-block w-100' />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={thirdImage} className='d-block w-100' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
};

export default Slider;
