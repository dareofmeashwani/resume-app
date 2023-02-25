import React from "react";
import useScrollSpinner from "../controls/ScrollSpinner";

const Header = (props) => {
  const { spinnerRef, setSpinnerScroll } = useScrollSpinner({
    speed: 0.6,
    friction: 0.00020,
    maxAngularVelocity: 0.0195,
  });
  React.useEffect(() => {
    const computeProgress = (e) => {
      setSpinnerScroll(window.scrollY)
    };
    window.addEventListener("scroll", computeProgress);
  }, []);
  return <>
    <div className="bio-avatar" style={{ padding: "1.6rem" }}>
      <div className="bio-avatar__img-cont">
        <img srcSet="http://localhost:3000/logo192.jpg, http://localhost:3000/logo192.jpg 2x" alt="Dan Pugsley" style={{ opacity: "0" }} className="fade-in" />
      </div>
      <div className="bio-avatar__tags">
        <picture ref={spinnerRef} style={{ transform: "rotate(0deg)" }}>
          <source media="(min-width: 885px)" srcSet="https://s3.eu-west-2.amazonaws.com/pugs.ly/img/tags/large.png, https://s3.eu-west-2.amazonaws.com/pugs.ly/img/tags/large-2x.png 2x" />
          <source media="(min-width: 507px)" srcSet="https://s3.eu-west-2.amazonaws.com/pugs.ly/img/tags/med.png, https://s3.eu-west-2.amazonaws.com/pugs.ly/img/tags/med-2x.png 2x" />
          <img srcSet="https://s3.eu-west-2.amazonaws.com/pugs.ly/img/tags/small.png, https://s3.eu-west-2.amazonaws.com/pugs.ly/img/tags/small-2x.png 2x" alt="React, Laravel, SQL, JavaScript, CSS, HTML, Node.js, PHP, Swift, C#, C++, Autoscaling, AWS, Load balancing, S3" style={{ opacity: "0" }} className="fade-in" />
        </picture>
      </div>
    </div>
  </>
};
export default Header;
