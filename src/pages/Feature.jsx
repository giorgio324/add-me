import Slider from 'react-slick';
import firstImage from '../assets/1.svg';
import secondImage from '../assets/2.svg';
import thirdImage from '../assets/3.svg';
import fourthImage from '../assets/4.svg';
import styles from '../styles/slider.module.css';
const Feature = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    /* autoplay: true,
    autoplaySpeed: 2000, */
    arrows: false,
  };
  return (
    <>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            <div className='d-block'>
              <img src={firstImage} alt='' className={styles.carouselImage} />
            </div>
            <div className='d-block'>
              <img src={secondImage} alt='' className={styles.carouselImage} />
            </div>
            <div className='d-block'>
              <img src={thirdImage} alt='' className={styles.carouselImage} />
            </div>
            <div className='d-block'>
              <img src={fourthImage} alt='' className={styles.carouselImage} />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Feature;
