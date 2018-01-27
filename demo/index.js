import React from 'react';
import { render } from 'react-dom';
import TwentyTwenty from '../src';

const Uncontrolled = () => (
  <TwentyTwenty
    verticalAlign="bottom"
    minDistanceToBeginInteraction={0}
    maxAngleToBeginInteraction={Infinity}
  >
    <img alt="cat-1" src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png" width="200" />
    <img alt="cat-2" src="http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg" width="300" />
    <div className="slider" />
  </TwentyTwenty>
);

class Controlled extends React.Component {
  constructor() {
    super()
    this.state = { position: 0.5 };
    this.setPosition = position => this.setState({ position });
  }


  render() {
    const { position } = this.state;

    return (
      <React.Fragment>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={position}
          onChange={e => this.setPosition(e.target.valueAsNumber)}
        />
        <TwentyTwenty
          verticalAlign="bottom"
          minDistanceToBeginInteraction={0}
          maxAngleToBeginInteraction={Infinity}
          position={position}
          onChange={this.setPosition}
        >
          <img alt="cat-1" src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png" width="200" />
          <img alt="cat-2" src="http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg" width="300" />
          <div className="slider" />
        </TwentyTwenty>
      </React.Fragment>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { controlled: false };
    this.setControlled = controlled => this.setState({ controlled })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.controlled ? <Controlled /> : <Uncontrolled />}
        <label>
          <input
            type="checkbox"
            onChange={e => this.setControlled(e.target.checked)}
          />
          {" "}Use controlled component
        </label>
      </React.Fragment>
    );
  }
}

render(
  <App />,
  document.getElementById('main')
);
