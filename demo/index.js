import React from 'react';
import { render } from 'react-dom';
import TwentyTwenty from '../src';

render(
  <TwentyTwenty
    verticalAlign="bottom"
    minDistanceToBeginInteraction={0}
    maxAngleToBeginInteraction={Infinity}
  >
    <img alt="cat-1" src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png" width="200" />
    <img alt="cat-2" src="http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg" width="300" />
    <div className="slider" />
  </TwentyTwenty>,
  document.getElementById('main')
);
