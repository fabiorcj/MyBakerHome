import { useState } from 'react';

const FlourInput = (): JSX.Element => {
  const [flourAmount, setFlourAmount] = useState(0);
  //botão de incrementar valor em flour
  const scale = (direction: 'up' | 'down') => {
    const step = 250;

    if (direction === 'up') {
      setFlourAmount((prevAmount) => prevAmount + step);
    } else {
      setFlourAmount((prevAmount) => Math.max(prevAmount - step, 0));
    }
  };
  return (
    <>
      <div className="label-ingredient">
        <label id="flour-label" htmlFor="flour">
          Farinha
        </label>
        <p className="volume-label" id="flour-volume">
          8 cups
        </p>
      </div>
      <div className="input-ingredient full">
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
    </>
  );
};

export default FlourInput;
