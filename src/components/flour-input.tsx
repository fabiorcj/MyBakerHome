import { useState } from 'react';
interface Props {
  value: number;
  onFlourChange: (value: number) => void;
}

const FlourInput: React.FC<Props> = ({ value, onFlourChange }) => {
  const [flourAmount, setFlourAmount] = useState(1000);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFlourAmount(value);
    onFlourChange(value);
  };

  //botão de incrementar valor em flour
  const scale = (direction: 'up' | 'down') => {
    const step = 250;

    if (direction === 'up') {
      setFlourAmount((prevAmount) => prevAmount + step);
      onFlourChange(flourAmount + step);
    } else {
      setFlourAmount((prevAmount) => Math.max(prevAmount - step, 0));
      onFlourChange(Math.max(flourAmount - step, 0));
    }
  };
  return (
    <>
      <div className="label-ingredient">
        <label id="flour-label" htmlFor="flour">
          Flour
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
          onClick={(e) => e.currentTarget.select()}
          value={flourAmount}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <p>g</p>
      </div>
    </>
  );
};

export default FlourInput;
