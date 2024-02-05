import { useState } from 'react';
import OthersInputs from './others-inputs';

const FlourInput = (): JSX.Element => {
  const [flourAmount, setFlourAmount] = useState(0);

  const scale = (direction: 'up' | 'down') => {
    // Incremento ou decremento arbitrário para ilustrar
    const step = 250;

    if (direction === 'up') {
      setFlourAmount((prevAmount) => prevAmount + step);
    } else {
      setFlourAmount((prevAmount) => Math.max(prevAmount - step, 0));
    }
  };

  return (
    <section className="inputs">
      <div className="clearfix">
        <label id="flour-label" htmlFor="flour">
          Farinha
        </label>
        <p className="volume-label" id="flour-volume">
          8 cups
        </p>
      </div>
      <div className="input-wrapper full">
        <div
          id="decrementer"
          className="increment-button"
          onClick={() => scale('down')}
        >
          <img src="./src/assets/img/minus.png" alt="Decrement" />
        </div>
        <div
          id="incrementer"
          className="increment-button"
          onClick={() => scale('up')}
        >
          <img src="./src/assets/img/plus.png" alt="Increment" />
        </div>
        <input
          className=""
          tabIndex={1}
          id="flour"
          type="number"
          name="flour"
          value={flourAmount}
          onChange={(e) => setFlourAmount(Number(e.target.value))}
        />
        <p>g</p>
      </div>
      <OthersInputs />
    </section>
  );
};

export default FlourInput;
