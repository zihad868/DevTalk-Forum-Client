import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/Slider/slide1.jpg";
import img2 from "../../../assets/Slider/slide2.jpg";
import img3 from "../../../assets/Slider/slide3.jpg";
import img4 from "../../../assets/Slider/slide4.jpg";
import img5 from "../../../assets/Slider/slide5.jpg";
import img6 from "../../../assets/Slider/slide7.jpg";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";

const Slider = () => {
  return (
    <div className="mt-20">
      <div>
        <SectionTitle
          header="DevTalk Forum"
          content="Join the Dev Talk forum! Connect with fellow developers, share knowledge, ask questions, and stay updated on the latest tech trends. Elevate your skills and network in our vibrant community."
        />
      </div>
      <div>
      <Carousel autoPlay infiniteLoop interval={1500} stopOnHover showThumbs={false}>
          <div>
            <img src={img1} />
          </div>
          <div>
            <img src={img2} />
          </div>
          <div>
            <img src={img3} />
          </div>
          <div>
            <img src={img4} />
          </div>
          <div>
            <img src={img5} />
          </div>
          <div>
            <img src={img6} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
