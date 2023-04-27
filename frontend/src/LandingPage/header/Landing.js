import React, { useState, useEffect } from 'react';
import './Landing.css';
import { Link } from 'react-scroll';

function Landing() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const message1 = 'Course Finder';
  const message2 = 'Discover the world of knowledge';

  useEffect(() => {
    let counter1 = 0;
    const intervalId1 = setInterval(() => {
      if (counter1 < message1.length) {
        setText1(prevText => prevText + message1[counter1]);
        counter1++;
      } else {
        clearInterval(intervalId1);
      }
    }, 210); // adjust the interval time to control the speed of animation

    let counter2 = 0;
    const intervalId2 = setInterval(() => {
      if (counter2 < message2.length) {
        setText2(prevText => prevText + message2[counter2]);
        counter2++;
      } else {
        clearInterval(intervalId2);
      }
    }, 100);
  }, []);

  return (
    <div className="Landing">
      <div className="Landing-bg_img"></div>
      <div className="Landing-cover"></div>
      <div className="Landing-containers">
        <div className="Landing-containers-h1">{text1}</div>
        <div className="Landing-containers-h3">{text2}</div>
        <Link
          to="services"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="Landing-containers-btn_link"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

export default Landing;
