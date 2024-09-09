import LocationIcon from "/assets/icons/location2.svg";
import PhoneIcon from "/assets/icons/number.svg";
import EmailIcon from "/assets/icons/email.svg";
import MapImage from "/assets/map.png";
import Input from "../components/common/Input";
import { Form } from "react-router-dom";
import Button from "../components/common/Button";
import "./ContactUs.scss";

function AboutUs() {
  return (
    <div className="textpage about-page">
      <h1 className="advent">Contact Us</h1>

      <div className="contacts center flex fle">
        <div className="contact-container">
          <div className="c-icon">
            <img src={LocationIcon} alt="" />
          </div>
          <div className="c-text">
            <h3>Address</h3>
            <p>
              433. N. Camden Drive,
              <br /> Suite 1000 Beverly Hills, CA 90210
            </p>
          </div>
        </div>
        <div className="contact-container">
          <div className="c-icon">
            <img src={PhoneIcon} alt="" />
          </div>
          <div className="c-text">
            <h3>Phone Number</h3>
            <p>
              (+55) 654 - 545 - 5418 <br />
              (+55) 654 - 545 - 1235
            </p>
          </div>
        </div>
        <div className="contact-container">
          <div className="c-icon">
            <img src={EmailIcon} alt="" />
          </div>
          <div className="c-text">
            <h3>Email Address</h3>
            <p>
              jenni@lauridesignstudio.com <br /> 310.600.1202
            </p>
          </div>
        </div>
      </div>
      <h1 className="advent">GET IN TOUCH</h1>
      <div className="contact-form">
        <div className="map-image-wrapper">
          <img src={MapImage} alt="" />
        </div>
        <div className="form-container">
          <Form action="">
            <div className="form-group">
              <Input label="Name" type="text" name="name"></Input>
              <Input label="Email" type="email" name="email"></Input>
              <Input label="Phone" type="number" name="phone"></Input>
              <div className="field-desc">
                <p>Your Mesage</p>
                <textarea
                  name="message"
                  className="textarea-desc"
                  maxLength={1000}
                ></textarea>
              </div>
            </div>
            <Button type="button">Submit</Button>
          </Form>
        </div>
      </div>

      <div className="sub-container">
        <h1 className="title advent center">STAY CONNECTED</h1>
        <p className="center">
          Subscribe to our newsletter to stay in touch with latest news and
          promotions
        </p>
        <Input label="Email" type="email" name="email"></Input>
        <Button type="button">Subscribe</Button>
      </div>
    </div>
  );
}

export default AboutUs;
